import SocialMedia from "../../components/socials/socialMedia";

const HomePage = (args: { darkMode: boolean }) => {
  const { darkMode } = args;
  return (
    <div>
      <p
        style={{
          fontSize: "60px",
          fontWeight: "bold",
          marginLeft: "auto",
          marginRight: "auto",
          color: "#9600FF",
          textAlign: "center",
          // add text glow effect
          textShadow: `2px 2px 4px ${darkMode ? "#4900ff" : "#000000"}`,
        }}
      >
        Victor Williams
      </p>
      <div
        style={{
          width: "60%",
          margin: "auto",
          fontSize: "22px",
        }}
      >
        <p>
          I am a 27-year-old Temple University graduate and a seasoned Senior
          Full Stack Software Engineer with a wealth of technical prowess. I
          possess strong analytical skills, a proven track record in
          orchestrating and leading engineering teams, and extensive hands-on
          experience in team management.
        </p>
        <p>
          I am adept at wearing multiple hats, easily transitioning into roles
          such as Project Manager, Solutions Architect, Engineering Manager, or
          DevOps specialist. I’m known for my proficiency in crafting intricate
          full-stack code solutions that support a diverse array of platforms,
          including Web, Android, and iOS. My expertise extends to complex
          design paradigms like MERN, PERN, and MVC, where I consistently
          deliver top-notch solutions with precision and expertise.
        </p>
      </div>
      <SocialMedia darkMode={darkMode} />
    </div>
  );
};

export default HomePage;
