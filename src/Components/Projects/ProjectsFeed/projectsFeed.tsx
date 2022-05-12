import React, { useEffect, useState } from 'react';
import './projectsFeed.css';
import { ProjectReference, setConstantValue } from 'typescript';
import { Link } from 'react-router-dom';
import ProjectsList from './projectsList'
import Project from './projectsList'

//LOOKS FOR 12 RANDOM PROJECTS THAT FIT THE CATEGORY OR TOPIC RESTRICTOR
//THAT WAY I WON'T HAVE TO WORRY ABOUT HOW MANY PROJECTS TO LOAD IN OR WHETHER TO REMOVE THEM OR NOT MANUALLY

//NEED TO MAKE A FUNCTION THAT ASSISGNS THE SEARCH RESULTS TO THE 12 OBJECTS SO THAT I CAN LIMIT THE RESULTS

let projectObject1: {Title: string, Description: string, Link: string, Image: string, Languages: string[], Frameworks: string[], Tags: string[], Year: number, Index: number};
let projectObject2: {Title: string, Description: string, Link: string, Image: string, Languages: string[], Frameworks: string[], Tags: string[], Year: number, Index: number};
let projectObject3: {Title: string, Description: string, Link: string, Image: string, Languages: string[], Frameworks: string[], Tags: string[], Year: number, Index: number};
let projectObject4: {Title: string, Description: string, Link: string, Image: string, Languages: string[], Frameworks: string[], Tags: string[], Year: number, Index: number};
let projectObject5: {Title: string, Description: string, Link: string, Image: string, Languages: string[], Frameworks: string[], Tags: string[], Year: number, Index: number};
let projectObject6: {Title: string, Description: string, Link: string, Image: string, Languages: string[], Frameworks: string[], Tags: string[], Year: number, Index: number};
let projectObject7: {Title: string, Description: string, Link: string, Image: string, Languages: string[], Frameworks: string[], Tags: string[], Year: number, Index: number};
let projectObject8: {Title: string, Description: string, Link: string, Image: string, Languages: string[], Frameworks: string[], Tags: string[], Year: number, Index: number};
let projectObject9: {Title: string, Description: string, Link: string, Image: string, Languages: string[], Frameworks: string[], Tags: string[], Year: number, Index: number};
let projectObject10: {Title: string, Description: string, Link: string, Image: string, Languages: string[], Frameworks: string[], Tags: string[], Year: number, Index: number};
let projectObject11: {Title: string, Description: string, Link: string, Image: string, Languages: string[], Frameworks: string[], Tags: string[], Year: number, Index: number};
let projectObject12: {Title: string, Description: string, Link: string, Image: string, Languages: string[], Frameworks: string[], Tags: string[], Year: number, Index: number};

const numberGenerator = () => {
  let num = Math.floor(Math.random() * ProjectsList.length);
  return num;
}

const indexer = (index: number) => {
  const CurrentObject = ProjectsList.find(obj => obj.Index == index);
  return CurrentObject;
}

const instantiateObjects = () => {
  let duplicates: number[] = [];

  const duplicateChecker = () => {
    let requestedNumber: number = numberGenerator();
    
    while(duplicates.find(n => n == requestedNumber)){
      requestedNumber = numberGenerator();
      if(true) break;
      // if(duplicates.find(n => n == requestedNumber)) break;
    }
      duplicates.push(requestedNumber);
    return requestedNumber;
  }
//need to change back to duplicatecheck
  projectObject1 = ProjectsList[numberGenerator()];
  projectObject2 = ProjectsList[numberGenerator()];
  projectObject3 = ProjectsList[numberGenerator()];
  projectObject4 = ProjectsList[numberGenerator()];
  projectObject5 = ProjectsList[numberGenerator()];
  projectObject6 = ProjectsList[numberGenerator()];
  projectObject7 = ProjectsList[numberGenerator()];
  projectObject8 = ProjectsList[numberGenerator()];
  projectObject9 = ProjectsList[numberGenerator()];
  projectObject10 = ProjectsList[numberGenerator()];
  projectObject11 = ProjectsList[numberGenerator()];
  projectObject12 = ProjectsList[numberGenerator()];
  console.log(projectObject1);
  console.log(projectObject2);
  console.log(projectObject3);
  console.log(projectObject4);
  console.log(projectObject5);
  console.log(projectObject6);
  console.log(projectObject7);
  console.log(projectObject8);
  console.log(projectObject9);
  console.log(projectObject10);
  console.log(projectObject11);
  console.log(projectObject12);
}

