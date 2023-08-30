import './smashBioSnippet.css';

const SmashBioSnippet = () => {
  return (
    <div className="smashBio">
      <span className="shinePng">
        <img
          src="https://raw.githubusercontent.com/Vapor-jawn/Instagram-Pictures/main/images/shine.png"
          id="img5"
          alt="img5"
        />
      </span>
      <h1 className="smashBioGlow">
        <strong>
          <strong>The Classic Intro</strong>
        </strong>
      </h1>
      <iframe
        width="80%"
        height="500"
        src="https://www.youtube.com/embed/Hp92T0Iw2cc?autoplay=1&mute=1"
      />
    </div>
  );
}

export default SmashBioSnippet;
