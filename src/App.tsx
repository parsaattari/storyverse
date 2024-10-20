import { useState, PropsWithChildren, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import Auth from './components/auth';
import License from './components/license';
import {
  createConfig,
  WagmiProvider,
  useAccount
} from 'wagmi';
import { mainnet } from 'viem/chains';

import { createWalletClient, type Chain, http } from "viem";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector';
import { StoryProvider } from "@story-protocol/react-sdk";
import { useWalletClient } from "wagmi";
import LandingPage from './LandingPage';

export const iliad = {
  id: 1513, // Your custom chain ID
  name: "Story Network Testnet",
  nativeCurrency: {
    name: "Testnet IP",
    symbol: "IP",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://testnet.storyrpc.io"] },
  },
  blockExplorers: {
    default: { name: "Blockscout", url: "https://testnet.storyscan.xyz" },
  },
  testnet: true,
} as const satisfies Chain;


const queryClient = new QueryClient();

// add any extra networks here
const evmNetworks = [
  {
    blockExplorerUrls: ["https://testnet.storyscan.xyz"],
    chainId: 1513,
    iconUrls: ["https://app.dynamic.xyz/assets/networks/sepolia.svg"],
    name: "Story Network Testnet",
    nativeCurrency: {
      decimals: 18,
      name: "Testnet IP",
      symbol: "IP",
    },
    networkId: 1513,
    rpcUrls: ["https://testnet.storyrpc.io"],
    vanityName: "Iliad",
  },
];


function App() {
  console.log("The app is running");
  const config = createConfig({
    chains: [mainnet],
    multiInjectedProviderDiscovery: false,
    transports: {
      [mainnet.id]: http(),
    }
  });
  
  return (
    <>
      <DynamicContextProvider
        settings={{
          environmentId: '267ae865-6671-4fe4-91e1-29af3b0c1224',
          walletConnectors: [ EthereumWalletConnectors ],
          overrides: { evmNetworks },
          networkValidationMode: "always",
      }}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>
            <StoryProviderWrapper>
              <Auth />
              <LandingPage initialValue="0" />
            </StoryProviderWrapper>
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
      </DynamicContextProvider>
    </>
  )
}

// Component to pass in the wallet from wagmi
function StoryProviderWrapper({ children }: PropsWithChildren) {
  const { data: wallet, isLoading: isWalletLoading } = useWalletClient();
  const [loadedWallet, setLoadedWallet] = useState<any>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Wait for the wallet to be resolved and prevent re-renders
    if (!isWalletLoading && isInitializing) {
      console.log("Wallet Account: ", wallet?.account);
      if (wallet?.account) {
        setLoadedWallet(wallet);
      } 

      setIsInitializing(false);
    }
  }, [wallet, isWalletLoading, isInitializing]);

  // Wait for the wallet initialization to complete before rendering StoryProvider
  if (isInitializing) {
    return <div>Loading...</div>;
  }
  console.log("loadedWallet: ", loadedWallet);
  return (
    <StoryProvider
      config={{
        chainId: 'iliad',
        transport: http(process.env.NEXT_PUBLIC_RPC_PROVIDER_URL),
        wallet: loadedWallet,
      }}
    >
      {children}
    </StoryProvider>
  );
}


export default App
