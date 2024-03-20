import { Img, Tabs,Tag, Flex, Input, TabList, TabPanels, Tab, TabPanel, Box, Icon, Text, useColorMode, useColorModeValue, Heading ,Container, Button, Center } from '@chakra-ui/react'
import { ReactElement, useEffect, useState } from 'react'

interface IProps {
  coinSymbol: string
}

const PriceCoin = (props: IProps): ReactElement => {
  const { coinSymbol } = props
  const [price, setPrice] = useState<string>(0)

  const getPrice = (coinSymbol) => {
    return 0;
  }

  useEffect(() => {
    getPrice(coinSymbol)
  }, [coinSymbol])

  return (
    <Box>
      <Flex justifyContent="space-between" padding="22px" paddingTop="0" alignItems="center">
        <Text color="rgb(252 252 3 / 50%)">Price: { price }</Text>
        <Text backgroundColor="#1E1E38" borderRadius="12px" padding="6px 22px">
          { coinSymbol }
        </Text>
      </Flex>
    </Box>
  )
}

export default PriceCoin