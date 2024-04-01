import { LocalTokenAddress } from "@/contants/address";
import { Button } from "@chakra-ui/react"
import { LocalTokenSymbol } from "@/types/index.d"
import { observer } from "mobx-react-lite"
import { parseEther } from 'viem';
import { useAccount, useWriteContract } from 'wagmi';
import store from '@/app/stake/StakeStore'

const depositABI = [{
  inputs: [],
  name: 'deposit',
  outputs: [],
  stateMutability: 'payable',
  type: 'function',
}]

const MintBtn = () => {
  const { writeContract } = useWriteContract()
  const account = useAccount().address;  

  const onHandleMint = () => {
    const mintToken = store.selectedToken === LocalTokenSymbol.ETH ? LocalTokenSymbol.RETH : LocalTokenSymbol.RUSD
    const address = LocalTokenAddress[mintToken]
    const writeContractParams = {
      abi: depositABI,
      address,
      account,
      functionName: 'deposit',
      value: parseEther(store.inputValue),
      args: store.selectedToken === LocalTokenSymbol.ETH ? [] : [parseEther(store.inputValue)]
    }

    writeContract(writeContractParams, {
      onError: (error) => {
        console.error('writeContract error', error)
      },
      onSuccess: (data) => {
        console.log('writeContract success', data)
      }
    })
  }
  return (
    <Button style={store.BtnStyle} onClick={onHandleMint}>
      Mint
    </Button>
  )
}

export default observer(MintBtn)