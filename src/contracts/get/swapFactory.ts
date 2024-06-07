import { PublicClient, WalletClient, getContract } from 'viem';
import { ChainId } from "../chains";
import abi from '../abi/swapFactory.json'
import { addressMap } from '../addressMap';

export default function getSwapFactory(chainId: ChainId, publicClient: PublicClient, wallet?: WalletClient) {
  return getContract({
    abi,
    address: addressMap[chainId].SWAP_FACTORY,
    client: {
      wallet,
      public: publicClient
    }
  })
}