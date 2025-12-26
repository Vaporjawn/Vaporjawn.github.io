import { Box } from "@mui/material";
import { motion } from "framer-motion";

interface RocketIllustrationProps {
  size?: number;
  animated?: boolean;
}

const RocketIllustration: React.FC<RocketIllustrationProps> = ({
  size = 200,
  animated = true,
}) => {
  const MotionPath = animated ? motion.path : "path";
  const MotionCircle = animated ? motion.circle : "circle";

  return (
    <Box sx={{ width: size, height: size }}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        {/* Stars */}
        <MotionCircle
          cx="30"
          cy="40"
          r="2"
          fill="currentColor"
          {...(animated && {
            initial: { scale: 0 },
            animate: { scale: [0, 1, 0.5, 1] },
            transition: { duration: 2, repeat: Infinity, repeatDelay: 1 },
          })}
        />
        <MotionCircle
          cx="170"
          cy="60"
          r="2"
          fill="currentColor"
          {...(animated && {
            initial: { scale: 0 },
            animate: { scale: [0, 1, 0.5, 1] },
            transition: {
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
              delay: 0.5,
            },
          })}
        />
        <MotionCircle
          cx="50"
          cy="150"
          r="2"
          fill="currentColor"
          {...(animated && {
            initial: { scale: 0 },
            animate: { scale: [0, 1, 0.5, 1] },
            transition: {
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
              delay: 1,
            },
          })}
        />

        {/* Rocket body */}
        <MotionPath
          d="M100 30 L120 80 L120 120 L100 140 L80 120 L80 80 Z"
          fill="url(#rocketGradient)"
          stroke="currentColor"
          strokeWidth="2"
          {...(animated && {
            initial: { y: 50, opacity: 0 },
            animate: { y: [0, -5, 0], opacity: 1 },
            transition: {
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 0.5 },
            },
          })}
        />

        {/* Window */}
        <MotionCircle
          cx="100"
          cy="70"
          r="12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          {...(animated && {
            initial: { y: 50, opacity: 0 },
            animate: { y: [0, -5, 0], opacity: 1 },
            transition: {
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 0.5, delay: 0.2 },
            },
          })}
        />

        {/* Flames */}
        <MotionPath
          d="M85 140 L90 160 L85 170 Z"
          fill="#ff6b6b"
          {...(animated && {
            initial: { opacity: 0, scaleY: 0 },
            animate: {
              opacity: [0.8, 1, 0.8],
              scaleY: [1, 1.2, 1],
              y: [0, -5, 0],
            },
            transition: {
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          })}
        />
        <MotionPath
          d="M95 140 L100 165 L95 175 Z"
          fill="#ffd93d"
          {...(animated && {
            initial: { opacity: 0, scaleY: 0 },
            animate: {
              opacity: [0.8, 1, 0.8],
              scaleY: [1, 1.3, 1],
              y: [0, -5, 0],
            },
            transition: {
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.1,
            },
          })}
        />
        <MotionPath
          d="M105 140 L110 165 L105 175 Z"
          fill="#ffd93d"
          {...(animated && {
            initial: { opacity: 0, scaleY: 0 },
            animate: {
              opacity: [0.8, 1, 0.8],
              scaleY: [1, 1.3, 1],
              y: [0, -5, 0],
            },
            transition: {
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            },
          })}
        />
        <MotionPath
          d="M115 140 L110 160 L115 170 Z"
          fill="#ff6b6b"
          {...(animated && {
            initial: { opacity: 0, scaleY: 0 },
            animate: {
              opacity: [0.8, 1, 0.8],
              scaleY: [1, 1.2, 1],
              y: [0, -5, 0],
            },
            transition: {
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.15,
            },
          })}
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient
            id="rocketGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>
    </Box>
  );
};

export default RocketIllustration;
