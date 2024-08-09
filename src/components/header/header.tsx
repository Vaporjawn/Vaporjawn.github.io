import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import "./styles/header.css";

const DarkModeToggle = (args: {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { darkMode, setDarkMode } = args;
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      style={{
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
      }}
    >
      {darkMode ? (
        <LightModeOutlinedIcon
          style={{
            fontSize: "2.5rem",
            color: "white",
          }}
        />
      ) : (
        <DarkModeOutlinedIcon
          style={{
            fontSize: "2.5rem",
            color: "black",
          }}
        />
      )}
    </button>
  );
};

const Header = (args: {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { darkMode, setDarkMode } = args;
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
              href="#"
              className="header-link"

            >
              Option 1
            </a>
          </li>
          <li style={{ marginRight: "1rem" }}>
            <a
              href="#"
              className="header-link"
            >
              Option 2
            </a>
          </li>
          <li style={{ marginRight: "1rem" }}>
            <a
              href="#"
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
