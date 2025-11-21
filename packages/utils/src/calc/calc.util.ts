export function bigintPercent(a: string, b: string, decimals = 2): number {
  const scale = BigInt(10 ** decimals);
  const value = (BigInt(a) * scale * 100n) / BigInt(b);

  const str = value.toString();
  const len = str.length;

  const integer = str.slice(0, len - decimals);
  const fraction = str.slice(len - decimals);

  return Number(`${integer}.${fraction}`);
}
