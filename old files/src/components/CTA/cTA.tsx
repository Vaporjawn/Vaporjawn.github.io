import ButtonCTA from "../ButtonCTA/buttonCTA";
import "./cTA.css";
import CTAHeaderTitle from "./components/cTaHeaderTitle";

const CTA = () => {
  return (
    <div className="CTA">
      <header>
        <CTAHeaderTitle />
        <CTAHeaderTitle />
        <ButtonCTA />
      </header>
    </div>
  );
};

export default CTA;
