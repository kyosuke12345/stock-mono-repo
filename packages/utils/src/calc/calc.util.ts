import { FinsStatement } from "@repo/db";

export function bigintPercent(
  a: string | bigint,
  b: string | bigint,
  decimals = 2
): number {
  if (b === "0" || b === 0n) {
    return 0;
  }
  const scale = BigInt(10 ** decimals);
  const value = (BigInt(a) * scale * 100n) / BigInt(b);

  const str = value.toString();
  const len = str.length;

  const integer = str.slice(0, len - decimals);
  const fraction = str.slice(len - decimals);

  return Number(`${integer}.${fraction}`);
}

/**
 * bps = 純資産 / 発行済株式数（自己株式含む)
 * @param targetFinStatement
 * @returns
 */
export function calcBPS(targetFinStatement: FinsStatement): number | undefined {
  // BPS = 純資産 / 発行済株式数（自己株式含む)
  const netAssets = targetFinStatement.equity;
  const numberOfShares =
    targetFinStatement.numberOfIssuedAndOutstandingSharesAtTheEndOfFiscalYearIncludingTreasuryStock;

  if (netAssets && numberOfShares && numberOfShares !== "0") {
    return Number(BigInt(netAssets) / BigInt(numberOfShares));
  }
  return undefined;
}

/**
 * eps = 当期純利益 / 発行済株式数（自己株式含む)
 * @param targetFinStatement
 * @returns
 */
export function calcEPS(targetFinStatement: FinsStatement): number | undefined {
  // EPS = 当期純利益 / 発行済株式数（自己株式含む)
  const profit = targetFinStatement.profit;
  const numberOfShares =
    targetFinStatement.numberOfIssuedAndOutstandingSharesAtTheEndOfFiscalYearIncludingTreasuryStock;

  if (profit && numberOfShares && numberOfShares !== "0") {
    return Number(BigInt(profit) / BigInt(numberOfShares));
  }
}

/**
 * pbr = 株価 / 1株あたり純資産(bps)
 * @param targetStockValue
 * @param targetFinStatement
 * @returns
 */
export function calcPBR(
  targetStockValue: string | number,
  targetFinStatement: FinsStatement
): number | undefined {
  // PBR = 株価 / 1株あたり純資産(bps)
  const bps = calcBPS(targetFinStatement);
  if (bps && bps !== 0) {
    return Number(targetStockValue) / bps;
  }
  return undefined;
}

/**
 * per = 株価 / 1株あたり利益(eps)
 * @param targetStockValue
 * @param targetFinStatement
 * @returns
 */
export function calcPER(
  targetStockValue: string | number,
  targetFinStatement: FinsStatement
): number | undefined {
  // PER = 株価 / 1株あたり利益(eps)
  const eps = calcEPS(targetFinStatement);
  if (eps && eps !== 0) {
    return Number(targetStockValue) / eps;
  }
  return undefined;
}
