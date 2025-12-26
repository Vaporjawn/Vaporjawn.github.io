import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const SkipLink = styled(Button)(({ theme }) => ({
  position: "fixed",
  top: -100,
  left: theme.spacing(2),
  zIndex: 9999,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(1, 2),
  fontSize: "1rem",
  fontWeight: 600,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  transition: "top 0.3s ease-in-out",
  "&:focus": {
    top: theme.spacing(2),
  },
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const SkipNavigation: React.FC = () => {
  const handleSkipToContent = () => {
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <SkipLink
      onClick={handleSkipToContent}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleSkipToContent();
        }
      }}
      tabIndex={0}
      aria-label="Skip to main content"
    >
      Skip to main content
    </SkipLink>
  );
};

export default SkipNavigation;
