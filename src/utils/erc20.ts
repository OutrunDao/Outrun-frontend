import { Address, PublicClient, getContract } from "viem";

function getTokenContract(address: Address, publicClient: PublicClient) {
  return getContract({
    abi: [
      {
        type: 'function',
        name: 'decimals',
        inputs: [],
        outputs: [{ name: '', type: 'uint8', internalType: 'uint8' }],
        stateMutability: 'view',
      },
      {
        type: 'function',
        name: 'name',
        inputs: [],
        outputs: [{ name: '', type: 'string', internalType: 'string' }],
        stateMutability: 'view',
      },
      {
        type: 'function',
        name: 'symbol',
        inputs: [],
        outputs: [{ name: '', type: 'string', internalType: 'string' }],
        stateMutability: 'view',
      },
    ],
    address,
    client: publicClient,
  });
}

export async function fetchTokenByAddress(address: Address, publicClient: PublicClient) {
  const erc20 = getTokenContract(address, publicClient)
  const symbol = (await erc20.read.symbol()) || 'unknown'
  const name = (await erc20.read.name()) || 'unknown'
  const decimals = await erc20.read.decimals()
  return {
    symbol, name, decimals
  }
}