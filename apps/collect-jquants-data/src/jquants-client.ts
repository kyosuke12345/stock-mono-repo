import axios from "axios";

type RequestParams = Record<string, string | number | undefined>;

type PaginatedResponse<T extends string, R> = {
  pagination_key?: string | null;
} & {
  [K in T]: R[];
};

export type ListedInfoRecord = {
  Code: string;
  Date: string;
  CompanyName?: string;
  CompanyNameEnglish?: string;
  Sector17Code?: string;
  Sector17CodeName?: string;
  Sector33Code?: string;
  Sector33CodeName?: string;
  ScaleCategory?: string;
  MarketCode?: string;
  MarketCodeName?: string;
  MarginCode?: string;
  MarginCodeName?: string;
};

export type DailyQuoteRecord = {
  Code: string;
  Date: string;
  Open?: string | number;
  High?: string | number;
  Low?: string | number;
  Close?: string | number;
  UpperLimit?: string;
  LowerLimit?: string;
  Volume?: string | number;
  TradingValue?: string | number;
  AdjustmentFactor?: string | number;
  AdjustmentOpen?: string | number;
  AdjustmentHigh?: string | number;
  AdjustmentLow?: string | number;
  AdjustmentClose?: string | number;
  AdjustmentVolume?: string | number;
};

