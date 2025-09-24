import "./buttonCTA.css";

const ButtonCTA = () => {
  return (
    <div>
      <ul className="ButtonContainer">
        <li className="ButtonCTA">
          <a
            href="mailto:victorwilliams719@gmail.com#"
            target="_blank"
            className="ButtonCTALink"
            rel="noreferrer"
          >
            CONTACT ME
          </a>
        </li>
        <li className="ButtonCTA">
          <a
            href="mailto:Vaporjawn@gmail.com#"
            target="_blank"
            className="ButtonCTALink"
            rel="noreferrer"
          >
            VAPORJAWN CONTACT
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ButtonCTA;
