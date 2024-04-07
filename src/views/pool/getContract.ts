import { PublicClient, WalletClient, getAddress, getContract } from 'viem';
import { V2_FACTORY_ADDRESSES, V2_ROUTER_ADDRESSES } from '@/packages/swap-core';
import { routerAbi } from './router.abi';
export function getFactoryContract(publicClient: PublicClient) {
  return getContract({
    abi: [
      {
        type: 'function',
        name: 'getPair',
        inputs: [
          { name: 'tokenA', type: 'address', internalType: 'address' },
          { name: 'tokenB', type: 'address', internalType: 'address' },
        ],
        outputs: [{ name: 'pair', type: 'address', internalType: 'address' }],
        stateMutability: 'view',
      },
    ],
    address: getAddress(V2_FACTORY_ADDRESSES[publicClient.chain!.id]),
    client: publicClient,
  });
}

export function getRouterContract(walletClient: WalletClient) {
  return getContract({
    abi: routerAbi,
    address: getAddress(V2_ROUTER_ADDRESSES[walletClient.chain!.id]),
    client: {
      wallet: walletClient,
    },
  });
}
