import { useReadContract, useAccount, useBalance } from 'wagmi';
import { Tabs, Flex, TabList, Tab, Box, Text, Container } from '@chakra-ui/react';
import store from '@/app/stake/StakeStore';
import { formatEther } from 'viem';
import { LocalTokenAddress, ContractAddressMap } from '@/contants/address';
import { LocalTokenSymbol } from '@/types/index.d';
import { observer } from 'mobx-react-lite';
import { tabList, TabType, TokenPairMap } from '../../types';

const BalanceABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

type CurrTokenPair = (typeof TokenPairMap)[TabType];

interface IProps {
  currTokenPairMap: CurrTokenPair;
}

const TokenBalance = ({ token }: { token: LocalTokenSymbol }) => {
  const account = useAccount().address || 0n;
  const { data = 0n }: { data: bigint | undefined } = useReadContract({
    address: LocalTokenAddress[token],
    abi: BalanceABI,
    functionName: 'balanceOf',
    args: [account],
  });

  return <Text>{formatEther(data)}</Text>;
};

const EarnTokenInfo = (props: IProps) => {
  const { currTokenPairMap } = props;

  const renderEarnToken = () => {
    console.log('renderEarnings');

    if (store.currentTabType === TabType.Mint) return '';
    const earnToken =
      store.selectedToken === LocalTokenSymbol.RETH ? LocalTokenSymbol.REY : LocalTokenSymbol.RUY;
    const earnCount = Number(store.inputValue) * store.stakeDays;

    return (
      <Box color="rgb(252 252 3 / 50%)" alignItems="center">
        <Flex alignItems="center" justifyContent="space-between">
          <Text color="rgb(170, 170, 191)">Balance(REY): </Text>
          <Text fontWeight="bold" marginLeft={6}>
            <TokenBalance token={LocalTokenSymbol.REY}></TokenBalance>
          </Text>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between" marginTop="12px">
          <Text color="rgb(170, 170, 191)">Balance(RUY): </Text>
          <Text fontWeight="bold" marginLeft={6}>
            <TokenBalance token={LocalTokenSymbol.RUY}></TokenBalance>
          </Text>
        </Flex>
      </Box>
    );
  };
  return (
    <Box marginTop="32px" padding="16px" backgroundColor="rgb(52 30 56 / 50%)" borderRadius="12px">
      {renderEarnToken()}
      {/* <Flex justifyContent="space-between" marginTop="12px">
        <Text color="rgb(170, 170, 191)">RETH APR</Text>
        <Text color="rgb(170, 170, 191)">12.7%</Text>
      </Flex>
      <Flex justifyContent="space-between" marginTop="12px">
        <Text color="rgb(170, 170, 191)">ETH-RETH APR</Text>
        <Text color="rgb(170, 170, 191)">10.7%</Text>
      </Flex> */}
      <Flex justifyContent="space-between" marginTop="12px">
        <Text color="rgb(170, 170, 191)">Exchange rate</Text>
        <Text color="rgb(170, 170, 191)">
          1 {store.selectedToken} = 1 {currTokenPairMap[store.selectedToken as keyof CurrTokenPair]}
        </Text>
      </Flex>
    </Box>
  );
};

export default observer(EarnTokenInfo);
