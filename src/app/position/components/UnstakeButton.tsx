import { useEffect, useState } from "react"
import { Button, Tag, Text, Heading, Box, Flex } from "@chakra-ui/react"
import { useAccount, useWriteContract, useTransactionReceipt } from 'wagmi';

interface IProps {
  hash: `0x${string}` | undefined
  closed: boolean | undefined
  onUnstake: () => void
  unstakeLoading: boolean
}

const UnstakeButton = (props: IProps) => {
  const { hash, onUnstake, unstakeLoading } = props
  const receiptData = useTransactionReceipt({
    hash: hash
  })

  // step - 2(unstaking，not completed yet)
  if ( !unstakeLoading && hash && receiptData.data?.status !== 'success') {
    return <Button isLoading loadingText="waiting..." isDisabled size="sm" colorScheme='orange' variant='solid'></Button>
  }
  
  // step - 3(from unstaking to unstaked)
  if (!unstakeLoading && hash && receiptData.data?.status === 'success') {
    return <Button colorScheme='blue' variant='solid' isDisabled>Closed</Button>
  }

  // Already unstaked
  if (props.closed) {
    return <Button colorScheme='blue' variant='solid' isDisabled>Closed</Button>
  }

  // step - 1(before unstake)
  return <Button isLoading={unstakeLoading} loadingText="Unstaking..." onClick={onUnstake} size="sm" colorScheme='red' variant='solid'>Unstake</Button>
}


export default UnstakeButton