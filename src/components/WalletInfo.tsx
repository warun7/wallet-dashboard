"use client";

import { useWallet } from "@/contexts/WalletContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export function WalletInfo() {
  const { isConnected, address, network, ensName } = useWallet();
  const [copied, setCopied] = useState(false);

  if (!isConnected || !address) {
    return null;
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy address:", error);
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="backdrop-blur-xl bg-white/10 dark:bg-black/20 rounded-3xl p-8 border border-purple-300/20 dark:border-purple-700/30 shadow-2xl hover:bg-white/15 dark:hover:bg-black/25 transition-all duration-300"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.h2
          className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          Wallet Information
        </motion.h2>

        <motion.div className="space-y-6" variants={containerVariants}>
          {/* ENS Name */}
          <AnimatePresence>
            {ensName && (
              <motion.div
                className="group"
                variants={itemVariants}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
              >
                <motion.label
                  className="block text-sm font-medium text-gray-700 dark:text-purple-400 mb-2"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  ENS Name
                </motion.label>
                <motion.div
                  className="backdrop-blur-lg bg-white/5 dark:bg-black/10 rounded-2xl p-4 border border-purple-300/20 dark:border-purple-700/20"
                  whileHover={{
                    borderColor: "rgba(168, 85, 247, 0.4)",
                    boxShadow: "0 0 20px rgba(168, 85, 247, 0.1)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.span
                    className="text-xl font-mono bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {ensName}
                  </motion.span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Address */}
          <motion.div className="group" variants={itemVariants}>
            <motion.label
              className="block text-sm font-medium text-gray-700 dark:text-purple-400 mb-2"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              Wallet Address
            </motion.label>
            <motion.div
              className="backdrop-blur-lg bg-white/5 dark:bg-black/10 rounded-2xl p-4 border border-purple-300/20 dark:border-purple-700/20 hover:bg-white/10 dark:hover:bg-black/15 transition-all duration-300"
              whileHover={{
                borderColor: "rgba(168, 85, 247, 0.4)",
                boxShadow: "0 0 20px rgba(168, 85, 247, 0.1)",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <motion.div
                    className="font-mono text-gray-800 dark:text-gray-200 text-lg"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    {formatAddress(address)}
                  </motion.div>
                  <motion.div
                    className="text-xs text-gray-600 dark:text-purple-400 mt-1 font-mono break-all"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {address}
                  </motion.div>
                </div>
                <motion.button
                  onClick={copyToClipboard}
                  className="ml-4 px-3 py-2 text-xs backdrop-blur-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/30 text-purple-700 dark:text-purple-300 rounded-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  animate={copied ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div
                        key="copied"
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
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </motion.svg>
                        Copied!
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
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
                          whileHover={{ rotate: [0, -5, 5, 0] }}
                          transition={{ duration: 0.3 }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </motion.svg>
                        Copy
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Network */}
          <motion.div className="group" variants={itemVariants}>
            <motion.label
              className="block text-sm font-medium text-gray-700 dark:text-purple-400 mb-2"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              Network
            </motion.label>
            <motion.div
              className="backdrop-blur-lg bg-white/5 dark:bg-black/10 rounded-2xl p-4 border border-purple-300/20 dark:border-purple-700/20"
              whileHover={{
                borderColor: "rgba(34, 197, 94, 0.4)",
                boxShadow: "0 0 20px rgba(34, 197, 94, 0.1)",
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative">
                  <motion.div
                    className="w-3 h-3 bg-green-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75"
                    animate={{ scale: [1, 2, 1], opacity: [0.75, 0, 0.75] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <motion.span
                  className="text-gray-800 dark:text-gray-200 text-lg font-medium"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {network}
                </motion.span>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