export type StatementRecord = {
  LocalCode: string;
  DisclosureNumber: string;
  DisclosedDate: string;
  DisclosedTime?: string;
  TypeOfDocument?: string;
  TypeOfCurrentPeriod?: string;
  CurrentPeriodStartDate?: string;
  CurrentPeriodEndDate?: string;
  CurrentFiscalYearStartDate?: string;
  CurrentFiscalYearEndDate?: string;
  NextFiscalYearStartDate?: string;
  NextFiscalYearEndDate?: string;
  NetSales?: string;
  OperatingProfit?: string;
  OrdinaryProfit?: string;
  Profit?: string;
  EarningsPerShare?: string;
  DilutedEarningsPerShare?: string;
  BookValuePerShare?: string;
  TotalAssets?: string;
  Equity?: string;
  EquityToAssetRatio?: string;
  CashFlowsFromOperatingActivities?: string;
  CashFlowsFromInvestingActivities?: string;
  CashFlowsFromFinancingActivities?: string;
  CashAndEquivalents?: string;
  ResultDividendPerShare1stQuarter?: string;
  ResultDividendPerShare2ndQuarter?: string;
  ResultDividendPerShare3rdQuarter?: string;
  ResultDividendPerShareFiscalYearEnd?: string;
  ResultDividendPerShareAnnual?: string;
  DistributionsPerUnitREIT?: string;
  ResultTotalDividendPaidAnnual?: string;
  ResultPayoutRatioAnnual?: string;
  ForecastDividendPerShare1stQuarter?: string;
  ForecastDividendPerShare2ndQuarter?: string;
  ForecastDividendPerShare3rdQuarter?: string;
  ForecastDividendPerShareFiscalYearEnd?: string;
  ForecastDividendPerShareAnnual?: string;
  ForecastDistributionsPerUnitREIT?: string;
  ForecastTotalDividendPaidAnnual?: string;
  ForecastPayoutRatioAnnual?: string;
  NextYearForecastDividendPerShare1stQuarter?: string;
  NextYearForecastDividendPerShare2ndQuarter?: string;
  NextYearForecastDividendPerShare3rdQuarter?: string;
  NextYearForecastDividendPerShareFiscalYearEnd?: string;
  NextYearForecastDividendPerShareAnnual?: string;
  NextYearForecastDistributionsPerUnitREIT?: string;
  NextYearForecastPayoutRatioAnnual?: string;
  ForecastNetSales2ndQuarter?: string;
  ForecastOperatingProfit2ndQuarter?: string;
  ForecastOrdinaryProfit2ndQuarter?: string;
  ForecastProfit2ndQuarter?: string;
  ForecastEarningsPerShare2ndQuarter?: string;
  NextYearForecastNetSales2ndQuarter?: string;
  NextYearForecastOperatingProfit2ndQuarter?: string;
  NextYearForecastOrdinaryProfit2ndQuarter?: string;
  NextYearForecastProfit2ndQuarter?: string;
  NextYearForecastEarningsPerShare2ndQuarter?: string;
  ForecastNetSales?: string;
  ForecastOperatingProfit?: string;
  ForecastOrdinaryProfit?: string;
  ForecastProfit?: string;
  ForecastEarningsPerShare?: string;
  NextYearForecastNetSales?: string;
  NextYearForecastOperatingProfit?: string;
  NextYearForecastOrdinaryProfit?: string;
  NextYearForecastProfit?: string;
  NextYearForecastEarningsPerShare?: string;
  NumberOfIssuedAndOutstandingSharesAtEnd?: string;
  NumberOfTreasuryStockAtEnd?: string;
  AverageNumberOfShares?: string;
  NumberOfIssuedAndOutstandingSharesAtTheEndOfFiscalYearIncludingTreasuryStock?: string;
  NumberOfTreasuryStockAtTheEndOfFiscalYear?: string;
  MaterialChangesInSubsidiaries?: string;
  SignificantChangesInTheScopeOfConsolidation?: string;
  ChangesBasedOnRevisionsOfAccountingStandard?: string;
  ChangesOtherThanOnesBasedOnRevisionsOfAccountingStandard?: string;
  ChangesInAccountingEstimates?: string;
  RetrospectiveRestatement?: string;
  NonConsolidatedNetSales?: string;
  NonConsolidatedOperatingProfit?: string;
  NonConsolidatedOrdinaryProfit?: string;
  NonConsolidatedProfit?: string;
  NonConsolidatedEarningsPerShare?: string;
  NonConsolidatedTotalAssets?: string;
  NonConsolidatedEquity?: string;
  NonConsolidatedEquityToAssetRatio?: string;
  NonConsolidatedBookValuePerShare?: string;
  ForecastNonConsolidatedNetSales2ndQuarter?: string;
  ForecastNonConsolidatedOperatingProfit2ndQuarter?: string;
  ForecastNonConsolidatedOrdinaryProfit2ndQuarter?: string;
  ForecastNonConsolidatedProfit2ndQuarter?: string;
  ForecastNonConsolidatedEarningsPerShare2ndQuarter?: string;
  NextYearForecastNonConsolidatedNetSales2ndQuarter?: string;
  NextYearForecastNonConsolidatedOperatingProfit2ndQuarter?: string;
  NextYearForecastNonConsolidatedOrdinaryProfit2ndQuarter?: string;
  NextYearForecastNonConsolidatedProfit2ndQuarter?: string;
  NextYearForecastNonConsolidatedEarningsPerShare2ndQuarter?: string;
  ForecastNonConsolidatedNetSales?: string;
  ForecastNonConsolidatedOperatingProfit?: string;
  ForecastNonConsolidatedOrdinaryProfit?: string;
  ForecastNonConsolidatedProfit?: string;
  ForecastNonConsolidatedEarningsPerShare?: string;
  NextYearForecastNonConsolidatedNetSales?: string;
  NextYearForecastNonConsolidatedOperatingProfit?: string;
  NextYearForecastNonConsolidatedOrdinaryProfit?: string;
  NextYearForecastNonConsolidatedProfit?: string;
  NextYearForecastNonConsolidatedEarningsPerShare?: string;
};

type ClientOptions = {
  refreshToken: string;
  baseUrl?: string;
  rateLimitMs?: number;
};

export class JQuantsClient {
  private readonly baseUrl: string;
  private readonly refreshToken: string;
  private readonly rateLimitMs: number;
  private idToken: string | null = null;
  private idTokenExpiresAt = 0;
  private pendingToken?: Promise<string>;

  constructor(options: ClientOptions) {
    this.refreshToken = options.refreshToken;
    this.baseUrl = (options.baseUrl ?? "https://api.jquants.com/v1/").replace(
      /\/+$/,
      "/"
    );
    this.rateLimitMs = options.rateLimitMs ?? 250;
  }

