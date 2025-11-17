import path from "node:path";
import { config } from "dotenv";

const envPath = path.resolve(process.cwd(), ".env");
config({ path: envPath });

console.log(`Loaded environment variables from ${envPath}`);

const DEFAULT_BASE_URL = "https://api.jquants.com/v1/";

const refreshToken = process.env.JQUANTS_REFRESH_TOKEN;
if (!refreshToken) {
  throw new Error("Missing JQUANTS_REFRESH_TOKEN in .env");
}

export const env = {
  refreshToken,
  baseUrl: (process.env.JQUANTS_API_BASE_URL ?? DEFAULT_BASE_URL).trim(),
};

type DailyQuotesEnv = {
  code?: string;
  date?: string;
  from?: string;
  to?: string;
};

type StatementsEnv = {
  code?: string;
  date?: string;
  from?: string;
  to?: string;
};

function cleanString(value?: string): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export type { DailyQuotesEnv, StatementsEnv };
