"use client"
import Link from 'next/link'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Icon, Text, useColorMode, useColorModeValue, Heading ,Container, Button, Center } from '@chakra-ui/react'

export default function Stack () {
  return(
    <Container className="stack" color="#fff">
      <Box border="1px solid #666" borderRadius="12px">
        <Tabs isFitted>
          <TabList>
            <Tab>Mint</Tab>
            <Tab>Stack</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      
    </Container>
  ) 
}