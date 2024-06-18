
import { ChainId } from "./chains"
type AddressMap = { [chainId: number]: string };

export enum ContractName {
  SWAP_ROUTER = "SWAP_ROUTER",
  SWAP_FACTORY = "SWAP_FACTORY",
  ORETH_STAKE = 'ORETH_STAKE',
  ORUSD_STAKE = 'ORUSD_STAKE',
  ORETH_ORUSD = "ORETH_ORUSD",
  MULTICALL = "MULTICALL",
  ORETH = "ORETH",
  ORUSD = "ORUSD",
  OSUSD = "OSUSD",
  RUY = "RUY",
  REY = "REY",
  OSETH = "OSETH"
}
type ContractAddressMap = Record<ContractName, `0x${string}`>

export const addressMap = {
  [ChainId.BLAST_SEPOLIA]: {
    [ContractName.SWAP_ROUTER]: "0x865F99d2f92EB1a61d95aCA9C5c0fA72BB1F57a0",
    [ContractName.SWAP_FACTORY]: "0x583758BBD5B5fAF2983Be70B8E551829E1fbCc91",
    [ContractName.MULTICALL]: "0xca11bde05977b3631167028862be2a173976ca11",
    [ContractName.ORETH_ORUSD]: "0x523d550dFF0fd7FF7fc21DF6B2BB5CE6dFB5f3f0",
    [ContractName.ORETH]: "0xF62f5dB01cb60d80219F478D5CDffB6398Cee9A5",
    [ContractName.ORUSD]: "0xe04b19ed724A328C804e82e7196dcef18570bfae",
    [ContractName.OSUSD]: "0x989bAD96A66b9e87899E26Be20fB6f32B7432bB3",
    [ContractName.REY]: "0x645fC1E82a6732196B30C1e8b708267B887ABfCC",
    [ContractName.RUY]: "0xA1DC1c7cA6B714A6Bd88de75AD367E8DaecabdDc",
    [ContractName.OSETH]: "0x294285577306bc14224510966DFb81002A5a3C6E",
    [ContractName.ORETH_STAKE]: "0x7F5b6C208D2F426F17caae9db9331B9CB7a4a0CF",
    [ContractName.ORUSD_STAKE]: "0xC138764f11D922a4dB7bc4A83fD9bA10F7cfCDe1"
  }
} as Record<number, ContractAddressMap>


export const initCodeHashMap = {
  [ChainId.BLAST_SEPOLIA]: "0xb11291cf74ef5b01d3360f4240ee3ae9b64c14297affa289ced01c032c687976"
} as Record<number, `0x${string}`>