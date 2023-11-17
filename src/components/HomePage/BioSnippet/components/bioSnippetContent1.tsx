import Header from "../../../header/header";
import P from "../../../text/text";
import { bioHeaderGlow } from "../style/bioHeaderGlow";

const BioSnippetContent1 = () => {
  return (
    <>
      <Header style={bioHeaderGlow}>Who I Am</Header>
      <P style={{ fontSize: "28px" }}>
        Hello I am <strong>Victor.</strong> I am a creative
        <strong>problem solving enthusiast,</strong> with a constantly growing
        love for
        <strong> languages. </strong> <br />I help growing companies and design
        teams build sustainable, enduring experiences and processes. I have
        frequent project management experiences; and the technologies that I am
        interested in are building
        <strong> webapps, machine learning, and UX/UI design. </strong>{" "}
      </P>
    </>
  );
};

export default BioSnippetContent1;
