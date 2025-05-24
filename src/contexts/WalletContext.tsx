"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
} from "react";
import { ethers } from "ethers";
import {
  WalletContextType,
  WalletState,
  DAI_CONTRACTS,
  NETWORK_NAMES,
} from "@/types/wallet";

// ERC-20 ABI for token balance
const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
];

// Initial state
const initialState: WalletState = {
  isConnected: false,
  address: null,
  network: null,
  chainId: null,
  ethBalance: null,
  daiBalance: null,
  ensName: null,
  isLoading: false,
  error: null,
};

// Actions
type WalletAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | {
      type: "SET_WALLET_INFO";
      payload: { address: string; chainId: number; network: string };
    }
  | { type: "SET_ETH_BALANCE"; payload: string }
  | { type: "SET_DAI_BALANCE"; payload: string }
  | { type: "SET_ENS_NAME"; payload: string | null }
  | { type: "DISCONNECT_WALLET" };

// Reducer
function walletReducer(state: WalletState, action: WalletAction): WalletState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, isLoading: false };
    case "SET_WALLET_INFO":
      return {
        ...state,
        isConnected: true,
        address: action.payload.address,
        chainId: action.payload.chainId,
        network: action.payload.network,
        error: null,
        isLoading: false,
      };
    case "SET_ETH_BALANCE":
      return { ...state, ethBalance: action.payload };
    case "SET_DAI_BALANCE":
      return { ...state, daiBalance: action.payload };
    case "SET_ENS_NAME":
      return { ...state, ensName: action.payload };
    case "DISCONNECT_WALLET":
      return { ...initialState };
    default:
      return state;
  }
}

// Context
const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Provider component
export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(walletReducer, initialState);

  // Fetch ETH and DAI balances
  const fetchBalances = useCallback(
    async (
      provider: ethers.BrowserProvider,
      address: string,
      chainId: number
    ) => {
      try {
        console.log("Fetching ETH balance for:", address);
        // Fetch ETH balance
        const ethBalance = await provider.getBalance(address);
        const ethFormatted = ethers.formatEther(ethBalance);
        console.log("ETH balance:", ethFormatted);
        dispatch({
          type: "SET_ETH_BALANCE",
          payload: parseFloat(ethFormatted).toFixed(4),
        });

        // Fetch DAI balance if contract exists for this network
        const daiContract = DAI_CONTRACTS[chainId];
        if (daiContract) {
          console.log(
            "Fetching DAI balance from contract:",
            daiContract.address
          );
          const contract = new ethers.Contract(
            daiContract.address,
            ERC20_ABI,
            provider
          );
          const daiBalance = await contract.balanceOf(address);
          const daiFormatted = ethers.formatUnits(
            daiBalance,
            daiContract.decimals
          );
          console.log("DAI balance:", daiFormatted);
          dispatch({
            type: "SET_DAI_BALANCE",
            payload: parseFloat(daiFormatted).toFixed(2),
          });
        } else {
          console.log("No DAI contract for chain:", chainId);
          dispatch({ type: "SET_DAI_BALANCE", payload: "0.00" });
        }
      } catch (error) {
        console.error("Error fetching balances:", error);
      }
    },
    []
  );

  // Fetch ENS name
  const fetchENSName = useCallback(
    async (provider: ethers.BrowserProvider, address: string) => {
      try {
        const network = await provider.getNetwork();
        // ENS is only available on mainnet
        if (Number(network.chainId) === 1) {
          const ensName = await provider.lookupAddress(address);
          dispatch({ type: "SET_ENS_NAME", payload: ensName });
        }
      } catch (error) {
        console.error("Error fetching ENS name:", error);
      }
    },
    []
  );

  // Connect to MetaMask
  const connectWallet = useCallback(async () => {
    try {
      console.log("Starting wallet connection...");
      dispatch({ type: "SET_LOADING", payload: true });

      if (!window.ethereum) {
        console.log("MetaMask not found");
        throw new Error("MetaMask is not installed");
      }

      console.log("MetaMask detected, requesting permissions...");

      // Try to request permissions to force account selection (MetaMask specific)
      try {
        if (window.ethereum.request) {
          await window.ethereum.request({
            method: "wallet_requestPermissions",
            params: [{ eth_accounts: {} }],
          });
          console.log("Permissions granted via wallet_requestPermissions");
        }
      } catch {
        console.log(
          "wallet_requestPermissions not supported, using fallback"
        );
        // Fallback: This is normal for non-MetaMask wallets
        // We'll still get account selection if the user hasn't connected before
      }

      console.log("Getting accounts...");
      const provider = new ethers.BrowserProvider(
        window.ethereum as ethers.Eip1193Provider
      );
      const accounts = await provider.send("eth_requestAccounts", []);
      console.log("Accounts received:", accounts);

      if (accounts.length === 0) {
        console.log("No accounts found");
        throw new Error("No accounts found");
      }

      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const network = await provider.getNetwork();
      const chainId = Number(network.chainId);
      const networkName = NETWORK_NAMES[chainId] || `Chain ${chainId}`;

      console.log("Wallet connected:", { address, chainId, networkName });

      dispatch({
        type: "SET_WALLET_INFO",
        payload: { address, chainId, network: networkName },
      });

      // Fetch balances and ENS
      console.log("Fetching balances...");
      await fetchBalances(provider, address, chainId);
      await fetchENSName(provider, address);
      console.log("Wallet connection complete!");
    } catch (error) {
      console.error("Wallet connection failed:", error);
      dispatch({
        type: "SET_ERROR",
        payload:
          error instanceof Error ? error.message : "Failed to connect wallet",
      });
    }
  }, [fetchBalances, fetchENSName]);

  // Disconnect wallet
  const disconnectWallet = useCallback(() => {
    dispatch({ type: "DISCONNECT_WALLET" });
  }, []);

  // Refresh balances
  const refreshBalances = useCallback(async () => {
    if (!state.address || !state.chainId) return;

    try {
      const provider = new ethers.BrowserProvider(
        window.ethereum as ethers.Eip1193Provider
      );
      await fetchBalances(provider, state.address, state.chainId);
    } catch (error) {
      console.error("Error refreshing balances:", error);
    }
  }, [state.address, state.chainId, fetchBalances]);

  // Listen for account and network changes
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else if (state.isConnected) {
        // Reconnect with new account
        connectWallet();
      }
    };

    const handleChainChanged = () => {
      if (state.isConnected) {
        // Reconnect to update network info
        connectWallet();
      }
    };

    if (window.ethereum.on) {
      window.ethereum.on(
        "accountsChanged",
        handleAccountsChanged as (...args: unknown[]) => void
      );
      window.ethereum.on(
        "chainChanged",
        handleChainChanged as (...args: unknown[]) => void
      );
    }

    return () => {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged as (...args: unknown[]) => void
        );
        window.ethereum.removeListener(
          "chainChanged",
          handleChainChanged as (...args: unknown[]) => void
        );
      }
    };
  }, [state.isConnected, connectWallet, disconnectWallet]);

  const contextValue: WalletContextType = {
    ...state,
    connectWallet,
    disconnectWallet,
    refreshBalances,
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
}

// Hook to use wallet context
export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
