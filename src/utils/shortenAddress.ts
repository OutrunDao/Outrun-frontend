export default function shortenAddress(addr: string) {
  return addr.substring(0, 6) + '...' + addr.substring(addr.length - 6)
}