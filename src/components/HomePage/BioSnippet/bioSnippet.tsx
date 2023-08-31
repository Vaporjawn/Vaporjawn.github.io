import { Link } from 'react-router-dom';
import './bioSnippet.css';

const BioSnippet = () => {
  return (
    <div className="Bio">
      <h1 className="bioHeaderGlow">Who I Am</h1>
      <p className="large-font">
        Hello I am <strong>Victor.</strong> I'm a creative{' '}
        <strong>problem solving enthusiast,</strong> with a constantly growing
        love for
        <strong> languages. </strong> <br />I help growing companies and design
        teams build sustainable, enduring experiences and processes. I have
        frequent project management experiences; and the technologies that I am
        interested in are building
        <strong> webapps, machine learning, and UX/UI design. </strong>{' '}
      </p>
      <h1 className="bioHeaderGlow">Expertise</h1>
      <p className="regular-font">
        I am a <strong>Full Stack Software Engineer</strong> with strong
        analytical skills and proficiency in mathematics. <br /> I implement
        data structures, algorithms, and file formats, emphasizing on correct
        logic and readable code. <br />I bring expertise in writing{' '}
        <strong>integrational code</strong> to support multiple platforms,
        including <strong>web, android, and iOS,</strong> and I have a solid
        grasp of{' '}
        <strong>
          data structures and object-oriented designs. You may see me mentoring
          other developers at a{' '}
          <strong>
            <Link to="/Hackathons" target="_blank">
              hackathon
            </Link>{' '}
          </strong>
          or tech meetup near you.
        </strong>
      </p>
    </div>
  );
}

export default BioSnippet;
