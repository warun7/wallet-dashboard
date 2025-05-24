export interface WalletState {
  isConnected: boolean;
  address: string | null;
  network: string | null;
  chainId: number | null;
  ethBalance: string | null;
  daiBalance: string | null;
  ensName: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface WalletContextType extends WalletState {
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  refreshBalances: () => Promise<void>;
}

export interface TokenContract {
  address: string;
  symbol: string;
  decimals: number;
}

export const DAI_CONTRACTS: Record<number, TokenContract> = {
  1: {
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    symbol: "DAI",
    decimals: 18,
  },
  // Goerli testnet
  5: {
    address: "0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844",
    symbol: "DAI",
    decimals: 18,
  },
  // Sepolia testnet
  11155111: {
    address: "0x7AF17A48a6336F7dc1beF9D485139f7B6f4FB5C8",
    symbol: "DAI",
    decimals: 18,
  },
};

export const NETWORK_NAMES: Record<number, string> = {
  1: "Ethereum Mainnet",
  5: "Goerli Testnet",
  11155111: "Sepolia Testnet",
  137: "Polygon Mainnet",
  80001: "Mumbai Testnet",
};
