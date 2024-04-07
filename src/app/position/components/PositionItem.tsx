import { useWriteContract, useReadContract, useAccount } from 'wagmi';
import { formatEther } from 'viem'
import { Tag, Text, Box, Flex, useToast } from "@chakra-ui/react"
import RETHStakeManagerABI from '@/ABI/RETHStakeManager.json'
import { useState } from 'react';
import { ContractAddressMap } from '@/contants/address';
import UnstakeButton from './UnstakeButton'
interface IProps {
  positionId: string
}

interface PositionResponse {
  RETHAmount: string;
  PETHAmount: string;
  deadline: string;
  closed: boolean;
  owner: string;
}

const PositionItem = (props: IProps) => {
  const account = useAccount().address
  const toast = useToast()
  const { writeContract } = useWriteContract()
  const [unstakeLoading, setUnstakeLoading] = useState<boolean>(false)
  const [unstakeHash, setUnstakeHash] = useState<`0x${string}`>()
  const contractAddr = ContractAddressMap.RETHStakeManager
 
  const params = {
    abi: RETHStakeManagerABI,
    address: contractAddr,
    functionName: 'positionsOf',
    account,
    args: [props.positionId]
  }
  const { data }: { data: PositionResponse | undefined }  = useReadContract(params)
  const timeStamp = Number(data?.deadline || 0) * 1000
  const date = new Date(timeStamp).toLocaleDateString()  
  const onUnstake = async () => {
    const writeParams = {
      abi: RETHStakeManagerABI,
      address: contractAddr,
      account,
      functionName: 'unstake',
      args: [props.positionId]
    }
      
    console.log('onUnstake writeParams', writeParams);
      
    setUnstakeLoading(true)

    writeContract(writeParams, {
      onError: (error) => {
        console.error('onUnstake failed: ', error);
        toast({
          title: "Unstake failed",
          status: "error",
          description: error.message
        })
      },
      onSuccess: (txHash) => {
        setUnstakeHash(txHash)
      },
      onSettled: (data) => {
        setUnstakeLoading(false)
      }
    })
  }

  return (
    <Flex w="800px" justifyContent="space-between" alignItems='center' padding="12px 22px" backgroundColor="rgb(52 30 56 / 50%)" margin="16px" borderRadius="12px"> 
      <Box>
        <Flex color="#999" justifyContent="flex-start">
          <Text color="#999" marginRight="12px" fontWeight="bold">Position ID: </Text>
          <Text color="#eaeaea" marginRight="22px">{props.positionId}</Text>
        </Flex>
        <Flex color="#999" justifyContent="flex-start">
          <Text color="#999" marginRight="12px" fontWeight="bold">Owner: </Text>
          <Text color="#eaeaea" marginRight="22px">{data?.owner}</Text>
        </Flex>
        <Flex color="#999" justifyContent="flex-start">
          <Text color="#999" marginRight="12px" fontWeight="bold">Stake Pairs: </Text>
          <Text color="#eaeaea" marginRight="22px">PETH/RETH({formatEther(BigInt(data?.PETHAmount || 0n))})</Text>
        </Flex>
        <Flex color="#999" justifyContent="flex-start" margin="12px 0">
          <Text color="#999" marginRight="12px" fontWeight="bold">Deadline Days: </Text>
          <Text color="#eaeaea" marginRight="22px">{date}</Text>
          {
            data?.closed 
            ? <Tag colorScheme='red'>Closed</Tag>
            : <Tag colorScheme='green'>Active</Tag>
          }
        </Flex>
      </Box>

      <UnstakeButton 
        unstakeLoading={unstakeLoading} 
        hash={unstakeHash} 
        onUnstake={onUnstake} 
        closed={data?.closed} ></UnstakeButton>
    </Flex>
  )
}

export default PositionItem