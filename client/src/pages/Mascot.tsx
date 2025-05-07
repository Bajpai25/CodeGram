import { motion } from "framer-motion";

interface MascotProps {
  step: number;
  name?: string;
}

const Mascot = ({ step, name = "" }: MascotProps) => {
  const messages = [
    `Welcome to Codegram! I'm Cody, your coding companion. Let's start by getting your name.`,
    `Great! We'll use your email to keep you updated on new challenges and achievements.`,
    `Your College ID helps us verify your student status for special academic features.`,
    `${name ? `${name}, based` : "Based"} on your year of study, we'll customize your learning path with relevant challenges.`,
    `Awesome! We'll recommend projects and problems tailored to your area of interest.`,
    `Almost done! We'll adjust the difficulty of challenges based on your current skill level.`,
  ];

  return (
    <div className="relative mb-8">
      <div className="flex items-end">
        {/* Robot/Coder Mascot SVG */}
        <motion.svg
          width="80"
          height="80"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            rotate: [0, -5, 0, 5, 0],
          }}
          transition={{
            duration: 0.5,
            rotate: {
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              duration: 5,
              ease: "easeInOut",
            }
          }}
          className="z-10"
        >
          {/* Head */}
          <motion.rect
            x="60"
            y="30"
            width="80"
            height="70"
            rx="15"
            fill="url(#gradient-head)"
            stroke="#1a1a1a"
            strokeWidth="3"
            initial={{ y: -20 }}
            animate={{ y: [-2, 2, -2] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              ease: "easeInOut",
            }}
          />
          
          {/* Eyes */}
          <motion.circle
            cx="85"
            y="60"
            r="8"
            fill="#1a1a1a"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              duration: 2,
              repeatDelay: 3,
            }}
          />
          <motion.circle
            cx="115"
            y="60"
            r="8"
            fill="#1a1a1a"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              duration: 2,
              repeatDelay: 3,
            }}
          />
          
          {/* Mouth */}
          <motion.path
            d="M85 80 Q100 90 115 80"
            stroke="#1a1a1a"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            animate={{ d: ["M85 80 Q100 90 115 80", "M85 85 Q100 75 115 85", "M85 80 Q100 90 115 80"] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 5,
              times: [0, 0.5, 1],
            }}
          />
          
          {/* Antenna */}
          <motion.line
            x1="100"
            y1="30"
            x2="100"
            y2="15"
            stroke="#1a1a1a"
            strokeWidth="3"
            initial={{ y: -20 }}
            animate={{ y: [-2, 2, -2] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              ease: "easeInOut",
            }}
          />
          <motion.circle
            cx="100"
            cy="10"
            r="5"
            fill="#f97316"
            initial={{ y: -20 }}
            animate={{ 
              y: [-2, 2, -2],
              fill: ["#f97316", "#dc2626", "#f97316"]
            }}
            transition={{
              y: {
                repeat: Number.POSITIVE_INFINITY,
                duration: 2,
                ease: "easeInOut",
              },
              fill: {
                repeat: Number.POSITIVE_INFINITY,
                duration: 3,
                ease: "easeInOut",
              }
            }}
          />
          
          {/* Body */}
          <motion.rect
            x="70"
            y="100"
            width="60"
            height="70"
            rx="10"
            fill="url(#gradient-body)"
            stroke="#1a1a1a"
            strokeWidth="3"
          />
          
          {/* Arms */}
          <motion.rect
            x="40"
            y="110"
            width="30"
            height="10"
            rx="5"
            fill="url(#gradient-limbs)"
            stroke="#1a1a1a"
            strokeWidth="2"
            animate={{ rotate: [-5, 5, -5], x: [-2, 2, -2] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              ease: "easeInOut",
            }}
          />
          <motion.rect
            x="130"
            y="110"
            width="30"
            height="10"
            rx="5"
            fill="url(#gradient-limbs)"
            stroke="#1a1a1a"
            strokeWidth="2"
            animate={{ rotate: [5, -5, 5], x: [2, -2, 2] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              ease: "easeInOut",
            }}
          />
          
          {/* Legs */}
          <motion.rect
            x="80"
            y="170"
            width="10"
            height="25"
            rx="5"
            fill="url(#gradient-limbs)"
            stroke="#1a1a1a"
            strokeWidth="2"
            animate={{ y: [0, 2, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              ease: "easeInOut",
            }}
          />
          <motion.rect
            x="110"
            y="170"
            width="10"
            height="25"
            rx="5"
            fill="url(#gradient-limbs)"
            stroke="#1a1a1a"
            strokeWidth="2"
            animate={{ y: [2, 0, 2] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          
          {/* Gradients */}
          <defs>
            <linearGradient id="gradient-head" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
            <linearGradient id="gradient-body" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="100%" stopColor="#1f2937" />
            </linearGradient>
            <linearGradient id="gradient-limbs" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#64748b" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
          </defs>
        </motion.svg>
        
        {/* Speech Bubble */}
        <motion.div 
          className="relative ml-4 p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 text-gray-300 text-sm max-w-xs"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          key={step}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            {messages[step]}
          </motion.div>
          {/* Speech bubble pointer */}
          <div className="absolute left-[-8px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-r-[8px] border-r-gray-800 border-b-[8px] border-b-transparent"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default Mascot;
