import { motion } from "framer-motion";
import React from "react";

export default function Home() {
  return (
    <div className="flex h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -400 }}
        animate={{ opacity: 1, y: 0, rotate: 360 }}
        transition={{ duration: 0.5 }}
        className="m-auto text-5xl"
      >
        WELCOME HOME
      </motion.h1>
    </div>
  );
}
