import { ChangeEvent, useState,  ReactElement, useEffect } from 'react'
import { Img, Select, Input, Flex, Box, Text } from '@chakra-ui/react'
import { TabType } from '../types'
import { LocalTokenSymbol } from '@/types/index.d'

interface IPros {
  selectedToken: LocalTokenSymbol
  currentTabType: TabType,
  onChangeInput: (value: string) => void,
  onChangeSelect: (value: LocalTokenSymbol) => void,
  inputValue: string
  currList: Array<LocalTokenSymbol>
}

const InputSelect =(props: IPros) => {
  const { inputValue, selectedToken, onChangeInput, currList = [], onChangeSelect } = props
  const onSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as LocalTokenSymbol
    onChangeSelect(value)
  }

  return (
    <Flex>
      <Input 
        width="280px" 
        boxShadow="0 0 0 1px #3182ce" 
        borderColor="#3182ce" 
        placeholder={`${selectedToken} Amount`}
        marginRight="22px"
        border="none"
        value={inputValue} 
        onChange={(e) => onChangeInput(e.target.value)}   
      />

      <Flex flex="1" alignItems="center" justifyContent="center" backgroundColor="rgb(52 30 56 / 50%)" borderRadius="18px">
        <Select value={selectedToken} onChange={onSelect} w={100} icon={<Img height="18px" src="eth.png" />}>
          {
            currList.map((item, index) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))
          }
        </Select>
      </Flex>
    </Flex>
  )
}

export default InputSelect