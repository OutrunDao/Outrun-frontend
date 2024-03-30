import { formatEther, parseEther } from 'viem'
import { useWatchContractEvent, useWriteContract, useReadContract, useTransactionReceipt } from 'wagmi'
import { Text, Button, Flex, useToast, Box } from '@chakra-ui/react'
import { LocalTokenAddress, ContractAddressMap } from '@/contants/address'
import { TokenABIMap } from '@/ABI'
import { ContractAddrKey, LocalTokenSymbol } from '@/types/index.d';
import { TabType, MintType, StakeType } from '../types'
import { useState } from 'react'
import { getABIByToken } from '../stake-utils'

interface IProps {
  tokenBalance: string,
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
  const { inputValue, currentTabType, selectedToken, account, switchState, tokenBalance } = props
  const { writeContract, writeContractAsync } = useWriteContract()
  
  if (!account) return;

  const RETH = LocalTokenSymbol.RETH
  const ETH = LocalTokenSymbol.ETH
  const RUSD = LocalTokenSymbol.RUSD
  const PETH = LocalTokenSymbol.PETH
  
  const RETHAddr = LocalTokenAddress[RETH]  
  const RUSDAddr = LocalTokenAddress[RUSD]
  const MintABI = TokenABIMap[LocalTokenSymbol.RETH]

  const [approveHash, setApproveHash] = useState<`0x${string}` | undefined>()
  const approveData = useTransactionReceipt({
    hash: approveHash
  })
  const isApproving = approveHash && approveData?.status === 'pending' ? true : false
    
  const onHandleButton = async () => {
    if (currentTabType === TabType.Mint) {
      onHandleMint()
    } else {
      if (approveData.data?.status === 'success' && approveHash) {
        onHandleStake()
      } else {
        const val = parseEther(inputValue)
        const approveResult = await onHandleApprove()
        setApproveHash(approveResult)
      }
    }
  }

  const onHandleApprove = async () => {
    return writeContractAsync({
      abi: TokenABIMap[LocalTokenSymbol.RETH],
      address: RETHAddr,
      account,
      args: [ContractAddressMap[ContractAddrKey.RETHStakeManager], parseEther(inputValue)],
      functionName: 'approve',
    })
  }

  const onHandleMint = () => {
    const isMint = switchState === 0 
    const functionName = isMint ? 'deposit' : 'withdraw'
    const isRETHMint = selectedToken === RETH || selectedToken === ETH
    const address = isRETHMint ? RETHAddr : RUSDAddr

    console.log('functionName', functionName);
    

    const writeContractParams = {
      abi: MintABI,
      address,
      account,
      functionName,
      value: isMint && isRETHMint ? parseEther(inputValue) : 0n,
      args: isMint && isRETHMint ? [] : [parseEther(inputValue)]
    }
    
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

  const onHandleStake = () => {
    if (data.status === 'pending' || !approveHash) return

    const keyReth = ContractAddrKey.RETHStakeManager
    const keyRusd = ContractAddrKey.RUSDStakeManager
    const RETHStakeManageAddr = ContractAddressMap[keyReth]
    const RUSDStakeManageAddr = ContractAddressMap[keyRusd]
    const isStake = switchState === 0 
    const functionName = isStake ? 'stake' : 'unstake'
    const isRETHStake = selectedToken === RETH || selectedToken === PETH
    const address = isRETHStake ? RETHStakeManageAddr : RUSDStakeManageAddr
    const ABI = isRETHStake ? TokenABIMap[keyReth] : TokenABIMap[RUSD]
   
    const writeContractParams = {
      abi: ABI,
      address,
      account,
      functionName,
      args: [parseEther(inputValue), 365, account, account, account]
    }

    writeContract(writeContractParams, {
      onError: (error) => {
        console.log('onError', error)
      },
      onSuccess: (data) => {
        console.log('onSuccess', writeContractParams);
      },
      onSettled: () => {
        setApproveHash(undefined)
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
        <Box>
          {
            isApproving 
            ?
              <Text>Approving...</Text>
            : 
              <Text>
                { props.switchState === 0 ? StakeType.Stake : StakeType.Unstake }
              </Text> 
          }
        </Box>
      }
    </Button>
  )
}

export default StakeButton