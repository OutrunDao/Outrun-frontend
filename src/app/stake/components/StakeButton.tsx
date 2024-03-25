import { parseEther } from 'viem'
import { useWriteContract } from 'wagmi'
import { Text, Button, Flex, useToast } from '@chakra-ui/react'
import { LocalTokenAddress, ContractAddressMap } from '@/contants/address'
import { TokenABIMap } from '@/ABI'
import { ContractAddrKey, LocalTokenSymbol } from '@/types/index.d';
import { TabType, MintType, StakeType } from '../types'

interface IProps {
  currentTabType: TabType,
  switchState: 0 | 1,
  isConnected: boolean,
  inputValue: string,
  account: `0x${string}` | undefined,
  selectedToken: LocalTokenSymbol
}

const variants = ['solid', 'subtle', 'left-accent', 'top-accent']

const StakeButton = (props: IProps) => {
  if (!props.isConnected) {
    return <Flex justifyContent='center' alignItems="center" marginTop="22px">
      <w3m-button />
    </Flex>
  }
  
  const toast = useToast()
  const { inputValue, currentTabType, selectedToken, account, switchState } = props
  const { writeContract } = useWriteContract()
  
  const RETH = LocalTokenSymbol.RETH
  const ETH = LocalTokenSymbol.ETH
  const RUSD = LocalTokenSymbol.RUSD
  const PETH = LocalTokenSymbol.PETH
  const RETHAddr = LocalTokenAddress[RETH]
  
  const RUSDAddr = LocalTokenAddress[RUSD]
  const MintABI = TokenABIMap[LocalTokenSymbol.RETH]
  
  const onHandleButton = async () => {
    if (currentTabType === TabType.Mint) {
      onHandleMint()
    } else {
      await onHandleApprove()
      // onHandleStake()
    }
  }

  const onHandleMint = () => {
    const isMint = switchState === 0 
    const functionName = isMint ? 'deposit' : 'withdraw'
    const isRETHMint = selectedToken === RETH || selectedToken === ETH
    const address = isRETHMint ? RETHAddr : RUSDAddr

    const writeContractParams = {
      abi: MintABI,
      address,
      account,
      functionName,
      value: isMint && isRETHMint ? parseEther(inputValue) : 0n,
      args: isMint && isRETHMint ? [] : [parseEther(inputValue)]
    }
    
    if (!account) return;
    
    toast({
      status: 'loading',
      description: `Loading...`
    })

    writeContract(writeContractParams, {
      onError: (error) => {
        console.log('writeContract error', error)
        toast({
          title: `${TabType.Mint} failed!!`,    
        })
      },
      onSuccess: (data) => {
        let text = ''

        if (TabType.Mint === currentTabType) {
          text = switchState === 0 ? 'Mint' : 'Redeem'
        } else {
          text = switchState === 0 ? 'Stake' : 'Unstake'
        }

        toast({
          title: `${text} succeed!!`,
        })
      }
    })


    console.log('writeContractParams', writeContractParams);
  }
  
  const onHandleApprove = async () => {
    writeContract({
      abi: TokenABIMap[LocalTokenSymbol.RETH],
      address: RETHAddr,
      account,
      args: [ContractAddressMap[ContractAddrKey.RETHStakeManager], parseEther('10')],
      functionName: 'approve',
    }, {
      onError: (error) => {
        console.log('onHandleApprove error', error)
      },
      onSuccess: (data) => {
        console.log('onSuccess data', data)
        setTimeout(async () => {
          onHandleStake()
        }, 10000)
      }
    })
  }

  const onHandleStake = () => {
    const keyReth = ContractAddrKey.RETHStakeManager
    const keyRusd = ContractAddrKey.RUSDStakeManager
    const keyPeth = LocalTokenSymbol.PETH
    const keyRey = LocalTokenSymbol.REY
    const RETHStakeManageAddr = ContractAddressMap[keyReth]
    const RUSDStakeManageAddr = ContractAddressMap[keyRusd]
    const PETHAddr = LocalTokenAddress[keyPeth]
    const REYAddr = LocalTokenAddress[keyRey]
    const isStake = switchState === 0 
    const functionName = isStake ? 'stake' : 'unstake'
    const isRETHStake = selectedToken === RETH || selectedToken === PETH
    const address = isRETHStake ? RETHStakeManageAddr : RUSDStakeManageAddr
    const ABI = isRETHStake ? TokenABIMap[keyReth] : TokenABIMap[RUSD]
   
    if (!account) return;

    const writeContractParams = {
      abi: ABI,
      address,
      account,
      functionName,
      args: [100000000000000000, 30, account, PETHAddr, REYAddr]
    }

    writeContract(writeContractParams, {
      onError: (error) => {
        console.log('onError', error)
      },
      onSuccess: (data) => {
        console.log('onSuccess', writeContractParams);
      }
    })
    
  }

  return (
    <Button
      onClick={onHandleButton}
      colorScheme='rgb(52 30 56 / 50%)' 
      width="100%" 
      border="0.5px solid rgb(252 252 3)" 
      color="rgb(252 252 3)" 
      backgroundColor="rgb(52 30 z56 / 50%)"
      marginTop="22px">
      { 
        props.currentTabType === TabType.Mint
        ?  
          <Text>
            { props.switchState === 0 ? MintType.Mint : MintType.Redeem }
          </Text> 
        : 
          <Text>
            { props.switchState === 0 ? StakeType.Stake : StakeType.Unstake }
          </Text> 
      }
    </Button>
  )
}

export default StakeButton