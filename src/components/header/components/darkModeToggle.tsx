import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

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
            color: "yellow",
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

export default DarkModeToggle;