const initializeResults = (results: typeof Project) => {

  projectObject1 = results[0];
  projectObject2 = results[1];
  projectObject3 = results[2];
  projectObject4 = results[3];
  projectObject5 = results[4];
  projectObject6 = results[5];
  projectObject7 = results[6];
  projectObject8 = results[7];
  projectObject9 = results[8];
  projectObject10 = results[9];
  projectObject11 = results[10];
  projectObject12 = results[11];
}

const frameworkFilter = (framework: string) => {
  const CurrentObject: typeof Project = ProjectsList.filter(obj => obj.Frameworks.filter(obj2 => obj2 == framework));
  return CurrentObject;
}

const languageFilter = (language: string) => {
  const CurrentObject: typeof Project = ProjectsList.filter(obj => obj.Languages.filter(obj2 => obj2 == language));
  return CurrentObject;
}

const tagsFilter = (tag: string) => {
  const CurrentObject: typeof Project = ProjectsList.filter(obj => obj.Tags.filter(obj2 => obj2 == tag));
  return CurrentObject;
}

const titleSearch = (title: string) => {
  const CurrentObject: typeof Project = ProjectsList.filter(obj => obj.Title == title);
  return CurrentObject;
}

const totalSearchIndexer = (searchResults: typeof Project[]) => {
  let resultsArray: typeof Project = [];
  while(resultsArray.length < 12){
    for(let i=0; i<searchResults.length; i++){
      for(let j=0; j<searchResults.length; j++){
        if(resultsArray.length == 12) break;
        resultsArray.push(searchResults[i][j]);
      }
    }
  }
  initializeResults(resultsArray);
}

const totalSearch = (userEntry: string) => {
  let totalResult: typeof Project[] = [];

  const searchArray: RegExpMatchArray | null = userEntry.match(/\b(\w+)\b/g);
    if(searchArray){
      for (let i=0; i<searchArray.length; i++){
        //search everywhere 
        //add the filtered Project[] to the bottom array so that you can return all of the search results
        const title = titleSearch(searchArray[i]);
        const description = titleSearch(searchArray[i]);
        const language = languageFilter(searchArray[i]);
        const framework = frameworkFilter(searchArray[i]);
        const tag = tagsFilter(searchArray[i]);
        const year = yearFilter(searchArray[i]);
        totalResult.concat(title, description,language,framework, tag, year);
      }
    }
    totalSearchIndexer(totalResult);
}

const yearFilter = (year: number | string) => {
  if(typeof year === 'string'){
    year = parseInt(year);
  }
  const CurrentObject: typeof Project = ProjectsList.filter(obj => obj.Year == year);
  return CurrentObject;
}

