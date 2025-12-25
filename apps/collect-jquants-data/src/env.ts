import path from "node:path";
import { config } from "dotenv";

const envPath = path.resolve(process.cwd(), ".env");
config({ path: envPath });

console.log(`Loaded environment variables from ${envPath}`);

const DEFAULT_BASE_URL = "https://api.jquants.com/v2/";

const apiKey = process.env.JQUANTS_API_KEY;
if (!apiKey) {
  throw new Error("Missing JQUANTS_API_KEY in .env");
}

export const env = {
  apiKey,
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

export type { DailyQuotesEnv, StatementsEnv };
