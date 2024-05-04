'use client';

import { LocalTokenAddress, ContractAddressMap } from '@/contants/address';
import { Button, Flex, useToast } from '@chakra-ui/react';
import { LocalTokenSymbol } from '@/types/index.d';
import { TabType, BtnHandleState, MintType, StakeType } from '@/app/stake/types';
import { observer } from 'mobx-react-lite';
import { parseEther, formatUnits, Address } from 'viem';
import { useAccount, useWriteContract, useWalletClient, usePublicClient } from 'wagmi';
import store from '@/app/stake/StakeStore';
import { getUsdbContract, getRETHContract } from '@/app/stake/utils';
import { getAllowance, getTxStatus, ApproveABI, RedeemABI, StakeABI } from '@/app/stake/utils';
import RUSDAbi from '@/ABI/RUSD.json';
import RETHAbi from '@/ABI/RETH.json';

const MintAndStakeButton = () => {
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const account = useAccount().address;
  const toast = useToast();
  const isETH = store.selectedToken.includes('ETH');
  const isUSDB = store.selectedToken.includes('USDB');

  const onMint = async () => {
    if (isETH) {
      store.isMinting = true;
      try {
        const val = parseEther(store.inputValue);
        const tx = await walletClient!.writeContract({
          address: LocalTokenAddress.RETH,
          abi: RETHAbi,
          account: account,
          functionName: 'deposit',
          value: val,
        });

        const result = await getTxStatus(publicClient!, tx);
        store.isMinting = false;
        if (result.status == 'success') {
          toast({
            title: 'Mint successful',
            status: 'success',
          });
        }
      } catch (error) {
        store.isMinting = false;
        toast({
          title: 'Mint Failed',
          status: 'error',
        });
      }
    }

    if (isUSDB) {
      const usdbAllowance = await getAllowance(
        LocalTokenAddress.USDB,
        account!,
        LocalTokenAddress.RUSD,
        publicClient!
      );

      if (usdbAllowance < Number(store.inputValue)) {
        store.isApproving = true;
        try {
          const approveTx = await getUsdbContract(walletClient!).write['approve']([
            LocalTokenAddress.RUSD,
            parseEther(store.inputValue),
          ]);

          const result = await getTxStatus(publicClient!, approveTx);
          store.isApproving = false;
          if (result.status === 'success') {
            toast({
              title: 'Approval Successful',
              status: 'success',
            });
          } else {
            return false;
          }
        } catch (error) {
          store.isApproving = false;
          toast({
            title: 'Approval failed',
            status: 'error',
          });
          return false;
        }
      }

      store.isMinting = true;

      try {
        const tx = await walletClient!.writeContract({
          address: LocalTokenAddress.RUSD,
          abi: RUSDAbi,
          account: account,
          functionName: 'deposit',
          args: [parseEther(store.inputValue)],
        });

        const result = await getTxStatus(publicClient!, tx);

        console.log('result', result);

        if (result.status === 'success') {
          toast({
            title: 'Mint Successful',
            status: 'success',
          });
        }

        if (result.status === 'reverted') {
          toast({
            title: 'Mint failed',
            status: 'error',
            description: 'Transcation reverted',
          });
        }
        store.isMinting = false;
      } catch (error) {
        store.isMinting = false;
        toast({
          title: 'Mint Failed',
          status: 'error',
        });
      }
    }
  };

  const onRedeem = async () => {
    const abi = isETH ? RETHAbi : RUSDAbi;
    const address = isETH ? LocalTokenAddress.RETH : LocalTokenAddress.RUSD;
    try {
      const tx = await walletClient!.writeContract({
        address,
        abi,
        account: account,
        functionName: 'withdraw',
        args: [parseEther(store.inputValue)],
      });
      const result = await getTxStatus(publicClient!, tx);
      if (result.status === 'success') {
        toast({
          title: 'Redeem successful',
          status: 'success',
          description: `You have redeemed ${store.inputValue} ${store.selectedToken}`,
        });
      }
      store.isRedeeming = false;
    } catch (error) {
      toast({
        title: 'Redeem failed',
        status: 'error',
      });
      store.isRedeeming = false;
      console.error('Redeem failed: ', error);
    }
  };

  const onStake = async () => {
    const currTokenAddress = LocalTokenAddress[store.selectedToken];

    let spender =
      store.selectedToken === LocalTokenSymbol.RETH
        ? ContractAddressMap.RETHStakeManager
        : ContractAddressMap.RUSDStakeManager;

    const allowance = await getAllowance(currTokenAddress, account!, spender, publicClient!);
    console.log('allowance', allowance);

    if (allowance < Number(store.inputValue)) {
      store.isApproving = true;
      try {
        const approveTx = await walletClient!.writeContract({
          address: currTokenAddress,
          abi: ApproveABI,
          account,
          functionName: 'approve',
          args: [spender, parseEther(store.inputValue)],
        });

        const result = await getTxStatus(publicClient!, approveTx);
        store.isApproving = false;
        if (result.status === 'success') {
          toast({
            title: 'Approval Successful',
            status: 'success',
          });
        } else {
          return false;
        }
      } catch (error) {
        console.error('error', error);
        store.isApproving = false;
        toast({
          title: 'Approval failed',
          status: 'error',
        });
        return false;
      }
    }

    try {
      store.isStaking = true;

      const stakeTx = await walletClient!.writeContract({
        address: spender,
        abi: StakeABI,
        account: account,
        functionName: 'stake',
        args: [parseEther(store.inputValue), store.stakeDays || 30, account, account, account],
      });

      const result = await getTxStatus(publicClient!, stakeTx);

      if (result.status === 'success') {
        const mintCount = Number(store.inputValue) * store.stakeDays;
        const mintToken =
          store.selectedToken === LocalTokenSymbol.RETH ? LocalTokenSymbol.REY : LocalTokenSymbol.RUY;
        toast({
          title: `Stake Successful`,
          description: `${Number(store.inputValue)} ${
            store.selectedToken
          } staked and ${mintCount} ${mintToken} had been minted`,
          status: 'success',
        });
      }
      store.isStaking = false;
    } catch (error) {
      console.error('Stake error: ', error);
      toast({
        title: 'Stake Failed',
        status: 'error',
      });
      store.isStaking = false;
    }

    console.log('allowance', allowance);
  };

  const onHandle = () => {
    if (store.btnHandleState === MintType.Mint) {
      onMint();
    }
    if (store.btnHandleState === MintType.Redeem) {
      onRedeem();
    }

    if (store.btnHandleState === StakeType.Stake) {
      onStake();
    }
  };

  return (
    <Button
      isLoading={store.isBtnLoading}
      loadingText={store.loadingText}
      isDisabled={store.btnDisabled}
      style={store.btnStyle}
      onClick={onHandle}
    >
      {store.BtnText}
    </Button>
  );
};

export default observer(MintAndStakeButton);
