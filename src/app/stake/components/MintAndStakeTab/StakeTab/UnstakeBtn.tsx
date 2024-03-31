import { observer } from "mobx-react-lite"
import { useAccount, useWriteContract } from 'wagmi';
import {Button} from '@chakra-ui/react'
import store from '@/app/stake/StakeStore'
import RETHStakeManager from '@/ABI/RETHStakeManager'
import { ContractAddressMap } from "@/contants/address"
import { ContractAddrKey } from "@/types/index.d"
import { parseEther } from 'viem'

const UnstakeBtn = () => {
  const rEthAddr = ContractAddressMap[ContractAddrKey.RETHStakeManager]
  const rUsdAddr = ContractAddressMap[ContractAddrKey.RUSDStakeManager]
  const address =  store.selectedToken.includes('ETH') ? rEthAddr : rUsdAddr
  const account = useAccount().address;  
  const { writeContract, writeContractAsync } = useWriteContract()

  const onHandleStake = () => {
    store.isLoadingBtn = true
    const params = {
      abi: RETHStakeManager,
      address,
      account,
      functionName: 'unstake',
      args: [parseEther(store.inputValue), 365, account, account, account]
    }
    writeContract(params, {
      onError: (error) => {
        console.error('onStake error', error);
      },
      onSuccess: (data) => {
        console.log('onStake error', data);
      },
      onSettled: () => {
        store.isLoadingBtn = false
      }
    })
  }

  return (
    <Button isLoading={store.isLoadingBtn} style={store.BtnStyle} onClick={onHandleStake}>
      Stake
    </Button>
  )
}

export default observer(UnstakeBtn)