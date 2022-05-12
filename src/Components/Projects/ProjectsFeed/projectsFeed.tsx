import React, { useEffect, useState } from 'react';
import './projectsFeed.css';
import { ProjectReference, setConstantValue } from 'typescript';
import { Link } from 'react-router-dom';
import ProjectsList from './projectsList'
import Project from './projectsList'

//LOOKS FOR 12 RANDOM PROJECTS THAT FIT THE CATEGORY OR TOPIC RESTRICTOR
//THAT WAY I WON'T HAVE TO WORRY ABOUT HOW MANY PROJECTS TO LOAD IN OR WHETHER TO REMOVE THEM OR NOT MANUALLY

let projectObject1;
let projectObject2;
let projectObject3;
let projectObject4;
let projectObject5;
let projectObject6;
let projectObject7;
let projectObject8;
let projectObject9;
let projectObject10;
let projectObject11;
let projectObject12;

const numberGenerator = () => {
  return Math.floor(Math.random() * ProjectsList.length)+1;
}

const titleSearch = (title: string) => {
  const CurrentObject: typeof Project = ProjectsList.filter(obj => obj.Title == title);
  return CurrentObject;
}

const indexer = (index: number) => {
  const CurrentObject = ProjectsList.find(obj => obj.Index == index);

  return CurrentObject;
}

