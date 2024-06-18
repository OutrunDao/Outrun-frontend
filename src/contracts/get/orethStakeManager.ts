import { PublicClient, WalletClient, getContract } from 'viem';
import { ChainId } from "../chains";
import abi from '../abi/orEthStake.json'
import { addressMap } from '../addressMap';

export default function getOrethStake(chainId: ChainId, publicClient: PublicClient, wallet?: WalletClient) {
  return getContract({
    abi,
    address: addressMap[chainId].ORETH_STAKE,
    client: {
      wallet,
      public: publicClient
    }
  })
}