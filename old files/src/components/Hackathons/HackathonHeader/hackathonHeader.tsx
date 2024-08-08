import HackathonHeaderText from "./components/hackathonHeaderText";
import HackathonHeaderTitle from "./components/hackathonHeaderTitle";
import "./hackathonHeader.css";

const HackathonHeader = () => {
  return (
    <div className="App-header">
      <HackathonHeaderTitle />
      <HackathonHeaderText />
    </div>
  );
};

export default HackathonHeader;
