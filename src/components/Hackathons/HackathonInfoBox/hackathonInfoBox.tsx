import React from "react";
import FACalendarCheck from "../../FontAwesome/Icons/faCalendarCheck";
import FACameraRetro from "../../FontAwesome/Icons/faCameraRetro";
import FAChalkboard from "../../FontAwesome/Icons/faChalkboard";
import FACode from "../../FontAwesome/Icons/faCode";
import FACubesStacked from "../../FontAwesome/Icons/faCubesStacked";
import FAGears from "../../FontAwesome/Icons/faGears";
import FAGraduationCap from "../../FontAwesome/Icons/faGraduationCap";
import FALaptopCode from "../../FontAwesome/Icons/faLaptopCode";
import FAMugSaucer from "../../FontAwesome/Icons/faMugSaucer";
import FASchoolFlag from "../../FontAwesome/Icons/faSchoolFlag";
import "./hackathonInfoBox.css";

function hackathonInfoBox() {
  return (
    <div>
      <div className="hackathonWrapper-style2-container-special-alt">
        <div className="hackathonRow-half">
          <div className="hackathonInnerInfoBox">
            <header>
              <h2 className="hackathonInfoBoxTitle">
                What I love about hackathons
              </h2>
            </header>
            <p className="hackathonInfoBoxText">
              I am a hackathon addict. For me Hackathons are never about
              winning, it's about learning. Learning ideas that were foreign to
              you and allow you to dabble outside your comfort zone. There are
              countless technologies that I picked up all because I dipped my
              toe in at a Hackathon. I find that people underestimate what can
              get done once you put your minds together. Below are two extremely
              popular Hackathon websites.
            </p>
            <footer>
              <ul className="hackathonInfoBoxButtons">
                <li className="hackathonInfoBoxPaddingLeft">
                  <a
                    href="https://devpost.com/"
                    target="_blank"
                    className="hackathonInfoBoxButtonSpecial"
                  >
                    DevPost
                  </a>
                </li>
                <li className="hackathonInfoBoxPaddingLeft">
                  <a
                    href="https://hackerearth.com/"
                    target="_blank"
                    className="hackathonInfoBoxButtonSpecial"
                  >
                    Hacker Earth
                  </a>
                </li>
              </ul>
            </footer>
          </div>
          <div className="hackathon4u skel-cell-important">
            <div className="hackathonFeaturedFAicons">
              <div className="hackathonFeaturedFAiconsSection">
                <FAGears />
                <FACubesStacked />
              </div>
              <div className="hackathonFeaturedFAiconsSection">
                <FACameraRetro />
                <FALaptopCode />
              </div>
              <div className="hackathonFeaturedFAiconsSection">
                <FAMugSaucer />
                <FACode />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default hackathonInfoBox;
