import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";

const BOXX = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/SSBM");
    }, 30000);
    return () => clearTimeout(timer);
  }, [navigate]);

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
      <Link to="/SSBM">
        <Box
          component="img"
          src="https://raw.githubusercontent.com/Vapor-jawn/Instagram-Pictures/main/images/meleeLogo.png"
          alt="Melee Logo"
          sx={{ width: 200, mb: 2, borderRadius: 2, boxShadow: 3 }}
        />
      </Link>
      <Typography
        variant="h3"
        sx={{ color: theme.palette.vaporwave.pink, fontWeight: "bold" }}
      >
        The year is 20XX.
      </Typography>
      <Typography variant="h5" sx={{ color: theme.palette.vaporwave.green }}>
        Everyone plays Fox at TAS levels of perfection.
      </Typography>
      <Typography
        variant="h5"
        sx={{ color: theme.palette.vaporwave.blueGreen }}
      >
        Because of this, the winner of a match depends solely on port priority.
      </Typography>
      <Typography variant="h5" sx={{ color: theme.palette.vaporwave.purple }}>
        The RPS metagame has evolved to ridiculous levels due to it being the
        only remaining factor to decide matches.
      </Typography>
      <Box sx={{ width: "100%", maxWidth: 600, mt: 4 }}>
        <Box
          component="video"
          loop
          muted
          autoPlay
          src="https://raw.githubusercontent.com/Vapor-jawn/Instagram-Pictures/main/images/meleeTitleScreen.mp4"
          sx={{ width: "100%", borderRadius: 2, boxShadow: 3 }}
        />
      </Box>
    </Box>
  );
};

export default BOXX;
