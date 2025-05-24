"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const toggleVariants = {
  light: {
    rotate: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  dark: {
    rotate: 270,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  tap: {
    scale: 0.9,
    transition: {
      duration: 0.1,
    },
  },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -270 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    rotate: 180,
    transition: {
      duration: 0.2,
    },
  },
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <motion.div
        className="w-12 h-12 rounded-2xl backdrop-blur-lg bg-white/10 dark:bg-black/20 border border-purple-300/20 dark:border-purple-700/30"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    );
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-12 h-12 rounded-2xl backdrop-blur-lg bg-white/10 dark:bg-black border border-purple-300/20 dark:border-purple-700/30 shadow-lg overflow-hidden group"
      variants={toggleVariants}
      initial={isDark ? "dark" : "light"}
      animate={isDark ? "dark" : "light"}
      whileHover="hover"
      whileTap="tap"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 dark:from-purple-600 dark:via-blue-600 dark:to-indigo-700"
        animate={{
          opacity: isDark ? 0.1 : 0.2,
          scale: isDark ? 0.8 : 1.1,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Glowing effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{
          boxShadow: isDark
            ? "0 0 20px rgba(139, 92, 246, 0.3)"
            : "0 0 20px rgba(251, 191, 36, 0.3)",
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Icon container */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.svg
              key="moon"
              className="w-6 h-6 text-purple-400"
              fill="currentColor"
              viewBox="0 0 24 24"
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.path
                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </motion.svg>
          ) : (
            <motion.svg
              key="sun"
              className="w-6 h-6 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 24 24"
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.path
                d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              <motion.path
                d="M12,6a6,6,0,1,0,6,6A6,6,0,0,0,12,6Zm0,10a4,4,0,1,1,4-4A4,4,0,0,1,12,16Z"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 0.1, ease: "easeInOut" }}
              />
              {/* Sun rays */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation, index) => (
                <motion.line
                  key={index}
                  x1="12"
                  y1="1"
                  x2="12"
                  y2="3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  transform={`rotate(${rotation} 12 12)`}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.2 + index * 0.05,
                    ease: "easeOut",
                  }}
                />
              ))}
            </motion.svg>
          )}
        </AnimatePresence>
      </div>

      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        initial={{ scale: 0, opacity: 0.5 }}
        whileTap={{
          scale: 2,
          opacity: 0,
          transition: { duration: 0.3 },
        }}
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, transparent 70%)",
        }}
      />
    </motion.button>
  );
}
