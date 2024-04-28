import { PublicClient, WalletClient, getAddress, getContract } from 'viem';
import RUSDAbi from '@/ABI/RUSD.json';
import { LocalTokenAddress } from '@/contants/address';

export const getUsdbContract = (walletClient: WalletClient) => {
  return getContract({
    abi: RUSDAbi,
    address: LocalTokenAddress.USDB,
    client: {
      wallet: walletClient,
    },
  });
};
