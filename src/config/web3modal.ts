import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage } from "wagmi";
import { blastSepolia, mainnet, sepolia } from "wagmi/chains";

// Get projectId at https://cloud.walletconnect.com
export const projectId = "0d7b7c5359cf854f93dcb41e584ff02a"; //process.env.NEXT_PUBLIC_PROJECT_ID

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "Outrun App",
  description: "Outrun app",
  url: "", // origin must match your domain & subdomain
  icons: [],
};

// Create wagmiConfig
export const config = defaultWagmiConfig({
  chains: [blastSepolia], // required
  projectId, // required
  metadata, // required
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  enableWalletConnect: true, // Optional - true by default
  enableInjected: true, // Optional - true by default
  enableEIP6963: true, // Optional - true by default
  enableCoinbase: true, // Optional - true by default
});
