import axios from "axios";

type RequestParams = Record<string, string | number | undefined>;

type PaginatedResponse<R> = {
  pagination_key?: string | null;
  data?: R[];
};

export type ListedInfoRecord = {
  Code: string;
  Date: string;
  CoName?: string;
  CoNameEn?: string;
  S17?: string;
  S17Nm?: string;
  S33?: string;
  S33Nm?: string;
  ScaleCat?: string;
  Mkt?: string;
  MktNm?: string;
  Mrgn?: string;
  MrgnNm?: string;
};

export type DailyQuoteRecord = {
  Code: string;
  Date: string;
  O?: string | number;
  H?: string | number;
  L?: string | number;
  C?: string | number;
  UL?: string;
  LL?: string;
  Vo?: string | number;
  Va?: string | number;
  AdjFactor?: string | number;
  AdjO?: string | number;
  AdjH?: string | number;
  AdjL?: string | number;
  AdjC?: string | number;
  AdjVo?: string | number;
};

export type StatementRecord = {
  Code: string;
  DiscNo: string;
  DiscDate: string;
  DiscTime?: string;
  DocType?: string;
  CurPerType?: string;
  CurPerSt?: string;
  CurPerEn?: string;
  CurFYSt?: string;
  CurFYEn?: string;
  NxtFYSt?: string;
  NxtFYEn?: string;
  Sales?: string;
  OP?: string;
  OdP?: string;
  NP?: string;
  EPS?: string;
  DEPS?: string;
  BPS?: string;
  TA?: string;
  Eq?: string;
  EqAR?: string;
  CFO?: string;
  CFI?: string;
  CFF?: string;
  CashEq?: string;
  Div1Q?: string;
  Div2Q?: string;
  Div3Q?: string;
  DivFY?: string;
  DivAnn?: string;
  DivUnit?: string;
  DivTotalAnn?: string;
  PayoutRatioAnn?: string;
  FDiv1Q?: string;
  FDiv2Q?: string;
  FDiv3Q?: string;
  FDivFY?: string;
  FDivAnn?: string;
  FDivUnit?: string;
  FDivTotalAnn?: string;
  FPayoutRatioAnn?: string;
  NxFDiv1Q?: string;
  NxFDiv2Q?: string;
  NxFDiv3Q?: string;
  NxFDivFY?: string;
  NxFDivAnn?: string;
  NxFDivUnit?: string;
  NxFPayoutRatioAnn?: string;
  FSales2Q?: string;
  FOP2Q?: string;
  FOdP2Q?: string;
  FNP2Q?: string;
  FEPS2Q?: string;
  NxFSales2Q?: string;
  NxFOP2Q?: string;
  NxFOdP2Q?: string;
  NxFNp2Q?: string;
  NxFEPS2Q?: string;
  FSales?: string;
  FOP?: string;
  FOdP?: string;
  FNP?: string;
  FEPS?: string;
  NxFSales?: string;
  NxFOP?: string;
  NxFOdP?: string;
  NxFNp?: string;
  NxFEPS?: string;
  MatChgSub?: string;
  SigChgInC?: string;
  ChgByASRev?: string;
  ChgNoASRev?: string;
  ChgAcEst?: string;
  RetroRst?: string;
  ShOutFY?: string;
  TrShFY?: string;
  AvgSh?: string;
  NCSales?: string;
  NCOP?: string;
  NCOdP?: string;
  NCNP?: string;
  NCEPS?: string;
  NCTA?: string;
  NCEq?: string;
  NCEqAR?: string;
  NCBPS?: string;
  FNCSales2Q?: string;
  FNCOP2Q?: string;
  FNCOdP2Q?: string;
  FNCNP2Q?: string;
  FNCEPS2Q?: string;
  NxFNCSales2Q?: string;
  NxFNCOP2Q?: string;
  NxFNCOdP2Q?: string;
  NxFNCNP2Q?: string;
  NxFNCEPS2Q?: string;
  FNCSales?: string;
  FNCOP?: string;
  FNCOdP?: string;
  FNCNP?: string;
  FNCEPS?: string;
  NxFNCSales?: string;
  NxFNCOP?: string;
  NxFNCOdP?: string;
  NxFNCNP?: string;
  NxFNCEPS?: string;
};

type ClientOptions = {
  apiKey: string;
  baseUrl?: string;
  rateLimitMs?: number;
  /**
   * Maximum number of requests allowed in a sliding window.
   * Default: 5 requests per 60 seconds (current J-Quants limit).
   */
  maxRequestsPerWindow?: number;
  /**
   * Sliding window size in milliseconds.
   * Default: 60_000 ms (1 minute).
   */
  windowMs?: number;
};

export class JQuantsClient {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly maxRequestsPerWindow: number;
  private readonly windowMs: number;
  private rateLimiter: Promise<void> = Promise.resolve();
  private requestLog: number[] = [];

  constructor(options: ClientOptions) {
    this.apiKey = options.apiKey;
    this.baseUrl = (options.baseUrl ?? "https://api.jquants.com/v2/").replace(
      /\/+$/,
      "/"
    );
    this.maxRequestsPerWindow = options.maxRequestsPerWindow ?? 5;
    this.windowMs = options.windowMs ?? 70_000;
  }

  /**
   * 上場企業情報を取得します。
   * @param params
   * @returns
   */
  async fetchListedInfo(
    params: RequestParams = {}
  ): Promise<ListedInfoRecord[]> {
    return this.fetchPaginated<ListedInfoRecord>("equities/master", params);
  }

  async fetchDailyQuotes(params: RequestParams): Promise<DailyQuoteRecord[]> {
    return this.fetchPaginated<DailyQuoteRecord>("equities/bars/daily", params);
  }

  async fetchStatements(params: RequestParams): Promise<StatementRecord[]> {
    return this.fetchPaginated<StatementRecord>("fins/summary", params);
  }

  private async fetchPaginated<R>(
    path: string,
    params: RequestParams
  ): Promise<R[]> {
    const aggregated: R[] = [];
    let paginationKey: string | undefined;

    do {
      const pageParams = { ...params };
      if (paginationKey) {
        pageParams.pagination_key = paginationKey;
      }

      const payload = await this.request<PaginatedResponse<R>>(
        path,
        pageParams
      );
      const records = Array.isArray(payload.data) ? payload.data : [];
      aggregated.push(...records);
      paginationKey =
        typeof payload.pagination_key === "string"
          ? payload.pagination_key
          : undefined;
    } while (paginationKey);

    return aggregated;
  }

  private async request<T>(path: string, params: RequestParams): Promise<T> {
    await this.enqueueRateLimit();

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
          "x-api-key": this.apiKey,
        },
      });
      return response.data;
    } catch (error) {
      throw this.createAxiosError(error, "J-Quants request failed");
    }
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

  private async enqueueRateLimit(): Promise<void> {
    // Serialize rate-limit checks so concurrent calls don't violate the cap.
    this.rateLimiter = this.rateLimiter.then(() => this.waitForSlot());
    await this.rateLimiter;
  }

  private async waitForSlot(): Promise<void> {
    const now = Date.now();
    this.requestLog = this.requestLog.filter(
      (timestamp) => now - timestamp < this.windowMs
    );

    if (this.requestLog.length >= this.maxRequestsPerWindow) {
      const earliest = this.requestLog[0];
      const waitMs = earliest + this.windowMs - now;
      if (waitMs > 0) {
        await this.sleep(waitMs);
      }
    }

    this.requestLog.push(Date.now());
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
