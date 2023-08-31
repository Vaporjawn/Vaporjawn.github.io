import  from "react";
import "./hackathonHeader.css";

function HackathonHeader() {
  return (
    <div>
      <div className="App-header">
        <header>
          <h2 className="hackathonGlow">Hackathons</h2>
        </header>
        <p className="hackathonBlerb">
          Hackathons are one of my favorite pastimes as a software engineer.
          When I attended{" "}
          <a
            href="./temple.html"
            className="HackathonHeaderLink"
            target="_blank"
          >
            Temple University
          </a>{" "}
          as an undergraduate, I belonged to an organization known as
          <a className="HackathonHeaderLink" href="https://TUDev.org/">
            <strong>TUDev.</strong>
          </a>
          <br />
        </p>
      </div>
    </div>
  );
}

export default HackathonHeader;
