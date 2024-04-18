import { useState } from 'react';
import { useWriteContract, useReadContract, useAccount, useTransactionReceipt } from 'wagmi';
import { Input, Button, Tag, Text, Box, Flex, useToast } from "@chakra-ui/react"
import RETHStakeManagerABI from '@/ABI/RETHStakeManager.json'
import { ContractAddressMap } from '@/contants/address';

interface IProps {
  positionId: string
  closed: boolean | undefined
  date:string
}

const contractAddr = ContractAddressMap.RETHStakeManager

const ExtendDays = (props: IProps) => {
  const { date, positionId, closed } = props
  
  const account = useAccount().address
  const { writeContract, writeContractAsync } = useWriteContract()
  
  const [extendDays, setExtendDays] = useState<string>("")
  const [exrendHash, setExrendHash] = useState<`0x${string}`>()
  const [hashLoading, setHashLoading] = useState<boolean>(false)

  const onExtendDays =async (positionId: string) => {
    const writeParams = {
      abi: RETHStakeManagerABI,
      address: contractAddr,
      account,
      functionName: 'extendLockTime',
      args: [positionId, extendDays]
    }
    setHashLoading(true)
    try {
      const txHash = await writeContractAsync(writeParams)
      setExrendHash(txHash)
    } catch (error) {
      setHashLoading(false)
      setExrendHash(undefined)
    }
  }


  const receiptData = useTransactionReceipt({
    hash: exrendHash,
  })

  console.log('receiptData', receiptData.status);
  

  return(
    <Flex>
      <Text color="#999" fontWeight="bold">Deadline Days: </Text>
      <Box flex="1">
        <Text color="#eaeaea" marginRight="22px">{date}</Text>
        {
          closed
          ? <Tag colorScheme='red'>Closed</Tag>
          : <>
            <Button size="sm" width="120px"  borderRadius="6px" colorScheme='green'>Active</Button>
            <Input width="100px" value={extendDays} onChange={(event) => setExtendDays(event.target.value)}></Input>
            <Button size="sm" width="120px"  borderRadius="6px" onClick={() => onExtendDays(positionId)}>Extend</Button>
          </>
        }
      </Box>
    </Flex> 
  )
}

export default ExtendDays