  /**
   * 上場企業情報を取得します。
   * @param params
   * @returns
   */
  async fetchListedInfo(
    params: RequestParams = {}
  ): Promise<ListedInfoRecord[]> {
    return this.fetchPaginated<ListedInfoRecord>("listed/info", "info", params);
  }

  async fetchDailyQuotes(params: RequestParams): Promise<DailyQuoteRecord[]> {
    return this.fetchPaginated<DailyQuoteRecord>(
      "prices/daily_quotes",
      "daily_quotes",
      params
    );
  }

  async fetchStatements(params: RequestParams): Promise<StatementRecord[]> {
    return this.fetchPaginated<StatementRecord>(
      "fins/statements",
      "statements",
      params
    );
  }

  private async fetchPaginated<R>(
    path: string,
    dataKey: string,
    params: RequestParams
  ): Promise<R[]> {
    const aggregated: R[] = [];
    let paginationKey: string | undefined;

    do {
      const pageParams = { ...params };
      if (paginationKey) {
        pageParams.pagination_key = paginationKey;
      }

      const payload = await this.request<PaginatedResponse<typeof dataKey, R>>(
        path,
        pageParams
      );
      const records = (payload as Record<string, R[]>)[dataKey] ?? [];
      aggregated.push(...records);
      paginationKey =
        typeof payload.pagination_key === "string"
          ? payload.pagination_key
          : undefined;

      if (paginationKey) {
        await this.sleep(this.rateLimitMs);
      }
    } while (paginationKey);

    return aggregated;
  }

  private async request<T>(path: string, params: RequestParams): Promise<T> {
    const idToken = await this.getIdToken();
    const url = new URL(path, this.baseUrl);
    console.log(
      `Requesting J-Quants API: ${path} with params`,
      params,
      url.toString()
    );
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined) return;
      url.searchParams.set(key, String(value));
    });

    try {
      const response = await axios.get<T>(url.toString(), {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw this.createAxiosError(error, "J-Quants request failed");
    }
  }

  private async getIdToken(): Promise<string> {
    if (this.idToken && Date.now() < this.idTokenExpiresAt) {
      return this.idToken;
    }

    if (!this.pendingToken) {
      this.pendingToken = this.refreshIdToken().finally(() => {
        this.pendingToken = undefined;
      });
    }

    return this.pendingToken;
  }

  private async refreshIdToken(): Promise<string> {
    const url = new URL("token/auth_refresh", this.baseUrl);
    url.searchParams.set("refreshtoken", this.refreshToken);
    let result: { idToken?: string };
    try {
      const response = await axios.post<{ idToken?: string }>(url.toString());
      result = response.data;
    } catch (error) {
      throw this.createAxiosError(error, "Failed to refresh J-Quants token");
    }

    if (!result.idToken) {
      throw new Error("J-Quants auth response did not include idToken");
    }

    this.idToken = result.idToken;
    console.log("Refreshed J-Quants ID token", this.idToken);
    this.idTokenExpiresAt = Date.now() + 1000 * 60 * 55; // refresh roughly every 55 minutes
    return result.idToken;
  }

  private createAxiosError(error: unknown, context: string): Error {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const statusText = error.response?.statusText ?? "Unknown";
      const body =
        error.response?.data !== undefined
          ? stringifyBody(error.response.data)
          : error.message;

      if (typeof status === "number") {
        return new Error(`${context} (${status} ${statusText}): ${body}`);
      }

      return new Error(`${context}: ${body}`);
    }

    if (error instanceof Error) {
      return new Error(`${context}: ${error.message}`);
    }

    return new Error(`${context}: ${String(error)}`);
  }

  private async sleep(ms: number): Promise<void> {
    if (ms <= 0) return;
    await new Promise((resolve) => setTimeout(resolve, ms));
  }
}

function stringifyBody(data: unknown): string {
  if (data === undefined || data === null) {
    return "No response body";
  }
  if (typeof data === "string") {
    return data;
  }
  try {
    return JSON.stringify(data);
  } catch {
    return String(data);
  }
}
