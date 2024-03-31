import { formatEther, parseEther } from 'viem'
import { useWatchContractEvent, useWriteContract, useReadContract, useTransactionReceipt } from 'wagmi'
import { Text, Button, Flex, useToast, Box } from '@chakra-ui/react'
import { LocalTokenAddress, ContractAddressMap } from '@/contants/address'
import { TokenABIMap } from '@/ABI'
import { ContractAddrKey, LocalTokenSymbol } from '@/types/index.d';
import { TabType, MintType, StakeType } from '@/app/stake/types'
import { useState } from 'react'

import MintBtn from './MintBtn'
import RedeemBtn from './RedeemBtn'

interface IProps {
  switchState: 0 | 1,
  selectedToken: LocalTokenSymbol
}

const MintAndRedeem = (props: IProps) => {
  const { switchState, selectedToken } = props
  
  if (switchState === 0) {
    return <MintBtn selectedToken={selectedToken}></MintBtn>
  }

  return <RedeemBtn></RedeemBtn>
}

export default MintAndRedeem