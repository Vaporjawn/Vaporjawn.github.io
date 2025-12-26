import { Box } from "@mui/material";
import { motion } from "framer-motion";

interface CodeIllustrationProps {
  size?: number;
  animated?: boolean;
}

const CodeIllustration: React.FC<CodeIllustrationProps> = ({
  size = 200,
  animated = true,
}) => {
  const MotionPath = animated ? motion.path : "path";
  const MotionCircle = animated ? motion.circle : "circle";
  const MotionRect = animated ? motion.rect : "rect";

  return (
    <Box sx={{ width: size, height: size }}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        {/* Background circle */}
        <MotionCircle
          cx="100"
          cy="100"
          r="90"
          fill="url(#codeGradient)"
          {...(animated && {
            initial: { scale: 0, opacity: 0 },
            animate: { scale: 1, opacity: 0.1 },
            transition: { duration: 0.5 },
          })}
        />

        {/* Code brackets */}
        <MotionPath
          d="M60 60 L40 80 L40 120 L60 140"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...(animated && {
            initial: { pathLength: 0, opacity: 0 },
            animate: { pathLength: 1, opacity: 1 },
            transition: { duration: 1, delay: 0.2 },
          })}
        />
        <MotionPath
          d="M140 60 L160 80 L160 120 L140 140"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...(animated && {
            initial: { pathLength: 0, opacity: 0 },
            animate: { pathLength: 1, opacity: 1 },
            transition: { duration: 1, delay: 0.3 },
          })}
        />

        {/* Code lines */}
        <MotionRect
          x="70"
          y="75"
          width="40"
          height="4"
          rx="2"
          fill="currentColor"
          {...(animated && {
            initial: { scaleX: 0, opacity: 0 },
            animate: { scaleX: 1, opacity: 0.8 },
            transition: { duration: 0.5, delay: 0.4 },
          })}
        />
        <MotionRect
          x="70"
          y="95"
          width="60"
          height="4"
          rx="2"
          fill="currentColor"
          {...(animated && {
            initial: { scaleX: 0, opacity: 0 },
            animate: { scaleX: 1, opacity: 0.8 },
            transition: { duration: 0.5, delay: 0.5 },
          })}
        />
        <MotionRect
          x="70"
          y="115"
          width="50"
          height="4"
          rx="2"
          fill="currentColor"
          {...(animated && {
            initial: { scaleX: 0, opacity: 0 },
            animate: { scaleX: 1, opacity: 0.8 },
            transition: { duration: 0.5, delay: 0.6 },
          })}
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="codeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>
    </Box>
  );
};

export default CodeIllustration;
