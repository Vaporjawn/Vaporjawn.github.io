import React from 'react';

function WhatIDo() {
    return (
        <div>
            <header>
                <h2><strong><b>a little bit about what i do</b></strong></h2>
            </header>
            <p>I enjoy building webapps using <strong style="color: lightblue;">TypeScript</strong> with frameworks such as <strong style="color: #61DBFB"> React.JS </strong> or <strong style="color: #42b883">Vue.JS</strong> in the frontend, and
                <strong>Node.js{/* style="color: darkgreen" */}</strong> <strong style="color: darkblue">.NET</strong>  or <strong style="color: Red;">Ruby</strong> in the backend. I've worked with <strong>MySQL, PostgreSQL, KSQL,
                & MongoDB</strong> in the database layer.  I've used both Azure and AWS relatively equally in terms of Cloud.  And I know my way around <strong>Xamarin</strong>, <strong>React Native</strong>, and <strong>Swift</strong>, 
                and I commonly utilize <strong>RESTful APIs.</strong></p>
            <footer>
                <ul className="buttons">
                    <li><a href="https://vaporjawn.github.io/Resume.html" target="_blank" class="special button">Check out my Resume</a></li>
                    <li><a href="https://github.com/Vaporjawn/" target="_blank" class="special button">My Github</a></li>
                </ul>
            </footer>
        </div>
    );
}

export default WhatIDo;
