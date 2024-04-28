'use client';

import { retry } from 'radash';
import {
  TransactionReceipt,
  Address,
  PublicClient,
  formatUnits,
  WalletClient,
  getAddress,
  getContract,
} from 'viem';
import { useAccount } from 'wagmi';
import { LocalTokenSymbol } from '@/types/index.d';
import { LocalTokenAddress } from '@/contants/address';
import { useState } from 'react';
import Decimal from 'decimal.js-light';
import RUSDAbi from '@/ABI/RUSD.json';
import RETHAbi from '@/ABI/RETH.json';

const AllowanceAbi = [
  {
    type: 'function',
    name: 'allowance',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'spender',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
];

export const getAllowance = async (
  tokenAddress: Address,
  owner: Address,
  spender: Address,
  publicClient: PublicClient
): Promise<bigint> => {
  const erc20 = getContract({
    abi: [
      {
        type: 'function',
        name: 'allowance',
        inputs: [
          { name: 'owner', type: 'address', internalType: 'address' },
          { name: 'spender', type: 'address', internalType: 'address' },
        ],
        outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'view',
      },
    ],
    address: tokenAddress,
    client: publicClient,
  });
  const result = (await erc20.read.allowance([owner, spender])) as bigint;
  return result;
};

export const getUsdbContract = (walletClient: WalletClient) => {
  return getContract({
    abi: RUSDAbi,
    address: LocalTokenAddress.USDB,
    client: {
      wallet: walletClient,
    },
  });
};

export const getRETHContract = (walletClient: WalletClient) => {
  return getContract({
    abi: RETHAbi,
    address: LocalTokenAddress.RETH,
    client: {
      wallet: walletClient,
    },
  });
};

export const getTxStatus = (publicClient: PublicClient, hash: Address): Promise<TransactionReceipt> => {
  return retry(
    {
      times: 20,
      delay: 5000,
    },
    async () => {
      return publicClient!.getTransactionReceipt({
        hash,
      });
    }
  );
};

export const ApproveABI = [
  {
    type: 'function',
    name: 'approve',
    inputs: [
      {
        name: 'spender',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'value',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
  },
];

export const RedeemABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export const StakeABI = [
  {
    type: 'function',
    name: 'stake',
    inputs: [
      {
        name: 'amountInRETH',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'lockupDays',
        type: 'uint16',
        internalType: 'uint16',
      },
      {
        name: 'positionOwner',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'pethTo',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'reyTo',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: 'amountInPETH',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'amountInREY',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
  },
];
