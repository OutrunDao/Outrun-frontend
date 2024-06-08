import { usePublicClient, useWalletClient } from 'wagmi';
import { ContractName } from '@/contracts/addressMap'
import { Abi, Address, BaseError, ContractFunctionRevertedError, GetContractReturnType, WalletClient } from 'viem'
import { useMemo, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { get, retry } from 'radash';
import getSwapRouter from '@/contracts/get/swapRouter';
import getSwapFactory from '@/contracts/get/swapFactory';

type Options = {
  loadingModal?: boolean;
  actionTitle: string
}

type ContractInstance = GetContractReturnType<Abi, WalletClient, Address>

/**
 * use contract()
 */
export default function useContract() {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  async function writeAsync(contractName: ContractName | ContractInstance, opts: Options, action: string, args: (string | bigint | string[])[], _opts: any) {
    let contract;
    if (!publicClient) return
    if (typeof (contractName) !== "string") contract = contractName;
    if (contractName === ContractName.SWAP_ROUTER) contract = getSwapRouter(publicClient.chain.id, publicClient, walletClient)
    if (contractName === ContractName.SWAP_FACTORY) contract = getSwapFactory(publicClient.chain.id, publicClient, walletClient)
    if (!contract) return
    const options = Object.assign({
      loadingModal: true
    }, opts)
    const currentToast = toast({
      status: "loading",
      title: options.actionTitle,
      description: "submitting transaction...",
      isClosable: false,
      duration: null
    })
    try {
      setLoading(true);
      const { result, request } = await contract.simulate[action](args, _opts)
      // console.log(result, request);

      // @ts-ignore
      const tx = await contract.write[action](request)
      toast.update(currentToast, {
        status: "loading",
        title: options.actionTitle,
        description: "submitted success, waiting for block confirmations..."
      })
      const data = await retry({ times: 20, delay: 5000 }, async () => {
        return await publicClient!.getTransactionReceipt({
          hash: tx as Address,
        });
      });
      toast.update(currentToast, {
        status: data.status === 'success' ? 'success' : "error",
        title: options.actionTitle,
        description: data.status === 'success' ? 'block confirmed successful' : "block confirmed failed",
        duration: 10000,
        isClosable: true,
      });
      setLoading(false);
      return data
    } catch (err: any) {
      setLoading(false);
      console.log(err);

      let errMessage = err.message
      if (err instanceof BaseError) {
        const revertError = err.walk(err => err instanceof ContractFunctionRevertedError)
        if (revertError instanceof ContractFunctionRevertedError) {
          const errorName = get(revertError, 'data.errorName')
          const errorReason = get(revertError, 'reason')
          errMessage = `${errorName}: ${errorReason}` || errMessage
        }
      }
      toast.update(currentToast, {
        status: "error",
        title: options.actionTitle,
        description: errMessage || "call contract failed",
        duration: 20000,
        isClosable: true
      })
    }
  }

  return {
    write: writeAsync,
    loading
  }
}