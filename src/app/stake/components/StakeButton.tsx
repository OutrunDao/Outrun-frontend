import { parseEther } from 'viem'
import { useWriteContract } from 'wagmi'
import { Text, Button, Flex, useToast } from '@chakra-ui/react'
import { LocalTokenAddress } from '@/contants/address'
import { TokenABIMap } from '@/ABI'
import { ContractAddrKey, LocalTokenSymbol } from '@/types/index.d';
import { TabType, MintType, StakeType, IIswitch } from '../types'
import { useEffect } from 'react'
import { blastSepolia } from 'viem/chains'

interface IProps {
  currentTabType: TabType,
  isSwitchCoin: IIswitch,
  isConnected: boolean,
  inputValue: string,
  account: `0x${string}` | undefined,
  coinSymbol: LocalTokenSymbol
}

const variants = ['solid', 'subtle', 'left-accent', 'top-accent']

const StakeButton = (props: IProps) => {
  if (!props.isConnected) {
    return <Flex justifyContent='center' alignItems="center" marginTop="22px">
      <w3m-button />
    </Flex>
  }
  
  const toast = useToast()
  const { inputValue, currentTabType, coinSymbol, account } = props
  const { writeContract } = useWriteContract()
 
  const onHandleMintStake = async () => {
    if (!account) return ''
    

    if (currentTabType === TabType.Mint) {
      const mintRethAddr = LocalTokenAddress[coinSymbol]      
      const abi = TokenABIMap[coinSymbol]
      toast({
        status: 'loading'
      })
      writeContract({
        abi,
        address: mintRethAddr,
        functionName: 'deposit',
        args: [],
        value: parseEther(inputValue),
        account
      }, {
        onError: (error) => {
          toast({
            title: `${TabType.Mint} failed!!`,
            status: "error",
          })
        },
        onSuccess: (data) => {
          console.log('onSuccess data', data);
          toast({
            title: `${TabType.Mint} succeed!!`,
            status: 'success',
          })
        },
      })
    }
  }

  return (
    <Button
      onClick={onHandleMintStake}
      colorScheme='rgb(52 30 56 / 50%)' 
      width="100%" 
      border="0.5px solid rgb(252 252 3)" 
      color="rgb(252 252 3)" 
      backgroundColor="rgb(52 30 56 / 50%)"
      marginTop="22px">
      { 
        props.currentTabType === TabType.Mint
        ?  
          <Text>
            { props.isSwitchCoin[TabType.Mint] === 0 ? MintType.Mint : MintType.Redeem }
          </Text> 
        : 
          <Text>
            { props.isSwitchCoin[TabType.Stake] === 0 ? StakeType.Stake : StakeType.Unstake }
          </Text> 
      }
    </Button>
  )
}

export default StakeButton