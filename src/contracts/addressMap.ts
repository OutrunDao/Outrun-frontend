
import { ChainId } from "./chains"
type AddressMap = { [chainId: number]: string };

export enum ContractName {
  SWAP_ROUTER = "SWAP_ROUTER",
  SWAP_FACTORY = "SWAP_FACTORY",
  ORETH_ORUSD = "ORETH_ORUSD",
  MULTICALL = "MULTICALL"
}
type ContractAddressMap = Record<ContractName, `0x${string}`>

export const addressMap = {
  [ChainId.BLAST_SEPOLIA]: {
    [ContractName.SWAP_ROUTER]: "0x4d821974783d88E4996241EcbBf62935180941a8",
    [ContractName.SWAP_FACTORY]: "0x01923F769C3B287A3C69a931736CAC02d6cF1fd6",
    [ContractName.MULTICALL]: "0xca11bde05977b3631167028862be2a173976ca11",
    [ContractName.ORETH_ORUSD]: "0x5e6c8991e1bddeae585cbb1f0d8d94d7fcb22f2e"
  }
} as Record<number, ContractAddressMap>

export const initCodeHashMap = {
  [ChainId.BLAST_SEPOLIA]: "0xc7a54a11719d30cbfa5e337adcc3c698634f31cf1106178a000aecab1cd84e12"
} as Record<number, `0x${string}`>