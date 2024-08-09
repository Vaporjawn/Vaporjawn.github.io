import DarkModeToggle from "./components/darkModeToggle";
import "./styles/header.css";
import { NavigateFunction, useNavigate } from "react-router-dom";

const Header = (args: {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { darkMode, setDarkMode } = args;
  const navigate: NavigateFunction = useNavigate();

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        marginRight: "auto",
        marginLeft: "auto",
        backgroundColor: "#4900ff",
      }}
    >
      <nav>
        <ul style={{ display: "flex", listStyle: "none" }}>
          <li style={{ marginRight: "1rem" }}>
            <a
              onClick={() => navigate("/about")}
              className="header-link"
            >
              About
            </a>
          </li>
          <li style={{ marginRight: "1rem" }}>
            <a
              onClick={() => navigate("/projects")}
              className="header-link"
            >
              Projects
            </a>
          </li>
          <li style={{ marginRight: "1rem" }}>
            <a
              onClick={() => navigate("/contact")}
              className="header-link"
            >
              Option 3
            </a>
          </li>
        </ul>
      </nav>
      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
    </header>
  );
};

export default Header;
