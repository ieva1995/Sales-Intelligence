import { motion } from "framer-motion";

interface PandaSvgProps {
  isPasswordVisible: boolean;
  isHappy: boolean;
}

export const PandaSvg = ({ isPasswordVisible, isHappy }: PandaSvgProps) => {
  return (
    <motion.svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main Face */}
      <motion.path
        d="M100 180c-44.183 0-80-35.817-80-80s35.817-80 80-80 80 35.817 80 80-35.817 80-80 80z"
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth="4"
        animate={{
          scale: isHappy ? 1 : 0.95,
          transition: { duration: 0.3 }
        }}
      />

      {/* Black Markings (Ears) */}
      <motion.g>
        <circle cx="50" cy="60" r="20" fill="#000000" />
        <circle cx="150" cy="60" r="20" fill="#000000" />
      </motion.g>

      {/* Face markings */}
      <motion.g>
        <circle cx="70" cy="100" r="25" fill="#000000" />
        <circle cx="130" cy="100" r="25" fill="#000000" />
      </motion.g>

      {/* Eyes */}
      <motion.g
        animate={{
          y: isPasswordVisible ? 20 : 0,
          transition: { duration: 0.3 }
        }}
      >
        <circle cx="85" cy="100" r="8" fill="#FFFFFF" />
        <circle cx="115" cy="100" r="8" fill="#FFFFFF" />
        <circle cx="85" cy="100" r="4" fill="#000000" />
        <circle cx="115" cy="100" r="4" fill="#000000" />
      </motion.g>

      {/* Paws covering eyes */}
      <motion.g
        initial={{ y: -50, opacity: 0 }}
        animate={{
          y: isPasswordVisible ? 0 : -50,
          opacity: isPasswordVisible ? 1 : 0,
          transition: { duration: 0.3 }
        }}
      >
        <circle cx="85" cy="100" r="15" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
        <circle cx="115" cy="100" r="15" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
      </motion.g>

      {/* Nose */}
      <circle cx="100" cy="115" r="8" fill="#000000" />

      {/* Mouth */}
      <motion.path
        d="M85 130 Q100 145 115 130"
        fill="none"
        stroke="#000000"
        strokeWidth="3"
        strokeLinecap="round"
        animate={{
          d: isHappy 
            ? "M85 130 Q100 145 115 130"
            : "M85 135 Q100 125 115 135",
          transition: { duration: 0.3 }
        }}
      />
    </motion.svg>
  );
};