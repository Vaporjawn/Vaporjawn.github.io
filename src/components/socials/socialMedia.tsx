import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ArticleIcon from "@mui/icons-material/Article";
import XIcon from "@mui/icons-material/X";

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
    // TODO: Add internal link to resume
    <a
      title="Resume"
      href="https://drive.google.com/file/d/1B5MqGKb4m3jvZz4MjQ5V6v9Zn1yH0YvD/view?usp=sharing"
      target="_blank"
    >
      <ArticleIcon
        style={{
          fontSize: "2.5rem",
          color: darkMode ? "white" : "black",
        }}
      />
    </a>
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
