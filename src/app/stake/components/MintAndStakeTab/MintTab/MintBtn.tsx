import { LocalTokenAddress } from '@/contants/address';
import { Button, Flex, useToast } from '@chakra-ui/react';
import { LocalTokenSymbol } from '@/types/index.d';
import { observer } from 'mobx-react-lite';
import { parseEther, formatUnits, Address } from 'viem';
import { useAccount, useWriteContract, useWalletClient, usePublicClient } from 'wagmi';
import store from '@/app/stake/StakeStore';
import { getUsdbContract } from './getContract';
import { getAllowance } from '@/app/stake/utils';
import { useEffect, useState } from 'react';
import { all, map, retry, set } from 'radash';

const ethABI = [
  {
    inputs: [],
    name: 'deposit',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
];

const usdbABI = [
  {
    type: 'function',
    name: 'deposit',
    inputs: [
      {
        name: 'amount',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
];

const MintBtn = () => {
  const { writeContract } = useWriteContract();
  const [allowance, setAllowance] = useState<bigint>(0n);
  const account = useAccount().address;
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const toast = useToast();
  const isETH = store.selectedToken === LocalTokenSymbol.ETH;
  const mintToken = isETH ? LocalTokenSymbol.RETH : LocalTokenSymbol.RUSD;
  const address = LocalTokenAddress[mintToken];
  const [isApproving, setIsApproving] = useState<boolean>(false);

  getAllowance(address, account!, LocalTokenAddress.RUSD, publicClient!).then((res) => {
    console.log('allowance', res);
    setAllowance(res);
  });

  const onHandleMint = async () => {
    const writeContractParams = {
      abi: isETH ? ethABI : usdbABI,
      address,
      account,
      functionName: 'deposit',
      value: isETH ? parseEther(store.inputValue) : undefined,
      args: isETH ? [] : [parseEther(store.inputValue)],
    };

    if (isETH) {
      if (Number(store.inputValue) > Number(store.balance)) {
        return toast({
          title: 'Insufficient balance',
          status: 'error',
        });
      }

      writeContract(writeContractParams, {
        onError: (error) => {
          console.error('writeContract error', error);
        },
        onSuccess: (data) => {
          console.log('writeContract success', data);
        },
        onSettled: () => {
          store.isLoadingBtn = false;
        },
      });
    } else {
      delete writeContractParams.value;
      setIsApproving(true);

      try {
        const approveTx = await getUsdbContract(walletClient!).write['approve']([
          address,
          parseEther(store.inputValue),
        ]);
        const result = await retry(
          {
            times: 20,
            delay: 5000,
          },
          async () => {
            return await publicClient!.getTransactionReceipt({
              hash: approveTx,
            });
          }
        );

        console.log('result.status', result.status);

        setIsApproving(false);

        if (result.status === 'success') {
          store.isLoadingBtn = true;

          writeContract(writeContractParams, {
            onError: (error) => {
              console.error('writeContract error', error);
            },
            onSuccess: (data) => {
              console.log('writeContract success', data);
            },
            onSettled: () => {
              store.isLoadingBtn = false;
            },
          });
        } else {
        }
      } catch (error) {
        setIsApproving(false);
      }
    }
  };

  if (isApproving) {
    return (
      <Flex justify="center">
        <Button
          isDisabled
          isLoading
          loadingText="Approving..."
          style={{
            width: '100%',
            marginTop: '24px',
          }}
        ></Button>
      </Flex>
    );
  }

  if (Number(store.balance) <= 0 || Number(store.inputValue) > Number(store.balance)) {
    return (
      <Flex justify="center">
        <Button
          isDisabled
          style={{
            width: '100%',
            marginTop: '24px',
          }}
        >
          Insufficient Balance
        </Button>
      </Flex>
    );
  }

  if (store.isLoadingBtn) {
    return <Button style={store.BtnStyle} onClick={onHandleMint} isLoading loadingText="Minting..."></Button>;
  }

  return (
    <Button style={store.BtnStyle} onClick={onHandleMint}>
      Mint
    </Button>
  );
};

export default observer(MintBtn);
