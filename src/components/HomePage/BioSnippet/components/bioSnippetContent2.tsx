import { Link } from "react-router-dom";
import Header from "../../../header/header";
import { bioHeaderGlow } from "../style/bioHeaderGlow";
import P from "../../../text/text";

const BioSnippetContent2 = () => {
  return (
    <>
    <Header style={bioHeaderGlow}>Expertise</Header>
        <P style={{ fontSize: "28px" }}>
          I am a <strong>Full Stack Software Engineer</strong> with strong
          analytical skills and proficiency in mathematics. <br /> I implement
          data structures, algorithms, and file formats, emphasizing on correct
          logic and readable code. <br />I bring expertise in writing{" "}
          <strong>integrational code</strong> to support multiple platforms,
          including <strong>web, android, and iOS,</strong> and I have a solid
          grasp of{" "}
          <strong>
            data structures and object-oriented designs. You may see me mentoring
            other developers at a{" "}
            <strong>
              <Link to="/Hackathons" target="_blank">
                hackathon
              </Link>{" "}
            </strong>
            or tech meetup near you.
          </strong>
        </P>
        </>
  )
  }

export default BioSnippetContent2;