import { Box, Typography, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ComingSoon = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: theme.palette.vaporwave.gradient.primary,
        color: theme.palette.text.primary,
        textAlign: "center",
        gap: 2,
      }}
    >
      <Typography variant="h1" sx={{ fontWeight: "bold", mb: 2 }}>
        COMING SOON!
      </Typography>
      <Typography variant="h5" sx={{ mb: 1 }}>
        I'm still working on this page right now.
      </Typography>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Check back in a little bit and maybe I'll actually have it done.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Home
      </Button>
    </Box>
  );
};

export default ComingSoon;
