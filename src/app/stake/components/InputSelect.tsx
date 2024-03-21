import { ChangeEvent, useState,  ReactElement, useEffect } from 'react'
import { Img, Select, Input, Flex, Box, Text } from '@chakra-ui/react'
import { TabType, PairSelectList } from '../types'
import { LocalTokenSymbol } from '@/types/index.d'

interface IPros {
  coinSymbol: LocalTokenSymbol
  currentTabType: TabType,
  onChangeInput: (value: string) => void,
  onChangeSelect: (value: LocalTokenSymbol) => void,
  inputValue: string
  currList: Array<Array<LocalTokenSymbol>>
}

const InputSelect =(props: IPros) => {
  const [currSelect, setCurrSelect] = useState<LocalTokenSymbol>(LocalTokenSymbol.ETH)
  const { inputValue, currentTabType, onChangeInput, currList = [], onChangeSelect } = props
  const onSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as LocalTokenSymbol
    
    setCurrSelect(value)
    onChangeSelect(value)
  }

  useEffect(() => {
      setCurrSelect(props.coinSymbol)
  }, [props.coinSymbol])

  return (
    <Flex>
      <Input 
        width="280px" 
        boxShadow="0 0 0 1px #3182ce" 
        borderColor="#3182ce" 
        placeholder={`${currSelect} Amount`}
        marginRight="22px"
        border="none"
        value={inputValue} 
        onChange={(e) => onChangeInput(e.target.value)}   
      />

      <Flex flex="1" alignItems="center" justifyContent="center" backgroundColor="rgb(52 30 56 / 50%)" borderRadius="18px">
        <Select value={currSelect} onChange={onSelect} w={100} icon={<Img height="18px" src="eth.png" />}>
          {
            currList.map((item, index) => (
              <option value={item[0]} key={item[0]}>
                {item[0]}
              </option>
            ))
          }
        </Select>
      </Flex>
    </Flex>
  )
}

export default InputSelect