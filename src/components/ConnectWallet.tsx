"use client";

import { useWallet } from "@/contexts/WalletContext";
import { motion, AnimatePresence } from "framer-motion";

const buttonVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  tap: { scale: 0.95 },
};

const pulseVariants = {
  pulse: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const errorVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.9,
    transition: {
      duration: 0.2,
    },
  },
};

const tipVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: 0.2,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
    },
  },
};

export function ConnectWallet() {
  const { isConnected, connectWallet, disconnectWallet, isLoading, error } =
    useWallet();

  return (
    <motion.div
      className="flex flex-col items-center gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <AnimatePresence mode="wait">
        {!isConnected ? (
          <motion.button
            key="connect"
            onClick={connectWallet}
            disabled={isLoading}
            className="group relative px-8 py-4 backdrop-blur-xl bg-gradient-to-r from-purple-500 to-blue-500/20 hover:from-purple-500 hover:to-blue-500/30 border border-purple-400/30 text-gray-800 dark:text-white font-semibold rounded-2xl transition-all duration-300 shadow-2xl disabled:cursor-not-allowed disabled:opacity-50"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            animate={isLoading ? "pulse" : "initial"}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"
              animate={
                isLoading
                  ? { scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }
                  : {}
              }
              transition={{ duration: 1.5, repeat: isLoading ? Infinity : 0 }}
            />
            <motion.div
              className="relative flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3"
                  >
                    <motion.svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </motion.svg>
                    <motion.span
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      Connecting to MetaMask...
                    </motion.span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="connect-text"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3"
                  >
                    <motion.svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </motion.svg>
                    Connect MetaMask
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.button>
        ) : (
          <motion.div
            key="connected"
            className="flex gap-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              onClick={connectWallet}
              disabled={isLoading}
              className="group relative px-6 py-3 backdrop-blur-xl bg-gradient-to-r from-green-500 to-emerald-500/20 hover:from-green-500 hover:to-emerald-500/30 border border-green-400/30 text-gray-800 dark:text-white font-medium rounded-xl transition-all duration-300 shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
              title="Switch to a different account. If no account picker appears, manually switch accounts in your wallet first."
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.div
                className="relative flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="switching"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2"
                    >
                      <motion.svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </motion.svg>
                      <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        Switching...
                      </motion.span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="switch-text"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2"
                    >
                      <motion.svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        whileHover={{ scale: 1.2, rotate: [0, 180, 360] }}
                        transition={{ duration: 0.5 }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                        />
                      </motion.svg>
                      Switch Account
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.button>
            <motion.button
              onClick={disconnectWallet}
              className="group relative px-6 py-3 backdrop-blur-xl bg-gradient-to-r from-red-400 to-pink-500/20 hover:from-red-400 hover:to-pink-500/30 border border-red-400/30 text-gray-800 dark:text-white font-medium rounded-xl transition-all duration-300 shadow-lg"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.div
                className="relative flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <motion.svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  whileHover={{ x: [0, -2, 2, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </motion.svg>
                Disconnect
              </motion.div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.div
            className="backdrop-blur-xl bg-red-500/10 border border-red-400/30 rounded-2xl p-6 max-w-md"
            variants={errorVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ x: 2 }}
              transition={{ duration: 0.2 }}
            >
              <motion.svg
                className="w-5 h-5 text-red-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </motion.svg>
              <motion.p
                className="text-red-700 dark:text-red-300 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                {error}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isConnected && (
          <motion.div
            className="backdrop-blur-lg bg-purple-500/10 border border-purple-400/20 rounded-2xl p-4 max-w-md text-center"
            variants={tipVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="flex items-center justify-center gap-2 text-gray-700 dark:text-purple-400 text-xs"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <motion.svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </motion.svg>
              <motion.span
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <strong>Tip:</strong> To switch accounts, change the active
                account in your wallet first, then click &ldquo;Switch
                Account&rdquo;
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
