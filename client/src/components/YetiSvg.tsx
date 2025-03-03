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

      {/* Hair */}
      <motion.path
        fill="#FFFFFF"
        stroke="#3A5E77"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M81.457,27.929 c1.755-4.084,5.51-8.262,11.253-11.77c0.979,2.565,1.883,5.14,2.712,7.723c3.162-4.265,8.626-8.27,16.272-11.235 c-0.737,3.293-1.588,6.573-2.554,9.837c4.857-2.116,11.049-3.64,18.428-4.156c-2.403,3.23-5.021,6.391-7.852,9.474"
        animate={{
          scale: isHappy ? [1, 1.02, 1] : 1,
          transition: { duration: 1, repeat: Infinity }
        }}
      />

      {/* Eyes and Eyebrows */}
      <motion.g
        animate={{
          y: isPasswordVisible ? 20 : 0,
          transition: { duration: 0.3 }
        }}
      >
        <g className="eyebrow">
          <path
            fill="#FFFFFF"
            d="M138.142,55.064c-4.93,1.259-9.874,2.118-14.787,2.599c-0.336,3.341-0.776,6.689-1.322,10.037"
          />
          <path
            fill="#FFFFFF"
            stroke="#3A5E77"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M63.56,55.102c6.243,5.624,13.38,10.614,21.296,14.738"
          />
        </g>
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
        className="mouthBG"
        fill="#617E92"
        d="M100.2,101c-0.4,0-1.4,0-1.8,0c-2.7-0.3-5.3-1.1-8-2.5c-0.7-0.3-0.9-1.2-0.6-1.8 c0.2-0.5,0.7-0.7,1.2-0.7c0.2,0,0.5,0.1,0.6,0.2c3,1.5,5.8,2.3,8.6,2.3s5.7-0.7,8.6-2.3c0.2-0.1,0.4-0.2,0.6-0.2 c0.5,0,1,0.3,1.2,0.7c0.4,0.7,0.1,1.5-0.6,1.9c-2.6,1.4-5.3,2.2-7.9,2.5C101.7,101,100.5,101,100.2,101z"
        animate={{
          scale: isHappy ? 1 : 0.8,
          transition: { duration: 0.3 }
        }}
      />

      {/* Nose */}
      <path 
        className="nose"
        d="M97.7 79.9h4.7c1.9 0 3 2.2 1.9 3.7l-2.3 3.3c-.9 1.3-2.9 1.3-3.8 0l-2.3-3.3c-1.3-1.6-.2-3.7 1.8-3.7z"
        fill="#3a5e77"
      />
    </motion.svg>
  );
};