import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage } from "wagmi";
import { blastSepolia } from "wagmi/chains";

// Get projectId at https://cloud.walletconnect.com
export const projectId = "72a15f70b924100a3ba6cf792a54462c"; //process.env.NEXT_PUBLIC_PROJECT_ID

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "Outrun App",
  description: "Outrun app",
  url: "https://outrun-frontend.vercel.app", // origin must match your domain & subdomain
  icons: ["https://raw.githubusercontent.com/OutrunDao/Outrun-frontend/master/src/app/favicon.ico"],
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
