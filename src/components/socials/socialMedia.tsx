import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ArticleIcon from "@mui/icons-material/Article";
import XIcon from "@mui/icons-material/X";
import { Link } from "react-router-dom";

const Twitter = () => {
  return (
    <a title="Twitter" href="https://twitter.com/vaporjawn" target="_blank">
      <XIcon
        style={{
          fontSize: "2.5rem",
          color: "black",
        }}
      />
    </a>
  );
};

const Resume = (args: { darkMode: boolean }) => {
  const { darkMode } = args;
  return (
    <Link
      title="Resume"
      to={"/resume"}
    >
      <ArticleIcon
        style={{
          fontSize: "2.5rem",
          color: darkMode ? "white" : "black",
        }}
      />
    </Link>
  );
};

const EmailLink = (args: { darkMode: boolean }) => {
  const { darkMode } = args;
  return (
    <a title="Email" href="mailto:victor.williams.dev@gmail.com">
      <MailOutlineIcon
        style={{
          fontSize: "2.5rem",
          color: darkMode ? "white" : "black",
        }}
      />
    </a>
  );
};

const LinkedIn = () => {
  return (
    <a
      title="LinkedIn"
      href="https://www.linkedin.com/in/victorwilliams719/"
      target="_blank"
    >
      <LinkedInIcon
        style={{
          fontSize: "2.5rem",
          color: "#0A66C2",
        }}
      />
    </a>
  );
};

const GitHub = (args: { darkMode: boolean }) => {
  const { darkMode } = args;
  return (
    <a title="GitHub" href="https://github.com/vaporjawn" target="_blank">
      <GitHubIcon
        style={{
          fontSize: "2.5rem",
          color: darkMode ? "white" : "black",
        }}
      />
    </a>
  );
};

const SocialMedia = (args: { darkMode: boolean }) => {
  const { darkMode } = args;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "2rem",
        marginTop: "2rem",
      }}
    >
      <GitHub darkMode={darkMode} />
      <EmailLink darkMode={darkMode} />
      <Resume darkMode={darkMode} />
      <LinkedIn />
      <Twitter />
    </div>
  );
};

export default SocialMedia;
