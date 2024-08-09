import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/homePage";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import CssBaseline from "@mui/material/CssBaseline";
import { Theme, ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";

const Router = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const darkTheme: Theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route path="/" element={<HomePage darkMode={darkMode} />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
};

export default Router;
