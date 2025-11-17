import { prisma } from "@repo/db";
import { env } from "./env.js";
import { JQuantsClient, StatementRecord } from "./jquants-client.js";
import {
  mapCompanyInfo,
  mapDailyStockInfo,
  mapFinsStatement,
} from "./mappers.js";

const BATCH_SIZE = 1000;
const client = new JQuantsClient({
  refreshToken: env.refreshToken,
  baseUrl: env.baseUrl,
});

async function main(): Promise<void> {
  console.log("Starting J-Quants data collection");

  await syncCompanyInfo();
  await syncStatements();
  // await syncDailyQuotes();
}

async function syncCompanyInfo(): Promise<void> {
  console.log("Fetching listed company info...");
  const info = await client.fetchListedInfo();
  console.log(`Fetched ${info.length} company info records`);

  if (!info.length) return;

  await processInChunks(info, async (chunk) => {
    return prisma.$transaction(
      chunk.map((record) => {
        const data = mapCompanyInfo(record);
        return prisma.companyInfo.upsert({
          where: { code: data.code },
          create: data,
          update: data,
        });
      })
    );
  });

  console.log("Company info upsert completed");
}

async function syncStatements(): Promise<void> {
  console.log("Fetching financial statements...");
  const companies = await prisma.companyInfo.findMany();
  for (const company of companies) {
    console.log(`Fetched financial statement records. ${company.code}`);
    const companyStatements = await client.fetchStatements({
      code: company.code,
    });
    if (companyStatements.length > 0) {
      await processInChunks(companyStatements, async (chunk) => {
        return prisma.$transaction(
          chunk.map((record) => {
            const data = mapFinsStatement(record);
            return prisma.finsStatement.upsert({
              where: { disclosureNumber: data.disclosureNumber },
              create: data,
              update: data,
            });
          })
        );
      });
    }
    const quotes = await client.fetchDailyQuotes({
      code: company.code,
    });
    console.log(
      `Fetched ${quotes.length} daily quote records. ${company.code}`
    );

    if (!quotes.length) return;
    await processInChunks(quotes, async (chunk) => {
      return prisma.$transaction(
        chunk.map((record) => {
          const data = mapDailyStockInfo(record);
          return prisma.dailyStockInfo.upsert({
            where: {
              code_date: {
                code: data.code,
                date: data.date,
              },
            },
            create: data,
            update: data,
          });
        })
      );
    });
  }

  console.log("Financial statements upsert completed");
}

async function processInChunks<T>(
  items: T[],
  executor: (chunk: T[]) => Promise<unknown>
): Promise<void> {
  for (let index = 0; index < items.length; index += BATCH_SIZE) {
    const chunk = items.slice(index, index + BATCH_SIZE);
    await executor(chunk);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("J-Quants data collection finished successfully");
  })
  .catch(async (error) => {
    console.error("Failed to collect J-Quants data");
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
