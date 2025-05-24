# Wallet Dashboard

A modern, animated React-based wallet dashboard for MetaMask integration with real-time balance tracking and beautiful glassmorphism UI.

## Features

### Core Features ✅

- **MetaMask Integration**: Connect to MetaMask wallet with one click
- **Wallet Information**: Display wallet address and current network
- **ETH Balance**: Real-time Ethereum balance display
- **React Hooks**: Built with modern React functional components and hooks
- **Dynamic Updates**: Automatically reacts to wallet and network changes

### Bonus Features ✅

- **DAI Token Balance**: Fetch and display DAI token balance using ERC-20 contract
- **ENS Support**: Show ENS names when available (on mainnet)
- **Dark/Light Mode**: Toggle between themes with system preference detection
- **Context Provider**: Global wallet state management using React Context
- **Multi-Network Support**: Works with Ethereum mainnet, Goerli, Sepolia, and more
- **Copy Address**: Click to copy wallet address to clipboard
- **Responsive Design**: Clean, minimal, and mobile-friendly UI

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Web3**: ethers.js v6
- **State Management**: React Context + useReducer
- **Theme**: Custom dark/light mode with localStorage persistence

## Getting Started

### Prerequisites

- Node.js 18+
- MetaMask browser extension
- Git

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd wallet-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Usage

1. **Connect Wallet**: Click the "Connect Wallet" button to connect your MetaMask
2. **View Information**: See your wallet address, network, and ENS name (if available)
3. **Check Balances**: View your ETH and DAI token balances
4. **Refresh**: Click refresh to update balances manually
5. **Theme Toggle**: Use the theme toggle in the header to switch between light/dark mode
6. **Copy Address**: Click the copy button next to your address to copy it to clipboard

## Supported Networks

- Ethereum Mainnet (Chain ID: 1)
- Goerli Testnet (Chain ID: 5)
- Sepolia Testnet (Chain ID: 11155111)
- Polygon Mainnet (Chain ID: 137)
- Mumbai Testnet (Chain ID: 80001)

## Project Structure

```
src/
├── app/                 # Next.js app router
│   ├── layout.tsx      # Root layout with providers
│   ├── page.tsx        # Main dashboard page
│   └── globals.css     # Global styles
├── components/         # React components
│   ├── ConnectWallet.tsx
│   ├── WalletInfo.tsx
│   ├── BalanceDisplay.tsx
│   └── ThemeToggle.tsx
├── contexts/           # React contexts
│   └── WalletContext.tsx
├── hooks/              # Custom hooks
│   └── useTheme.ts
└── types/              # TypeScript types
    ├── wallet.ts
    └── global.d.ts
```

## Key Components

### WalletContext

- Global state management for wallet connection
- Handles MetaMask integration and Web3 interactions
- Manages ETH/DAI balance fetching
- Listens for account and network changes

### ConnectWallet

- Connection button with loading states
- Error handling and display
- Connect/disconnect functionality

### WalletInfo

- Displays wallet address with copy functionality
- Shows current network with status indicator
- ENS name display when available

### BalanceDisplay

- Real-time ETH and DAI balance display
- Manual refresh functionality
- Token icons and formatting

### ThemeToggle

- Dark/light mode switching
- System preference detection
- localStorage persistence

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Environment Setup

No environment variables required for basic functionality. The app connects directly to MetaMask's injected provider.

## Development Approach

### **Architecture & State Management**

- **Context + useReducer Pattern**: Centralized state management using React Context with useReducer for predictable state updates
- **Type-Safe Actions**: Strongly typed Redux-style actions for wallet connection, balance updates, and error handling
- **Separation of Concerns**: Clean separation between UI components and business logic through custom hooks

### **Technology Stack**

- **Next.js 15**: App Router with React Server Components for optimal performance
- **TypeScript**: Full type safety throughout the application with strict mode enabled
- **Tailwind CSS**: Utility-first styling with custom glassmorphism effects and responsive design
- **Framer Motion**: Smooth animations and micro-interactions for enhanced UX
- **ethers.js v6**: Modern Web3 library for Ethereum blockchain interactions

### **MetaMask Integration Strategy**

- **Explicit Provider Detection**: Specifically targets MetaMask extension using `window.ethereum.isMetaMask`
- **Permission-First Approach**: Uses `wallet_requestPermissions` for forced account selection
- **Graceful Fallbacks**: Robust error handling for various connection scenarios
- **Real-time Updates**: Automatic reconnection on account/network changes via event listeners

### **Performance Optimizations**

- **useCallback/useMemo**: Optimized re-renders with proper memoization
- **Code Splitting**: Automatic code splitting via Next.js
- **Type-Only Imports**: Reduced bundle size with TypeScript type-only imports
- **Efficient Re-renders**: Strategic state updates to minimize unnecessary renders