const ProjectsFeed = () => {
  const [time, setTime] = useState(Date.now());
  instantiateObjects();
  // useEffect(() => {
  //   const interval = setInterval(() => setTime(Date.now()), 6000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);
  {
    return (
      <div>
        <div className='ProjectsContainerHeader'><h2>NEXT LOOK AT THIS <strong>DIGITAL ART</strong></h2></div>
        <div className='ProjectsContainer'>
          <div className='ProjectsRowContainer'>
            <div className='ProjectsSectionContainer'>
              <div>
                <a href={projectObject1.Link} target='_blank'><img src={projectObject1.Image} className='ProjectsPicture'/></a>
                <div className='ProjectsPictureTitle'><h3>{projectObject1.Title}</h3></div>
                <p className='ProjectsPictureText'>{projectObject1.Description}</p>
              </div>
            </div>
            <div className='ProjectsSectionContainer'>
              <div>
                <a href={projectObject2.Link} target='_blank'><img src={projectObject2.Image} className='ProjectsPicture'/></a>
                <div className='ProjectsPictureTitle'><h3>{projectObject2.Title}</h3></div>
                <p className='ProjectsPictureText'>{projectObject2.Description}</p>
              </div>
            </div>
            <div className='ProjectsSectionContainer'>
              <div>
                <a href={projectObject3.Link} target='_blank'><img src={projectObject3.Image} className='ProjectsPicture'/></a>
                <div className='ProjectsPictureTitle'><h3>{projectObject3.Title}</h3></div>
                <p className='ProjectsPictureText'>{projectObject3.Description}</p>
              </div>
            </div>
            <div className='ProjectsSectionContainer'>
              <div>
                <a href={projectObject4.Link} target='_blank'><img src={projectObject4.Image} className='ProjectsPicture'/></a>
                <div className='ProjectsPictureTitle'><h3>{projectObject4.Title}</h3></div>
                <p className='ProjectsPictureText'>{projectObject4.Description}</p>
              </div>
            </div>
          </div>
          <div className='ProjectsRowContainer'>
            <div className='ProjectsSectionContainer'>
              <div>
                <a href={projectObject5.Link} target='_blank'><img src={projectObject5.Image} className='ProjectsPicture'/></a>
                <div className='ProjectsPictureTitle'><h3>{projectObject5.Title}</h3></div>
                <p className='ProjectsPictureText'>{projectObject5.Description}</p>
              </div>
            </div>
            <div className='ProjectsSectionContainer'>
              <div>
                <a href={projectObject6.Link} target='_blank'><img src={projectObject6.Image} className='ProjectsPicture'/></a>
                <div className='ProjectsPictureTitle'><h3>{projectObject6.Title}</h3></div>
                <p className='ProjectsPictureText'>{projectObject6.Description}</p>
              </div>
            </div>
            <div className='ProjectsSectionContainer'>
              <div>
                <a href={projectObject7.Link} target='_blank'><img src={projectObject7.Image} className='ProjectsPicture'/></a>
                <div className='ProjectsPictureTitle'><h3>{projectObject7.Title}</h3></div>
                <p className='ProjectsPictureText'>{projectObject7.Description}</p>
              </div>
            </div>
            <div className='ProjectsSectionContainer'>
              <div>
                <a href={projectObject8.Link} target='_blank'><img src={projectObject8.Image} className='ProjectsPicture'/></a>
                <div className='ProjectsPictureTitle'><h3>{projectObject8.Title}</h3></div>
                <p className='ProjectsPictureText'>{projectObject8.Description}</p>
              </div>
            </div>
          </div>
          <div className='ProjectsRowContainer'>
            <div className='ProjectsSectionContainer'>
              <div>
                <a href={projectObject9.Link} target='_blank'><img src={projectObject9.Image} className='ProjectsPicture'/></a>
                <div className='ProjectsPictureTitle'><h3>{projectObject9.Title}</h3></div>
                <p className='ProjectsPictureText'>{projectObject9.Description}</p>
              </div>
            </div>
            <div className='ProjectsSectionContainer'>
              <div>
                <a href={projectObject10.Link} target='_blank'><img src={projectObject10.Image} className='ProjectsPicture'/></a>
                <div className='ProjectsPictureTitle'><h3>{projectObject10.Title}</h3></div>
                <p className='ProjectsPictureText'>{projectObject10.Description}</p>
              </div>
            </div>
            <div className='ProjectsSectionContainer'>
              <div>
                <a href={projectObject11.Link} target='_blank'><img src={projectObject11.Image} className='ProjectsPicture'/></a>
                <div className='ProjectsPictureTitle'><h3>{projectObject11.Title}</h3></div>
                <p className='ProjectsPictureText'>{projectObject11.Description}</p>
              </div>
            </div>
            <div className='ProjectsSectionContainer'>
              <div>
                <a href={projectObject12.Link} target='_blank'><img src={projectObject12.Image} className='ProjectsPicture'/></a>
                <div className='ProjectsPictureTitle'><h3>{projectObject12.Title}</h3></div>
                <p className='ProjectsPictureText'>{projectObject12.Description}</p>
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
