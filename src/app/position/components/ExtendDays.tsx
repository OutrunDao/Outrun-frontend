import { useState } from 'react';
import {
  usePublicClient,
  useWalletClient,
  useWriteContract,
  useReadContracts,
  useAccount,
  useTransactionReceipt,
} from 'wagmi';
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
import { Address, formatEther } from 'viem';
import { observer } from 'mobx-react-lite';
import store from '@/app/stake/StakeStore';
import { getTxStatus } from '@/app/stake/utils';

interface IProps {
  positionId: string;
  closed: boolean | undefined;
  date: string;
  isETH: boolean;
  amount: number;
}

const contractAddr = ContractAddressMap.RETHStakeManager;

interface ISlideProps {
  onChangeDays: (val: number) => void;
  account: Address;
}

const SliderDays = (props: ISlideProps) => {
  const readParams = {
    abi: RETHStakeManagerABI,
    address: contractAddr,
    account: props.account,
    functionName: 'maxLockupDays',
    args: [],
  };

  const { data: [maxLockupDays, minLockupDays] = [] } = useReadContracts({
    contracts: [
      {
        ...readParams,
      },
      {
        ...readParams,
        functionName: 'minLockupDays',
      },
    ],
  });

  return (
    <Slider
      max={(maxLockupDays?.result as number) || 365}
      min={(minLockupDays?.result as number) || 7}
      width="240px"
      aria-label="slider-ex-1"
      defaultValue={30}
      colorScheme="#fcfc10"
      onChangeEnd={(val: number) => props.onChangeDays(val)}
    >
      <SliderTrack bg="#fff">
        <SliderFilledTrack bg="#fcfc10" />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  );
};

const ExtendDays = (props: IProps) => {
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const { date, positionId, closed } = props;
  const [stakeDays, setStakeDays] = useState<number>(30);
  const account = useAccount().address;
  const [exrendHash, setExrendHash] = useState<`0x${string}`>();
  const [loading, setLoading] = useState<boolean>(false);

  const toast = useToast();

  const onChangeDays = (val: number) => {
    setStakeDays(val);
  };

  const onExtendDays = async (positionId: string) => {
    setLoading(true);
    const token = props.isETH ? 'REY' : 'RUY';

    try {
      const tx = await walletClient!.writeContract({
        address: contractAddr,
        abi: RETHStakeManagerABI,
        account,
        functionName: 'extendLockTime',
        args: [positionId, stakeDays],
      });

      const result = await getTxStatus(publicClient!, tx);
      if (result.status === 'success') {
        toast({
          title: 'Extend days successful',
          status: 'success',
          description: `Earned ${formatEther(BigInt(props.amount))} ${token} successful`,
        });
      }
    } catch (error) {
      toast({
        title: 'Extend days failed',
        status: 'error',
      });
      console.log('onExtendDays failed: ', error);
    }
    setLoading(false);
  };

  return (
    <Box>
      <Flex marginBottom="12px">
        <Text width={120} color="#999" fontWeight="bold">
          Deadline Days:{' '}
        </Text>
        <Flex flex="1">{closed ? <Tag color="red">Closed</Tag> : <Text color="#fff">{date}</Text>}</Flex>;
      </Flex>

      {!closed && (
        <Flex alignItems="center">
          <Text width={120} color="#999" fontWeight="bold">
            Extend Days:
          </Text>

          <SliderDays account={account!} onChangeDays={onChangeDays}></SliderDays>

          <Flex justifyContent="space-between" alignItems="center">
            <Flex marginLeft="16px" fontSize="15px" fontWeight="bold" width="160px" alignItems="center">
              <Text marginRight="6px" paddingLeft="8px" color="#fcfc10">
                {stakeDays}
              </Text>
              <Text>Days</Text>
              <Button
                isLoading={loading}
                loadingText="Extending..."
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

export default observer(ExtendDays);
