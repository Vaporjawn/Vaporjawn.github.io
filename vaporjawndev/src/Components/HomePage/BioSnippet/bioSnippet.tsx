import React from 'react';
import './bioSnippet.css';

function BioSnippet() {
  return (
    <div className="Bio">
        <p>
            <p className='large-font'>Hello I am <strong>Victor.</strong> I'm a creative <strong>problem solving enthusiast,</strong> with a constantly growing love for
                <strong> languages. </strong>I have frequent project management experiences; and the technologies that I am interested in are building
                <strong>  webapps, machine learning, and UX/UI design. </strong> </p>
            </p>
            <p className='regular-font'>I am a <strong><a href="./freelance.html" target="_blank">freelance software developer</a></strong> with strong analytical skills and proficiency in mathematics. I bring expertise in writing <strong>full-stack
                code</strong> to support multiple platforms, including <strong>web, android, and iOS,</strong> and I have a solid grasp of <strong>data structures and object-oriented designs. You may see me mentoring other developers at a <strong><a href="./hackathons.html">hackathon</a> </strong> 
                or tech meetup near you.
                </strong>
        </p>  
    </div>
  );
}

export default BioSnippet;
