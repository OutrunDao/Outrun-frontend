export default function getApy(volume24h: string, tvl: string) {
  if (tvl === '0') return 0
  const dailyRate = (+ volume24h * 0.003 / +tvl)
  const annualRate = Math.pow(1 + dailyRate, 365) - 1
  return (annualRate * 100).toFixed(2)
}