import { Flex, Box, Text } from '@chakra-ui/react';
import { ReactElement, useEffect, useState } from 'react';
import { LocalTokenSymbol } from '@/types/index.d';
import store from '@/app/stake/StakeStore';
import { observer } from 'mobx-react-lite';
import { TabType } from '../types';

interface IProps {
  selectedTokenPair: LocalTokenSymbol;
}

const PriceCoin = (props: IProps): ReactElement => {
  const { selectedTokenPair } = props;
  const [price, setPrice] = useState<string>('0');

  const getPrice = (selectedTokenPair: LocalTokenSymbol) => {
    console.log('selectedTokenPair', selectedTokenPair);
    return 0;
  };

  useEffect(() => {
    getPrice(selectedTokenPair);
  }, [selectedTokenPair]);

  const renderEarnings = () => {
    console.log('renderEarnings');

    if (store.currentTabType === TabType.Mint) return <span></span>;
    const earnToken =
      store.selectedToken === LocalTokenSymbol.RETH ? LocalTokenSymbol.REY : LocalTokenSymbol.RUY;
    const earnCount = Number(store.inputValue) * store.stakeDays;

    return (
      <Flex color="rgb(252 252 3 / 50%)" alignItems="center">
        <Text color="#fff">Will Earn {earnToken}:</Text>
        <Text fontWeight="bold" marginLeft={6}>
          {earnCount}
        </Text>
      </Flex>
    );
  };

  return (
    <Box>
      <Flex
        justifyContent="space-between"
        padding="22px"
        paddingRight="22px"
        paddingTop="0"
        alignItems="center"
      >
        {renderEarnings()}
        <Flex
          height="40px"
          width="100px"
          alignItems="center"
          backgroundColor="#1E1E38"
          borderRadius="6px"
          padding="6px 22px"
          marginTop="12px"
        >
          {selectedTokenPair} <Text visibility={'hidden'} marginRight="8px"></Text>({store.inputValue})
        </Flex>
      </Flex>
    </Box>
  );
};

export default observer(PriceCoin);
