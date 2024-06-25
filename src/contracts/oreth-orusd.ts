import { computePairAddress } from "@/packages/swap-sdk";
import { RETH } from "./reth";
import { RUSD } from "./rusd";
import { addressMap } from "./addressMap";
import { ChainId } from "./chains";

console.log(computePairAddress({
  factoryAddress: addressMap[ChainId.BLAST_SEPOLIA].SWAP_FACTORY,
  tokenA: RETH[ChainId.BLAST_SEPOLIA],
  tokenB: RUSD[ChainId.BLAST_SEPOLIA]
}))