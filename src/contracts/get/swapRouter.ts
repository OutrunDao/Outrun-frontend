import { PublicClient, WalletClient, getAddress, getContract } from 'viem';
import { ChainId } from "../chains";
import abi from '../abi/swapRouter.json'
import { addressMap } from '../addressMap';

export default function getSwapRouter(chainId: ChainId, publicClient: PublicClient, wallet?: WalletClient) {
  return getContract({
    abi,
    address: addressMap[chainId].SWAP_ROUTER,
    client: {
      wallet,
      public: publicClient
    }
  })
}