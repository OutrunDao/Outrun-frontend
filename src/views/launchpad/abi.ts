export const abi = [
  {
    "type": "function",
    "name": "deposit",
    "inputs": [],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "poolId", "type": "uint256" }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "claimTokenOrFund"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "poolId", "type": "uint256" }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "enablePoolTokenTransfer"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "poolId", "type": "uint256" }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "claimPoolLP"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "poolId", "type": "uint256" },
      { "internalType": "address", "name": "account", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function",
    "name": "isPoolLPClaimed",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }]
  },
] 