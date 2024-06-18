import { PublicClient, WalletClient, getContract } from 'viem';
import { ChainId } from "../chains";
import abi from '../abi/orUsdStake.json'
import { addressMap } from '../addressMap';

export default function getOrUsdStake(chainId: ChainId, publicClient: PublicClient, wallet?: WalletClient) {
  return getContract({
    abi,
    address: addressMap[chainId].ORUSD_STAKE,
    client: {
      wallet,
      public: publicClient
    }
  })
}