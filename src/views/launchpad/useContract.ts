import { useWalletClient, usePublicClient } from 'wagmi';
import { WalletClient, getContract, parseEther, parseUnits, Address } from 'viem'
import { abi } from './abi'
import { ContractAddressMap } from '@/contants/address'
import { ContractAddrKey } from '@/types/index.d'
import { useToast } from '@chakra-ui/react';
import { retry } from 'radash';

function getLaunchContract(client: WalletClient) {
  return getContract({
    abi,
    address: ContractAddressMap[ContractAddrKey.EthFFLauncher],
    client
  })
}

export function useContract() {
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient()
  const toast = useToast()

  async function deposit(amount: string) {
    return await writeContract('deposit', [], {
      value: parseEther(amount)
    })
  }
  async function writeContract(method: string, args: any[], config: any) {
    if (!walletClient) return;
    const contract = getLaunchContract(walletClient)
    try {
      let toastCurrent = toast({
        status: 'loading',
        title: 'submiting transaction',
        description: 'please wait...',
        duration: null,
        isClosable: true,
      });
      const tx = await contract.write[method](args, config)
      toast.update(toastCurrent, {
        title: 'transaction submitted',
        description: "Waiting for block confirmation",
        status: "loading"
      })

      const data = await retry({ times: 20, delay: 5000 }, async () => {
        return await publicClient!.getTransactionReceipt({
          hash: tx as Address,
        });
      });
      toast.update(toastCurrent, {
        status: data.status === "success" ? "success" : "error",
        title: data.status === "success" ? method + ' success' : method + "  fail",
        description: "",
        duration: 10000
      })
    } catch (e: any) {
      toast.closeAll()
      toast({
        title: 'transaction failed',
        description: e.message,
        status: 'error',
        duration: 6000,
        isClosable: true,
      });
    }

  }

  return {
    deposit
  }
}