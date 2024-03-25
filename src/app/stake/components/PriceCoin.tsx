import { Flex, Box, Text } from '@chakra-ui/react'
import { ReactElement, useEffect, useState } from 'react'
import { LocalTokenSymbol } from '@/types/index.d'

interface IProps {
  selectedTokenPair: LocalTokenSymbol
}

const PriceCoin = (props: IProps): ReactElement => {
  const { selectedTokenPair } = props
  const [price, setPrice] = useState<string>(0)

  const getPrice = (selectedTokenPair) => {
    return 0;
  }

  useEffect(() => {
    getPrice(selectedTokenPair)
  }, [selectedTokenPair])

  return (
    <Box>
      <Flex justifyContent="space-between" padding="22px" paddingTop="0" alignItems="center">
        <Text color="rgb(252 252 3 / 50%)">Price: { price }</Text>
        <Text backgroundColor="#1E1E38" borderRadius="12px" padding="6px 22px">
          { selectedTokenPair }
        </Text>
      </Flex>
    </Box>
  )
}

export default PriceCoin