import { useState } from 'react';
import { useWriteContract, useReadContract, useAccount, useTransactionReceipt } from 'wagmi';
import {
  Input,
  Button,
  Tag,
  Text,
  Box,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderTrack,
  SliderThumb,
  useToast,
} from '@chakra-ui/react';
import RETHStakeManagerABI from '@/ABI/RETHStakeManager.json';
import { ContractAddressMap } from '@/contants/address';

interface IProps {
  positionId: string;
  closed: boolean | undefined;
  date: string;
}

const contractAddr = ContractAddressMap.RETHStakeManager;

const ExtendDays = (props: IProps) => {
  const { date, positionId, closed } = props;
  const [stakeDays, setStakeDays] = useState<number>(0);
  const account = useAccount().address;
  const { writeContract, writeContractAsync } = useWriteContract();
  const [exrendHash, setExrendHash] = useState<`0x${string}`>();
  const [loadingExtend, setLoadingExtend] = useState<boolean>(false);

  const toast = useToast();

  const onChangeDays = (val: number) => {
    setStakeDays(val);
  };

  const onExtendDays = async (positionId: string) => {
    setLoadingExtend(true);

    const writeParams = {
      abi: RETHStakeManagerABI,
      address: contractAddr,
      account,
      functionName: 'extendLockTime',
      args: [positionId, stakeDays],
    };

    try {
      const txHash = await writeContractAsync(writeParams);
      setExrendHash(txHash);
    } catch (error) {
      setLoadingExtend(false);
      setExrendHash(undefined);
      toast({
        title: 'Extend days failed',
        status: 'error',
      });
    }
  };

  const receiptData = useTransactionReceipt({
    hash: exrendHash,
  });

  if (receiptData.status === 'success') {
    setLoadingExtend(false);
    toast({
      title: 'Extend days successful',
      status: 'success',
    });
  }

  if (receiptData.status === 'error') {
    setLoadingExtend(false);
    toast({
      title: 'Extend days failed',
      status: 'error',
    });
  }

  console.log('receiptData', receiptData.status);

  return (
    <Box>
      <Flex marginBottom="12px">
        <Text width={120} color="#999" fontWeight="bold">
          Deadline Days:{' '}
        </Text>
        <Flex flex="1">
          {closed ? (
            <Tag color="red">Closed</Tag>
          ) : (
            <Flex borderRadius="6px">
              <Text color="#fff">{date}</Text>
              <Text color="green" fontWeight="bold" margin="0 12px">
                Active
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>

      {!closed && (
        <Flex alignItems="center">
          <Text width={120} color="#999" fontWeight="bold">
            Extend Days:
          </Text>

          <Flex justifyContent="space-between" alignItems="center">
            <Slider
              max={365}
              min={0}
              width="240px"
              aria-label="slider-ex-1"
              defaultValue={0}
              colorScheme="#fcfc10"
              onChangeEnd={(val) => onChangeDays(val)}
            >
              <SliderTrack bg="#fff">
                <SliderFilledTrack bg="#fcfc10" />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Flex marginLeft="16px" fontSize="15px" fontWeight="bold" width="160px" alignItems="center">
              <Text marginRight="6px" paddingLeft="8px" color="#fcfc10">
                {stakeDays}
              </Text>
              <Text>Days</Text>
              <Button
                isLoading={loadingExtend}
                loadingText="Extending days..."
                size="sm"
                height="32px"
                borderRadius="6px"
                marginLeft="12px"
                color="rgb(252 252 3)"
                backgroundColor="rgba(252, 252, 3, 0.1)"
                onClick={() => onExtendDays(positionId)}
              >
                Extend
              </Button>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Box>
  );
};

export default ExtendDays;
