import { observer } from "mobx-react-lite"
import { useAccount, useWriteContract, useTransactionReceipt } from 'wagmi';
import { Button, useToast } from '@chakra-ui/react'
import store from '@/app/stake/StakeStore'
import RETHStakeManager from '@/ABI/RETHStakeManager'
import { ContractAddressMap, LocalTokenAddress } from "@/contants/address"
import { ContractAddrKey, LocalTokenSymbol } from "@/types/index.d"
import { parseEther } from 'viem'
import { useEffect, useState } from "react";

const approveABI = [{
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  }]
JSON.stringify(approveABI)

const StakeBtn = () => {
  const rEthManagAddr = ContractAddressMap[ContractAddrKey.RETHStakeManager]
  const rUsdManagAddr = ContractAddressMap[ContractAddrKey.RUSDStakeManager]
  const isEthHandle = store.selectedToken.includes('ETH')
  const managAddress = isEthHandle ? rEthManagAddr : rUsdManagAddr
  const tokenAddress = isEthHandle ? LocalTokenAddress.RETH : LocalTokenAddress.RUSD
  const account = useAccount().address;  
  const { writeContract, writeContractAsync } = useWriteContract()
  const [approveHash, setApproveHash] = useState<`0x${string}`>()
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const toast = useToast()

  const onHandleApprove = async () => {
    try {
      store.isLoadingBtn = true
      const approveHash = await writeContractAsync({
        abi: approveABI,
        address: tokenAddress,
        account,
        args: [managAddress, parseEther(store.inputValue)],
        functionName: 'approve',
      })
      setApproveHash(approveHash || '0x')
      store.isLoadingBtn = false
    } catch (error) {
      store.isLoadingBtn = false
    }
    
  }

  const approveData = useTransactionReceipt({
    hash: approveHash
  })

  const onHandleStake = async () => {
    setConfirmLoading(true)
    const params = {
      abi: RETHStakeManager,
      address: managAddress,
      account,
      functionName: 'stake',
      args: [parseEther(store.inputValue), 365, account, account, account]
    }

    writeContract(params, {
      onError: (error) => {
        console.error('onStake error', error);
        toast({
          title: 'Stake Failed',
          status: "error"
        })
      },
      onSuccess: (data) => {
        console.log('onStake error', data);
        toast({
          title: 'Stake Successful',
          status: "success"
        })
      },
      onSettled: () => {
        store.isLoadingBtn = false
        setConfirmLoading(false)
        setApproveHash(undefined)
      }
    })    
  }
  
  // approving
  if (approveHash && approveData && approveData.data?.status !== 'success') {
    return <Button style={store.BtnStyle} isLoading loadingText='Approving'></Button>
  }

  if (approveHash && approveData.data?.status === 'success') {
    return <Button isLoading={confirmLoading} loadingText="Confirming"  style={store.BtnStyle} onClick={onHandleStake}>Confirm</Button>
  }
  
  // before approve
  return (
    <Button loadingText="Staking" isLoading={store.isLoadingBtn} style={store.BtnStyle} onClick={onHandleApprove}>
      Stake
    </Button>
  )
}

export default observer(StakeBtn)