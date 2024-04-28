import { useAccount, useBalance } from 'wagmi';
import { formatEther } from 'viem';
import { Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import store from '@/app/stake/StakeStore';
import { useEffect } from 'react';

const ETHBalance = () => {
  const account = useAccount().address;
  const { data } = useBalance({ address: account });
  const balance = formatEther(data?.value || 0n).slice(0, 6) || '0';

  useEffect(() => {
    store.setBalance(balance);
  }, [balance]);

  return <Text>Balance: {balance}</Text>;
};

export default observer(ETHBalance);
