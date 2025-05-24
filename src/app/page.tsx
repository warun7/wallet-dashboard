"use client";

import { ConnectWallet } from "@/components/ConnectWallet";
import { WalletInfo } from "@/components/WalletInfo";
import { BalanceDisplay } from "@/components/BalanceDisplay";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const featureVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

export default function Home() {
  return (
    <AuroraBackground className="flex flex-col">
      <motion.div
        className="relative z-10 w-full flex-1"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.header
          className="relative flex flex-col items-center justify-center p-6 backdrop-blur-sm"
          variants={itemVariants}
        >
          {/* Theme Toggle - Positioned absolutely in top right */}
          <motion.div
            className="absolute top-6 right-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <ThemeToggle />
          </motion.div>

          {/* Centered Title Section */}
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 dark:from-purple-400 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-4"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              Wallet Dashboard
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-gray-700 dark:text-purple-300 font-light leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Connect your MetaMask wallet to view your balances and manage your
              crypto assets with ease
            </motion.p>

            {/* Decorative underline */}
            <motion.div
              className="mt-6 mx-auto w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            />
          </motion.div>
        </motion.header>

        {/* Main Content */}
        <main className="container mx-auto px-6 pb-12 pt-4">
          <div className="max-w-5xl mx-auto">
            {/* Connect Wallet Section */}
            <motion.div
              className="text-center mb-16 mt-8"
              variants={itemVariants}
            >
              <ConnectWallet />
              <motion.p
                className="text-sm md:text-base text-gray-600 dark:text-purple-400 mt-6 font-light max-w-lg mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Connect with MetaMask to view your wallet information and
                balances. <br />
                <span className="text-xs opacity-75">
                  You can switch between different accounts anytime.
                </span>
              </motion.p>
            </motion.div>

            {/* Wallet Information and Balances Grid */}
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <WalletInfo />
              </motion.div>
              <motion.div variants={itemVariants}>
                <BalanceDisplay />
              </motion.div>
            </motion.div>

            {/* Features Info */}
            <motion.div
              className="backdrop-blur-xl bg-white/10 dark:bg-black/20 rounded-3xl p-8 border border-purple-300/20 dark:border-purple-700/30 shadow-2xl"
              variants={itemVariants}
              whileHover={{
                scale: 1.01,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.h2
                className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent mb-8 text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                Features
              </motion.h2>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                {[
                  {
                    icon: "M13 10V3L4 14h7v7l9-11h-7z",
                    title: "MetaMask Integration",
                    description: "Seamlessly connect with your MetaMask wallet",
                    color: "blue",
                  },
                  {
                    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1",
                    title: "Real-time Balances",
                    description: "View ETH and DAI token balances instantly",
                    color: "green",
                  },
                  {
                    icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M13 13h4a2 2 0 012 2v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4a2 2 0 012-2z",
                    title: "ENS Support",
                    description: "Display ENS names when available",
                    color: "purple",
                  },
                  {
                    icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
                    title: "Dark Mode",
                    description: "Toggle between light and dark themes",
                    color: "yellow",
                  },
                  {
                    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
                    title: "Multi-Network",
                    description: "Support for multiple Ethereum networks",
                    color: "pink",
                  },
                  {
                    icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
                    title: "Auto-Refresh",
                    description: "Automatically updates on account changes",
                    color: "indigo",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="text-center group"
                    variants={featureVariants}
                    whileHover="hover"
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className={`w-16 h-16 backdrop-blur-lg bg-${feature.color}-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-${feature.color}-400/30 group-hover:bg-${feature.color}-500/30 transition-all duration-300`}
                      whileHover={{
                        rotate: [0, -10, 10, 0],
                        transition: { duration: 0.5 },
                      }}
                    >
                      <motion.svg
                        className={`w-8 h-8 text-${feature.color}-400`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={feature.icon}
                        />
                      </motion.svg>
                    </motion.div>
                    <motion.h3
                      className="font-semibold text-gray-800 dark:text-gray-200 mb-2"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {feature.title}
                    </motion.h3>
                    <motion.p
                      className="text-sm text-gray-600 dark:text-purple-400"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {feature.description}
                    </motion.p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <motion.footer
          className="text-center py-8 text-gray-600 dark:text-purple-400 backdrop-blur-sm"
          variants={itemVariants}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <motion.p
            className="font-light"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Built with Next.js, TypeScript, and Tailwind CSS
          </motion.p>
        </motion.footer>
      </motion.div>
    </AuroraBackground>
  );
}
