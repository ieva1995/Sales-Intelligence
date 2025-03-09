import { motion } from "framer-motion";

export const LionSvg = ({ isPasswordVisible = false, isHappy = true }) => {
  return (
    <motion.svg
      width="300"
      height="300"
      viewBox="0 0 300 300"
      initial="initial"
      animate="animate"
    >
      {/* Lion Face */}
      <motion.path
        d="M150 280c-55 0-100-45-100-100s45-100 100-100 100 45 100 100-45 100-100 100z"
        fill="#D4A256"
        stroke="#8B4513"
        strokeWidth="4"
        animate={{
          scale: isHappy ? 1 : 0.95,
          transition: { duration: 0.3 }
        }}
      />

      {/* Lion Mane */}
      <motion.path
        d="M150 100c-80 0-130-30-130-30s20-40 130-40 130 40 130 40-50 30-130 30z"
        fill="#B8860B"
        animate={{
          scale: isHappy ? [1, 1.02, 1] : 1,
          transition: { duration: 1, repeat: Infinity }
        }}
      />

      {/* Eyes */}
      <motion.g
        animate={{
          y: isPasswordVisible ? 20 : 0,
          transition: { duration: 0.3 }
        }}
      >
        <circle cx="120" cy="140" r="12" fill="#000" />
        <circle cx="180" cy="140" r="12" fill="#000" />
      </motion.g>

      {/* Paws covering eyes when password is visible */}
      <motion.g
        initial={{ y: -50, opacity: 0 }}
        animate={{
          y: isPasswordVisible ? 0 : -50,
          opacity: isPasswordVisible ? 1 : 0,
          transition: { duration: 0.3 }
        }}
      >
        <circle cx="120" cy="140" r="20" fill="#D4A256" stroke="#8B4513" strokeWidth="2" />
        <circle cx="180" cy="140" r="20" fill="#D4A256" stroke="#8B4513" strokeWidth="2" />
      </motion.g>

      {/* Nose */}
      <circle cx="150" cy="160" r="10" fill="#8B4513" />

      {/* Smile */}
      <motion.path
        d="M110 180 Q150 220 190 180"
        fill="none"
        stroke="#8B4513"
        strokeWidth="4"
        strokeLinecap="round"
        animate={{
          d: isHappy 
            ? "M110 180 Q150 220 190 180"
            : "M110 190 Q150 170 190 190",
          transition: { duration: 0.3 }
        }}
      />
    </motion.svg>
  );
};