const ProjectsFeed = () => {


  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 6000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  
  {
    return (
      <div>
        <div className='ProjectsContainerHeader'><h2>NEXT LOOK AT THIS <strong>DIGITAL ART</strong></h2></div>
        <div className='ProjectsContainer'>
          <div className='ProjectsrowContainer'>
            <div className='ProjectssectionContainer'>
              <div>
                <a href='https://instagram.com/vaporjawn' target='_blank'><img src={'https://raw.githubusercontent.com/Vapor-jawn/Instagram-Pictures/main/images/CodingProject.jpg.jpg'} className='ProjectsPicture'/></a>
                <div className='ProjectsPictureTitle'><h3>SOME ART</h3></div>
                <p className='ProjectsPictureText'>Vaporjawn's origins come from my instagram page with the same name. It's peaked at over 15,000 followers and that was never my intention. Just a pleasant surprise.</p>
              </div>
            </div>
            <div className='ProjectssectionContainer'>
              <div>
                <a href='https://instagram.com/vaporjawn' target='_blank'><img src={'https://www.pngmart.com/files/13/Square-Transparent-Images-PNG.png'} className='ProjectsPicture'/></a>
                <div className='ProjectsPictureTitle'><h3>SOME ART</h3></div>
                <p className='ProjectsPictureText'>The instagram account started as a finsta. I created the finsta to take random pictures. Lucky for me, my iPhone 6S camera broke. I was forced to download an app called R4VE and started creating vaporwave edits.</p>
              </div>
            </div>
            <div className='ProjectssectionContainer'>
              <div>
                <a href='https://instagram.com/vaporjawn' target='_blank'><img src={'https://www.pngmart.com/files/13/Square-Transparent-Images-PNG.png'} className='ProjectsPicture'/></a>
                <div className='ProjectsPictureTitle'><h3>MORE ART</h3></div>
                <p className='ProjectsPictureText'>Vaporjawn has now grown into a fully fledged brand that is somewhat commonly known in the vaporwave community. It has music as well. Take a look at the page <a className='redLink' target='_blank' href='https://instagram.com/vaporjawn'>here</a> </p>
              </div>
            </div>
            <div className='ProjectssectionContainer'>
              <div>
                <a href='https://instagram.com/vaporjawn' target='_blank'><img src={'https://www.pngmart.com/files/13/Square-Transparent-Images-PNG.png'} className='ProjectsPicture'/></a>
                <div className='ProjectsPictureTitle'><h3>MORE ART</h3></div>
                <p className='ProjectsPictureText'>Vaporjawn has now grown into a fully fledged brand that is somewhat commonly known in the vaporwave community. It has music as well. Take a look at the page <a className='redLink' target='_blank' href='https://instagram.com/vaporjawn'>here</a> </p>
              </div>
            </div>
          </div>
          <div className='ProjectsrowContainer'>
            <div className='ProjectssectionContainer'>
              <div>
                <a href='https://instagram.com/vaporjawn' target='_blank'><img src={'https://www.pngmart.com/files/13/Square-Transparent-Images-PNG.png'} className='ProjectsPicture'/></a>
                <div className='ProjectsPictureTitle'><h3>MORE ART</h3></div>
                <p className='ProjectsPictureText'>While the page is inactive from a timeline standpoint, I 'consistently' update the story with beautiful edits that I find on the internet. And I also make art from time to time. It might have even popped up while you were reading this.</p>
              </div>
            </div>
            <div className='ProjectssectionContainer'>
              <div>
                <a href='https://instagram.com/vaporjawn' target='_blank'><img src={'https://www.pngmart.com/files/13/Square-Transparent-Images-PNG.png'} className='ProjectsPicture'/></a>
                <div className='ProjectsPictureTitle'><h3>MORE ART</h3></div>
                <p className='ProjectsPictureText'>Vaporjawn has now grown into a fully fledged brand that is somewhat commonly known in the vaporwave community. It has music as well. Take a look at the page <a className='redLink' target='_blank' href='https://instagram.com/vaporjawn'>here</a> </p>
              </div>
            </div>
            <div className='ProjectssectionContainer'>
              <div>
                <a href='https://instagram.com/vaporjawn' target='_blank'><img src={'https://www.pngmart.com/files/13/Square-Transparent-Images-PNG.png'} className='ProjectsPicture'/></a>
                <div className='ProjectsPictureTitle'><h3>MORE ART</h3></div>
                <p className='ProjectsPictureText'>Vaporjawn has now grown into a fully fledged brand that is somewhat commonly known in the vaporwave community. It has music as well. Take a look at the page <a className='redLink' target='_blank' href='https://instagram.com/vaporjawn'>here</a> </p>
              </div>
            </div>
            <div className='ProjectssectionContainer'>
              <div>
                <a href='https://instagram.com/vaporjawn' target='_blank'><img src={'https://www.pngmart.com/files/13/Square-Transparent-Images-PNG.png'} className='ProjectsPicture'/></a>
                <div className='ProjectsPictureTitle'><h3>MORE ART</h3></div>
                <p className='ProjectsPictureText'>Vaporjawn has now grown into a fully fledged brand that is somewhat commonly known in the vaporwave community. It has music as well. Take a look at the page <a className='redLink' target='_blank' href='https://instagram.com/vaporjawn'>here</a> </p>
              </div>
            </div>
          </div>
          <div className='ProjectsrowContainer'>
            <div className='ProjectssectionContainer'>
              <div>
                <a href='https://instagram.com/vaporjawn' target='_blank'><img src={'https://www.pngmart.com/files/13/Square-Transparent-Images-PNG.png'} className='ProjectsPicture'/></a>
                <div className='ProjectsPictureTitle'><h3>MORE ART</h3></div>
                <p className='ProjectsPictureText'>While the page is inactive from a timeline standpoint, I 'consistently' update the story with beautiful edits that I find on the internet. And I also make art from time to time. It might have even popped up while you were reading this.</p>
              </div>
            </div>
            <div className='ProjectssectionContainer'>
              <div>
                <a href='https://instagram.com/vaporjawn' target='_blank'><img src={'https://www.pngmart.com/files/13/Square-Transparent-Images-PNG.png'} className='ProjectsPicture'/></a>
                <div className='ProjectsPictureTitle'><h3>MORE ART</h3></div>
                <p className='ProjectsPictureText'>Vaporjawn has now grown into a fully fledged brand that is somewhat commonly known in the vaporwave community. It has music as well. Take a look at the page <a className='redLink' target='_blank' href='https://instagram.com/vaporjawn'>here</a> </p>
              </div>
            </div>
            <div className='ProjectssectionContainer'>
              <div>
                <a href='https://instagram.com/vaporjawn' target='_blank'><img src={'https://www.pngmart.com/files/13/Square-Transparent-Images-PNG.png'} className='ProjectsPicture'/></a>
                <div className='ProjectsPictureTitle'><h3>MORE ART</h3></div>
                <p className='ProjectsPictureText'>Vaporjawn has now grown into a fully fledged brand that is somewhat commonly known in the vaporwave community. It has music as well. Take a look at the page <a className='redLink' target='_blank' href='https://instagram.com/vaporjawn'>here</a> </p>
              </div>
            </div>
            <div className='ProjectssectionContainer'>
              <div>
                <a href='https://instagram.com/vaporjawn' target='_blank'><img src={'https://www.pngmart.com/files/13/Square-Transparent-Images-PNG.png'} className='ProjectsPicture'/></a>
                <div className='ProjectsPictureTitle'><h3>MORE ART</h3></div>
                <p className='ProjectsPictureText'>Vaporjawn has now grown into a fully fledged brand that is somewhat commonly known in the vaporwave community. It has music as well. Take a look at the page <a className='redLink' target='_blank' href='https://instagram.com/vaporjawn'>here</a> </p>
              </div>
            </div>
          </div>
        </div>
        <Link to='https://github.com/vaporjawn' className='ProjectsFeedAboutLink'><div className="ProjectsFeedAboutButton">My Github</div></Link>
      </div>
    );
  }
}
export default ProjectsFeed;
