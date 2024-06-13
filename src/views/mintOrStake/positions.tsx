import { Box, Button, Card, CardBody, CardFooter, CardHeader, Container, HStack, SimpleGrid, Spacer, Text } from '@chakra-ui/react';
import ExtendDaysModal from './extendDaysModal';

export default function PositionsView() {
  return (
    <Container p={0}>
      <Card m={0} colorScheme={'red'}>
        <CardHeader>orETH / osETH</CardHeader>
        <CardBody color={'gray'} fontSize={14}>
          <SimpleGrid columns={2} spacing={2}>
            <Box>
              <Text color="#fff">Position </Text>
              <Text>1000 orETH / 900 osETH</Text>
            </Box>
            <Box>
              <Text color="#fff">APY</Text>
              <Text>230%</Text>
            </Box>
            <Box>
              <Text color="#fff">Rewards</Text>
              <Text>230 REY</Text>
            </Box>
            <Box>
              <Text color="#fff">EndDate </Text>
              <Text>2024/12/13 8:00</Text>
            </Box>
          </SimpleGrid>
        </CardBody>
        <CardFooter alignSelf={'end'}>
          <HStack>
            <ExtendDaysModal></ExtendDaysModal>
            <Button size={'xs'} rounded={4} colorScheme={'blue'}>
              unlock
            </Button>
          </HStack>
        </CardFooter>
      </Card>
    </Container>
  );
}
