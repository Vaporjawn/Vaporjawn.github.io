import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/homePage";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import CssBaseline from "@mui/material/CssBaseline";
import { Theme, ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import HomePath from "./routes/homePath";
import ProjectsPage from "./pages/projects/projectsPage";
import ResumePage from "./pages/resume/resumePage";

const NotFoundPage = () => <h1>404 - Page Not Found</h1>;

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
        <Route path={HomePath} element={<HomePage darkMode={darkMode} />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
};

export default Router;
