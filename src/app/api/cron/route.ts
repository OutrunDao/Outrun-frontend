import { createPublicClient, http } from 'viem'
import { blastSepolia } from 'viem/chains'

const publicClient = createPublicClient({
  chain: blastSepolia,
  transport: http(),
})
export async function GET(request: Request) {

  await publicClient.readContract({
    abi: [
      {
        "type": "function",
        "name": "accumETHYield",
        "inputs": [],
        "outputs": [
          { "name": "nativeYield", "type": "uint256", "internalType": "uint256" },
          { "name": "dayRate", "type": "uint256", "internalType": "uint256" }
        ],
        "stateMutability": "nonpayable"
      },
    ],
    address: '0x99766FEb8EA7F357bDBa860998D1Fb44d7fb89eA',
    functionName: 'accumETHYield',
    account: '0x7d3e21614dd6e074124592d3301af82dcdbb1988'
  })

  await publicClient.readContract({
    abi: [
      {
        "type": "function",
        "name": "accumUSDBYield",
        "inputs": [],
        "outputs": [
          { "name": "realYield", "type": "uint256", "internalType": "uint256" },
          { "name": "dayRate", "type": "uint256", "internalType": "uint256" }
        ],
        "stateMutability": "nonpayable"
      }
    ],
    address: '0x6D78F8523Be0d36DDB874B4db5570c7E034F250A',
    functionName: 'accumUSDBYield',
    account: '0x7d3e21614dd6e074124592d3301af82dcdbb1988'
  })


  console.log('cron done');

  return new Response(`ok`);
}