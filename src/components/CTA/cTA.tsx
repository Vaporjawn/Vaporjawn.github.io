import ButtonCTA from '../ButtonCTA/buttonCTA';
import './cTA.css';



const CTA = () => {
  return (
    <div className="CTA">
      <header>
        <h2 className="CTAGlow">
          <strong> Want to reach me? </strong>
        </h2>
        <p className="CTAGlow-small">
          <b>Here's a few of my contacts and socials so we can be in touch.</b>
        </p>
        <ButtonCTA />
      </header>
    </div>
  );
}

export default CTA;
