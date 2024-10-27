

import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      id="home"
      className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500"
    >
      <motion.h1
        className="text-5xl font-bold text-white"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to My Portfolio
      </motion.h1>
    </section>
  );
};

export default Hero;
