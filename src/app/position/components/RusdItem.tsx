import { useWriteContract, useReadContract, useAccount, useTransactionReceipt } from 'wagmi';
import { observer } from 'mobx-react-lite';
import store from '@/app/stake/StakeStore';
import { formatEther, numberToBytes } from 'viem';
import { Text, Box, Flex, useToast } from '@chakra-ui/react';
import RUSDStakeManage from '@/ABI/RETHStakeManager.json';
import { useMemo, useState } from 'react';
import { ContractAddressMap } from '@/contants/address';
import UnstakeButton from './UnstakeButton';
import ExtendDays from './ExtendDays';

interface IProps {
  id: string;
  positionId: string;
  amountInPUSD: string;
  amountInRUSD: string;
  amountInRUY: string;
  deadline: string;
}

const PositionItem = (props: IProps) => {
  const account = useAccount().address;
  const toast = useToast();
  const { writeContract, writeContractAsync } = useWriteContract();
  const [unstakeLoading, setUnstakeLoading] = useState<boolean>(false);
  const [unstakeHash, setUnstakeHash] = useState<`0x${string}`>();
  const contractAddr = ContractAddressMap.RUSDStakeManager;

  const params = {
    abi: RUSDStakeManage,
    address: contractAddr,
    functionName: 'positionsOf',
    account,
    args: [props.positionId],
  };

  const { data }: { data: { closed: boolean } | undefined } = useReadContract(params);

  const onUnstake = async () => {
    const writeParams = {
      abi: RUSDStakeManage,
      address: contractAddr,
      account,
      functionName: 'unstake',
      args: [props.positionId],
    };

    console.log('onUnstake writeParams', writeParams);

    setUnstakeLoading(true);

    writeContract(writeParams, {
      onError: (error) => {
        toast({
          title: 'Unstake failed',
          status: 'error',
        });
        console.error('onUnstake failed: ', error);
      },
      onSuccess: (txHash) => {
        setUnstakeHash(txHash);
      },
      onSettled: (data) => {
        setUnstakeLoading(false);
      },
    });
  };

  const timeStamp = Number(props.deadline || 0) * 1000;
  const date = new Date(timeStamp).toLocaleDateString();

  return (
    <Flex
      w="800px"
      justifyContent="space-between"
      alignItems="center"
      padding="12px 22px"
      backgroundColor="rgb(52 30 56 / 50%)"
      margin="16px"
      borderRadius="12px"
    >
      <Box>
        <Flex color="#999" justifyContent="flex-start" marginBottom="6px">
          <Text width="120px" color="#999" marginRight="12px" fontWeight="bold">
            Position ID:
          </Text>
          <Text color="#eaeaea" marginRight="22px">
            {props.positionId}
          </Text>
        </Flex>
        <Flex color="#999" justifyContent="flex-start" marginBottom="6px">
          <Text width="120px" color="#999" marginRight="12px" fontWeight="bold">
            RUSD Amount:
          </Text>
          <Text fontWeight="bold" color="#fff" marginRight="22px">
            {formatEther(BigInt(props.amountInPUSD))}
          </Text>
        </Flex>
        <Flex color="#999" justifyContent="flex-start" marginBottom="6px">
          <Text width="120px" color="#999" marginRight="12px" fontWeight="bold">
            PUSD Amount:
          </Text>
          <Text fontWeight="bold" color="#fff" marginRight="22px">
            {formatEther(BigInt(props.amountInRUSD))}
          </Text>
        </Flex>

        <Flex color="#999" justifyContent="flex-start" margin="6px 0">
          <ExtendDays
            amount={Number(props.amountInRUSD)}
            isETH={false}
            date={date}
            closed={data?.closed}
            positionId={props.positionId}
          ></ExtendDays>
        </Flex>
      </Box>

      <UnstakeButton
        unstakeLoading={unstakeLoading}
        hash={unstakeHash}
        onUnstake={onUnstake}
        closed={data?.closed}
      ></UnstakeButton>
    </Flex>
  );
};

export default observer(PositionItem);
