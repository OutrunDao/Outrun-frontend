import { useAccount, useWriteContract } from 'wagmi';
import { Button, useToast } from "@chakra-ui/react"
import { observer } from "mobx-react-lite"
import store from '@/app/stake/StakeStore'
import { LocalTokenSymbol } from "@/types/index.d"
import { LocalTokenAddress } from "@/contants/address";
import { parseEther } from "viem";

const withdrawABI = [{
  inputs: [
    {
      internalType: 'uint256',
      name: 'amount',
      type: 'uint256',
    },
  ],
  name: 'withdraw',
  outputs: [],
  stateMutability: 'nonpayable',
  type: 'function',
}]

const RedeemBtn = () => {
  const account = useAccount().address;
  const { writeContract } = useWriteContract()
  const toast = useToast()

  const onHandleRedeem = () => {
    const isETHRedeem = store.selectedToken === LocalTokenSymbol.RETH
    const address = isETHRedeem ? LocalTokenAddress[LocalTokenSymbol.RETH] : LocalTokenAddress[LocalTokenSymbol.RUSD]
    console.log('address', address);
    
    const params = {
      abi: withdrawABI,
      address,
      account: account,
      functionName: 'withdraw',
      args: [parseEther(store.inputValue)],
    }

    store.isLoadingBtn = true
    
    writeContract(params, {
      onError: (error) => {
        console.error('Redeem Error: ', error)
        toast({title: 'Redeem Failed', status: "error", description: error.message})
      },
      onSuccess: (data) => {
        console.log('Redeem success: ', data)
        toast({
          title: 'Redeem Successful', 
          status: "success"
        })
      },
      onSettled: () => {
        store.isLoadingBtn = false
      }
    })
    
  }

  return (
    <Button
      isLoading={store.isLoadingBtn}
      loadingText="Redeeming..."
      style={store.BtnStyle} 
      onClick={onHandleRedeem}>Redeem</Button>
  )
}

export default observer(RedeemBtn)