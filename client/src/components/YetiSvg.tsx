import { motion } from "framer-motion";

export const YetiSvg = ({ isPasswordVisible = false, isHappy = true }) => {
  return (
    <motion.svg
      width="300"
      height="300"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      initial="initial"
      animate="animate"
    >
      {/* Define Mask Paths */}
      <defs>
        <circle id="armMaskPath" cx="100" cy="100" r="100"/>
      </defs>
      <clipPath id="armMask">
        <use xlinkHref="#armMaskPath" overflow="visible"/>
      </clipPath>

      {/* Body */}
      <circle cx="100" cy="100" r="100" fill="#a9ddf3"/>
      <motion.g className="body">
        <path 
          fill="#FFFFFF" 
          d="M193.3,135.9c-5.8-8.4-15.5-13.9-26.5-13.9H151V72c0-27.6-22.4-50-50-50S51,44.4,51,72v50H32.1 c-10.6,0-20,5.1-25.8,13l0,78h187L193.3,135.9z"
        />
        <path 
          fill="none" 
          stroke="#3A5E77" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M193.3,135.9 c-5.8-8.4-15.5-13.9-26.5-13.9H151V72c0-27.6-22.4-50-50-50S51,44.4,51,72v50H32.1c-10.6,0-20,5.1-25.8,13"
        />
      </motion.g>

      {/* Eyes */}
      <motion.g
        animate={{
          y: isPasswordVisible ? 20 : 0,
          transition: { duration: 0.3 }
        }}
      >
        <g className="eyeL">
          <circle cx="85.5" cy="78.5" r="3.5" fill="#3a5e77"/>
          <circle cx="84" cy="76" r="1" fill="#fff"/>
        </g>
        <g className="eyeR">
          <circle cx="114.5" cy="78.5" r="3.5" fill="#3a5e77"/>
          <circle cx="113" cy="76" r="1" fill="#fff"/>
        </g>
      </motion.g>

      {/* Arms for covering eyes */}
      <motion.g 
        className="arms" 
        clipPath="url(#armMask)"
        animate={{
          y: isPasswordVisible ? 0 : -50,
          opacity: isPasswordVisible ? 1 : 0
        }}
        initial={{ y: -50, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <g className="armL">
          <path
            fill="#ddf1fa"
            stroke="#3a5e77"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M121.3 97.4L111 58.7l38.8-10.4 20 36.1z"
          />
        </g>
        <g className="armR">
          <path
            fill="#ddf1fa"
            stroke="#3a5e77"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M265.4 97.3l10.4-38.6-38.9-10.5-20 36.1z"
          />
        </g>
      </motion.g>

      {/* Mouth */}
      <motion.path
        d="M100.2,101c-0.4,0-1.4,0-1.8,0c-2.7-0.3-5.3-1.1-8-2.5c-0.7-0.3-0.9-1.2-0.6-1.8"
        fill="none"
        stroke="#3A5E77"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{
          d: isHappy 
            ? "M100.2,101c-0.4,0-1.4,0-1.8,0c-2.7-0.3-5.3-1.1-8-2.5c-0.7-0.3-0.9-1.2-0.6-1.8"
            : "M100.2,101c-0.4,0-1.4,0-1.8,0c-2.7-0.3-5.3-1.1-8-2.5c-0.7-0.3-0.9-1.2-0.6-1.8",
          pathLength: isHappy ? 1 : 0.8,
          transition: { duration: 0.3 }
        }}
      />
    </motion.svg>
  );
};