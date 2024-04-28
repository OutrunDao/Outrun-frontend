import { ChangeEvent, useState, ReactElement, useEffect } from 'react';
import { Img, Select, Input, Flex, Box, Text } from '@chakra-ui/react';
import { TabType } from '../types';
import { LocalTokenSymbol } from '@/types/index.d';
import { observer } from 'mobx-react-lite';
import store from '@/app/stake/StakeStore';

interface IPros {
  currentTabType: TabType;
  currList: Array<LocalTokenSymbol>;
}

const InputSelect = (props: IPros) => {
  const { currList = [] } = props;
  const onSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as LocalTokenSymbol;
    store.selectedToken = value;
  };

  return (
    <Flex>
      <Input
        color="#fff"
        width="280px"
        border="none"
        marginRight="22px"
        borderColor="#3182ce"
        value={store.inputValue}
        max={Number(store.balance)}
        boxShadow="0 0 0 1px #3182ce"
        placeholder={`${store.selectedToken} Amount`}
        onChange={(e) => (store.inputValue = Number(e.target.value))}
      />

      <Flex
        flex="1"
        alignItems="center"
        justifyContent="center"
        backgroundColor="rgb(52 30 56 / 50%)"
        borderRadius="18px"
      >
        <Select
          value={store.selectedToken}
          onChange={onSelect}
          w={100}
          icon={<Img height="18px" src="eth.png" />}
        >
          {currList.map((item, index) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </Select>
      </Flex>
    </Flex>
  );
};

export default observer(InputSelect);
