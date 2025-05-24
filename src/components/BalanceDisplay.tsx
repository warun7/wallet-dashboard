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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const balanceCardVariants = {
  hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.03,
    rotateY: 5,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

export function BalanceDisplay() {
  const { isConnected, ethBalance, daiBalance, refreshBalances } = useWallet();
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (!isConnected) {
    return null;
  }

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshBalances();
    setIsRefreshing(false);
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
        <div className="flex items-center justify-between mb-6">
          <motion.h2
            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Balances
          </motion.h2>
          <motion.button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-4 py-2 text-sm backdrop-blur-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/30 text-purple-700 dark:text-purple-300 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 flex items-center gap-2"
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={isRefreshing ? { rotate: 360 } : {}}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <motion.svg
              className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={isRefreshing ? { rotate: 360 } : {}}
              transition={{
                duration: 1,
                repeat: isRefreshing ? Infinity : 0,
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
              animate={isRefreshing ? { opacity: [1, 0.5, 1] } : {}}
              transition={{
                duration: 0.8,
                repeat: isRefreshing ? Infinity : 0,
              }}
            >
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </motion.span>
          </motion.button>
        </div>

        <motion.div className="space-y-6" variants={containerVariants}>
          {/* ETH Balance */}
          <motion.div
            className="backdrop-blur-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl p-6 border border-purple-400/20 hover:from-purple-500/15 hover:to-blue-500/15 transition-all duration-300 group"
            variants={balanceCardVariants}
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  className="relative"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.span
                      className="text-white font-bold text-lg"
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.2 }}
                    >
                      Ξ
                    </motion.span>
                  </motion.div>
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                <div>
                  <motion.div
                    className="font-semibold text-gray-800 dark:text-gray-200 text-lg"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    Ethereum
                  </motion.div>
                  <motion.div
                    className="text-sm text-gray-600 dark:text-purple-400"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    ETH
                  </motion.div>
                </div>
              </div>
              <div className="text-right">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={ethBalance || "loading"}
                    className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent"
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -10 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {ethBalance ? (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {ethBalance}
                      </motion.span>
                    ) : (
                      <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        Loading...
                      </motion.span>
                    )}
                  </motion.div>
                </AnimatePresence>
                <motion.div
                  className="text-sm text-gray-600 dark:text-purple-400"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  ETH
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* DAI Balance */}
          <motion.div
            className="backdrop-blur-lg bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl p-6 border border-yellow-400/20 hover:from-yellow-500/15 hover:to-orange-500/15 transition-all duration-300 group"
            variants={balanceCardVariants}
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  className="relative"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.span
                      className="text-white font-bold text-sm"
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.2 }}
                    >
                      DAI
                    </motion.span>
                  </motion.div>
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  />
                </motion.div>
                <div>
                  <motion.div
                    className="font-semibold text-gray-800 dark:text-gray-200 text-lg"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    Dai Stablecoin
                  </motion.div>
                  <motion.div
                    className="text-sm text-gray-600 dark:text-purple-400"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    DAI
                  </motion.div>
                </div>
              </div>
              <div className="text-right">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={daiBalance || "loading"}
                    className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent"
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -10 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {daiBalance ? (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {daiBalance}
                      </motion.span>
                    ) : (
                      <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        Loading...
                      </motion.span>
                    )}
                  </motion.div>
                </AnimatePresence>
                <motion.div
                  className="text-sm text-gray-600 dark:text-purple-400"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  DAI
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
