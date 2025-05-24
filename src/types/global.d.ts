declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request?: (args: {
        method: string;
        params?: unknown[];
      }) => Promise<unknown>;
      on?: (event: string, handler: (...args: unknown[]) => void) => void;
      removeListener?: (
        event: string,
        handler: (...args: unknown[]) => void
      ) => void;
      sendAsync?: (
        request: { method: string; params?: unknown[] },
        callback: (error: Error | null, response: unknown) => void
      ) => void;
      send?: (method: string, params: unknown[]) => Promise<unknown>;
    };
  }
}

export {};
