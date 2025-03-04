import { motion } from "framer-motion";

export function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative w-24 h-24">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 rounded-full"
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}
        <motion.div
          className="absolute top-1/2 left-1/2 w-4 h-4 bg-blue-500 rounded-full"
          initial={{ y: -10 }}
          animate={{ y: 10 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          style={{ transform: 'translate(-50%, -50%)' }}
        />
      </div>
      <motion.p
        className="text-lg text-blue-500 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Analyzing Trends...
      </motion.p>
    </div>
  );
}
