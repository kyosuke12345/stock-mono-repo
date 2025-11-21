import { prisma } from "@repo/db";
import { env } from "./env.js";
import { JQuantsClient } from "./jquants-client.js";
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
  const companies = await prisma.companyInfo.findMany({
    orderBy: { code: "asc" },
  });
  const companyLength = companies.length;
  let processedCount = 0;
  const startTime = Date.now();
  console.log(`Fetched ${companyLength} companies from DB`);
  await processInChunks(
    companies.map((c) => c.code),
    async (chunk) => {
      const chunkPromises = chunk.map((code) => syncData(code));
      await Promise.all(chunkPromises);
      processedCount += chunk.length;
      const elapsed = (Date.now() - startTime) / 1000;
      console.log(
        `Processed ${processedCount} / ${companyLength} companies in ${elapsed.toFixed(
          2
        )} seconds`
      );
    },
    30
  );
  const totalElapsed = (Date.now() - startTime) / 1000;
  console.log(
    `Completed data sync for ${companyLength} companies in ${totalElapsed.toFixed(
      2
    )} seconds`
  );
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

async function syncData(companyCode: string): Promise<void> {
  console.log(`syncData records. ${companyCode}`);
  const [companyStatements, quotes] = await Promise.all([
    client.fetchStatements({
      code: companyCode,
    }),
    client.fetchDailyQuotes({
      code: companyCode,
    }),
  ]);
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
  if (quotes.length > 0) {
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

  console.log(`syncData complete. ${companyCode}`);
}

async function processInChunks<T>(
  items: T[],
  executor: (chunk: T[]) => Promise<unknown>,
  batchSize = BATCH_SIZE
): Promise<void> {
  for (let index = 0; index < items.length; index += batchSize) {
    const chunk = items.slice(index, index + batchSize);
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
