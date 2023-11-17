import "./smashFeed.css";
import { Link } from "react-router-dom";

const SmashFeed = () => {
  {
    return (
      <div className="SmashPictureContainer">
        <div className="SmashContainerHeader">
          <h2>
            MY FAVORITE <strong>MELEE</strong> CONTENT FROM THE COMMUNITY{" "}
          </h2>
        </div>
        <div className="rowContainer">
          <div className="sectionContainer">
            <a
              href="https://www.youtube.com/watch?v=NSf2mgkRm7Q&list=PLoUHkRwnRH-IXbZfwlgiEN8eXmoj6DtKM&index=1"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={
                  "https://raw.githubusercontent.com/Vapor-jawn/Instagram-Pictures/main/images/THE SMASH BROTHERS DOCUMENTARY SERIES.jpg"
                }
                className="SmashPicture"
              />
            </a>
            <div className="SmashPictureTitle">
              <h3>THE SMASH BROTHERS DOCUMENTARY SERIES</h3>
            </div>
            <p className="SmashPictureText">
              This is the reason I got into the Esport when I did. After just
              watching this I was inspired to pick up a controller and the rest
              was history.
            </p>
          </div>
          <div className="sectionContainer">
            <a
              href="https://www.youtube.com/watch?v=ESJOMtWx6nI"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={
                  "https://raw.githubusercontent.com/Vapor-jawn/Instagram-Pictures/main/images/NO LS IN ART - A PGH CARROLL COMBO VIDEO.jpg"
                }
                className="SmashPicture"
              />
            </a>
            <div className="SmashPictureTitle">
              <h3>"NO L'S IN ART" - A PGH CARROLL COMBO VIDEO</h3>
            </div>
            <p className="SmashPictureText">
              A combo video showcasing 4 different playstyles with 4 different
              characters, all by one person.
            </p>
          </div>
        </div>
        <div className="rowContainer">
          <div className="sectionContainer">
            <a
              href="https://www.youtube.com/watch?v=LKuD2a4yRcE&feature=youtu.be"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={
                  "https://raw.githubusercontent.com/Vapor-jawn/Instagram-Pictures/main/images/THE ULTIMATE SHOWDOWN.jpg"
                }
                className="SmashPicture"
              />
            </a>
            <div className="SmashPictureTitle">
              <h3>20XX: THE ULTIMATE SHOWDOWN - FOX VS. FOX (TAS)</h3>
            </div>
            <p className="SmashPictureText">
              The year is 20XX... players have obtained the ability to play Fox
              at TAS levels of perfection. The winner of every match now comes
              down to whoever has controller port priority.
            </p>
          </div>
          <div className="sectionContainer">
            <a
              href="https://www.youtube.com/watch?v=1ME6xFkGUfs"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={
                  "https://raw.githubusercontent.com/Vapor-jawn/Instagram-Pictures/main/images/THERE IS SO MUCH MORE MELEE (TO BE PLAYED).jpg"
                }
                className="SmashPicture"
              />
            </a>
            <div className="SmashPictureTitle">
              <h3>THERE IS SO MUCH MORE MELEE (TO BE PLAYED)</h3>
            </div>
            <p className="SmashPictureText">
              Despite being a rushed project released in 2001. The community has
              come so far and isn't showing signed of slowing down.{" "}
            </p>
          </div>
        </div>
        <Link
          to="https://www.youtube.com/watch?v=8B0AY3EA4Xc"
          className="SmashFeedAboutLink"
        >
          <div className="SmashFeedAboutButton">
            Want to see real tournament melee?
          </div>
        </Link>
      </div>
    );
  }
};
export default SmashFeed;
