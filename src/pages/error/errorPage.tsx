import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, useTheme } from "@mui/material";

const ErrorPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 7000);
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
      <Typography variant="h1" sx={{ mb: 2, fontWeight: "bold" }}>
        404 ERROR
      </Typography>
      <Box
        component="img"
        src="https://media0.giphy.com/media/12BQY6Nj4ZDAFG/giphy.gif"
        alt="Crying Pikachu"
        sx={{ width: 220, mb: 2, borderRadius: 2, boxShadow: 3 }}
      />
      <Typography variant="h5" sx={{ mb: 1 }}>
        <strong>Page not found :(</strong>
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        The page that you are looking for could not be found.
        <br />
        Redirecting to home...
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Go Home Now
      </Button>
    </Box>
  );
};

export default ErrorPage;
