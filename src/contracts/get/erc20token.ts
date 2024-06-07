import { Address, PublicClient, WalletClient, getContract } from 'viem';
import { ChainId } from "../chains";
import abi from '../abi/erc20.json'

export default function getTokenContract(address: Address, publicClient: PublicClient, wallet?: WalletClient) {
  return getContract({
    abi,
    address,
    client: {
      wallet,
      public: publicClient
    }
  })
}