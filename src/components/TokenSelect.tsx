'use client';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Heading, VStack, Input, Image, Box } from '@chakra-ui/react';
import { ChevronDownIcon, QuestionIcon } from '@chakra-ui/icons';
import { useEffect, useMemo, useState } from 'react';
import { Currency, Ether, Token } from '@/packages/swap-core';
import { isAddress } from 'viem';
import { fetchTokenByAddress } from '@/utils/erc20';
import { useChainId, usePublicClient } from 'wagmi';
import { currencySelectList, CurrencySelectListType } from '@/contracts/currencys';

export default function TokenSelect({
  onSelect,
  isDisabled,
  token,
  tokenList,
  tokenDisable,
  hiddenSearchInput,
}: {
  onSelect: (token: Currency) => void;
  token?: Currency;
  isDisabled?: boolean;
  tokenList?: CurrencySelectListType;
  tokenDisable?: Currency;
  hiddenSearchInput?: boolean;
}) {
  const chainId = useChainId();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchValue, setSearchValue] = useState('');
  const [list, setList] = useState<(Ether | Token)[]>();
  const publicClient = usePublicClient();
  const tokenListOnChain = useMemo(() => {
    return (tokenList || currencySelectList).map((i) => (i === Ether ? Ether.onChain(chainId) : (i as { [chainId: number]: Token })[chainId]));
  }, [chainId]);
  useEffect(() => {
    setList(tokenListOnChain);
  }, [tokenListOnChain]);
  function handleSelect(token: Currency) {
    onSelect(token);
    onClose();
  }

  async function onSearchHandler(value: string) {
    setSearchValue(value);
    value = value.trim().toLocaleLowerCase();
    if (!value) return setList(tokenListOnChain);
    if (isAddress(value)) {
      const { name, symbol, decimals } = await fetchTokenByAddress(value, publicClient!);
      const newToken = new Token(chainId, value, decimals, symbol, name);
      setList([newToken]);
    } else {
      setList(list!.filter((i) => i.symbol && ~i.symbol.toLocaleLowerCase().indexOf(value)));
    }
  }

  return (
    <>
      <Button
        variant="ghost"
        colorScheme="custom"
        onClick={onOpen}
        size="sm"
        bg={'transparent'}
        color={'#fff'}
        opacity={'1 !important'}
        isDisabled={isDisabled}
        px={'10px'}
        // tokenInfo && tokenInfo.logoURI ? <Image src={tokenInfo.logoURI} width={'15px'} height={'15px'} alt={tokenInfo.symbol} style={{ marginLeft: '6px' }}></Image>
        leftIcon={<QuestionIcon></QuestionIcon>}
        rightIcon={<ChevronDownIcon />}
      >
        {token ? token.symbol : 'Select Token'}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mt={40} bgColor={'#0d0703'} borderColor={'#515151'} borderWidth={'1px'} color="#fff" pb={10}>
          <ModalHeader>Select Token</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!hiddenSearchInput ? <Input variant="outline" color={'#fff'} value={searchValue} placeholder="Search Name or paste address" size="md" onChange={(e) => onSearchHandler(e.target.value)} /> : null}
            {/* <Heading as="h5" size="md" mt={6}>
              Token List
            </Heading> */}
            <Box height={300} overflow={'scroll'} style={{ scrollbarWidth: 'none' }}>
              <VStack spacing={2} mt={4}>
                {list &&
                  list.length &&
                  list.map((token) => {
                    return (
                      <Button
                        colorScheme="teal"
                        justifyContent={'left'}
                        variant="ghost"
                        w={'100%'}
                        isDisabled={tokenDisable?.equals(token)}
                        leftIcon={<QuestionIcon></QuestionIcon>}
                        key={token.isNative ? 'eth' : token.address}
                        onClick={() => handleSelect(token)}
                      >
                        {token.symbol}
                      </Button>
                    );
                  })}
              </VStack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
