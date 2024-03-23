export const routerAbi = [
  {
    type: 'function',
    name: 'addLiquidity',
    inputs: [
      { name: 'tokenA', type: 'address', internalType: 'address' },
      { name: 'tokenB', type: 'address', internalType: 'address' },
      {
        name: 'amountADesired',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'amountBDesired',
        type: 'uint256',
        internalType: 'uint256',
      },
      { name: 'amountAMin', type: 'uint256', internalType: 'uint256' },
      { name: 'amountBMin', type: 'uint256', internalType: 'uint256' },
      { name: 'to', type: 'address', internalType: 'address' },
      { name: 'deadline', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [
      { name: 'amountA', type: 'uint256', internalType: 'uint256' },
      { name: 'amountB', type: 'uint256', internalType: 'uint256' },
      { name: 'liquidity', type: 'uint256', internalType: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'addLiquidityETH',
    inputs: [
      { name: 'token', type: 'address', internalType: 'address' },
      {
        name: 'amountTokenDesired',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'amountTokenMin',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'amountETHMin',
        type: 'uint256',
        internalType: 'uint256',
      },
      { name: 'to', type: 'address', internalType: 'address' },
      { name: 'deadline', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [
      { name: 'amountToken', type: 'uint256', internalType: 'uint256' },
      { name: 'amountETH', type: 'uint256', internalType: 'uint256' },
      { name: 'liquidity', type: 'uint256', internalType: 'uint256' },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'addLiquidityETHAndUSDB',
    inputs: [
      {
        name: 'amountUSDBDesired',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'amountETHMin',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'amountUSDBMin',
        type: 'uint256',
        internalType: 'uint256',
      },
      { name: 'to', type: 'address', internalType: 'address' },
      { name: 'deadline', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [
      { name: 'amountETH', type: 'uint256', internalType: 'uint256' },
      { name: 'amountUSDB', type: 'uint256', internalType: 'uint256' },
      { name: 'liquidity', type: 'uint256', internalType: 'uint256' },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'addLiquidityUSDB',
    inputs: [
      { name: 'token', type: 'address', internalType: 'address' },
      {
        name: 'amountTokenDesired',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'amountUSDBDesired',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'amountTokenMin',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'amountUSDBMin',
        type: 'uint256',
        internalType: 'uint256',
      },
      { name: 'to', type: 'address', internalType: 'address' },
      { name: 'deadline', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [
      { name: 'amountToken', type: 'uint256', internalType: 'uint256' },
      { name: 'amountUSDB', type: 'uint256', internalType: 'uint256' },
      { name: 'liquidity', type: 'uint256', internalType: 'uint256' },
    ],
    stateMutability: 'payable',
  },
];
