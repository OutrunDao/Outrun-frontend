import { PublicClient, WalletClient, getContract } from 'viem';
import { ChainId } from "../chains";
import { addressMap } from '../addressMap';

export default function getORUSD(chainId: ChainId, publicClient: PublicClient, wallet?: WalletClient) {
  return getContract({
    abi: [
      {
        "type": "function",
        "name": "deposit",
        "inputs": [
          { "name": "amount", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "withdraw",
        "inputs": [
          { "name": "amount", "type": "uint256", "internalType": "uint256" }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
    ],
    address: addressMap[chainId].ORUSD,
    client: {
      wallet,
      public: publicClient
    }
  })
}