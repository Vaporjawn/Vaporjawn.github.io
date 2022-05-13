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
let dropdownVisibility1: string = 'ProjectButtonDeactivated';
let dropdownVisibility1Under: string = 'ProjectButtonActivated';
let dropdownVisibility2: string = 'ProjectButtonDeactivated';
let dropdownVisibility2Under: string = 'ProjectButtonActivated';
let dropdownVisibility3: string = 'ProjectButtonDeactivated';
let dropdownVisibility3Under: string = 'ProjectButtonActivated';
let dropdownVisibility4: string = 'ProjectButtonDeactivated';
let dropdownVisibility4Under: string = 'ProjectButtonActivated';
let dropdownVisibility5: string = 'ProjectButtonDeactivated';
let dropdownVisibility5Under: string = 'ProjectButtonActivated';
let dropdownVisibility6: string = 'ProjectButtonDeactivated';
let dropdownVisibility6Under: string = 'ProjectButtonActivated';
let dropdownVisibility7: string = 'ProjectButtonDeactivated';
let dropdownVisibility7Under: string = 'ProjectButtonActivated';
let dropdownVisibility8: string = 'ProjectButtonDeactivated';
let dropdownVisibility8Under: string = 'ProjectButtonActivated';
let dropdownVisibility9: string = 'ProjectButtonDeactivated';
let dropdownVisibility9Under: string = 'ProjectButtonActivated';
let dropdownVisibility10: string = 'ProjectButtonDeactivated';
let dropdownVisibility10Under: string = 'ProjectButtonActivated';
let dropdownVisibility11: string = 'ProjectButtonDeactivated';
let dropdownVisibility11Under: string = 'ProjectButtonActivated';
let dropdownVisibility12: string = 'ProjectButtonDeactivated';
let dropdownVisibility12Under: string = 'ProjectButtonActivated';



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
    
    if(duplicates.find(n => n == requestedNumber)){
      requestedNumber = numberGenerator();
      if(duplicates.find(n => n == requestedNumber)){
        duplicateChecker();
      }else{
        return requestedNumber;
      }
    }
    duplicates.push(requestedNumber);
    return requestedNumber;
  }

  if(!projectObject1){
    projectObject1 = ProjectsList[duplicateChecker()];
    projectObject2 = ProjectsList[duplicateChecker()];
    projectObject3 = ProjectsList[duplicateChecker()];
    projectObject4 = ProjectsList[duplicateChecker()];
    projectObject5 = ProjectsList[duplicateChecker()];
    projectObject6 = ProjectsList[duplicateChecker()];
    projectObject7 = ProjectsList[duplicateChecker()];
    projectObject8 = ProjectsList[duplicateChecker()];
    projectObject9 = ProjectsList[duplicateChecker()];
    projectObject10 = ProjectsList[duplicateChecker()];
    projectObject11 = ProjectsList[duplicateChecker()];
    projectObject12 = ProjectsList[duplicateChecker()];
  }
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
  const [visibility, setVisibility] = useState(false);
  instantiateObjects();
  const changeVisibility = (cardNumber: number) => {
    if(visibility == false){
      setVisibility(true);
    };
    if(visibility == true){
      setVisibility(false);
    };

    switch(cardNumber){
      //@ts-ignore
      case 1: {
        if(dropdownVisibility1 == 'ProjectButtonDeactivated' || ''){dropdownVisibility1 = 'ProjectButtonActivated'; dropdownVisibility1Under = 'ProjectButtonDeactivated'; break;}
        if(dropdownVisibility1 == 'ProjectButtonActivated'){dropdownVisibility1 = 'ProjectButtonDeactivated';  dropdownVisibility1Under = 'ProjectButtonActivated'; break;}
      }
      //@ts-ignore
      case 2: {
        console.log(dropdownVisibility2);
        if(dropdownVisibility2 == 'ProjectButtonDeactivated' || dropdownVisibility2 == ''){dropdownVisibility2 = 'ProjectButtonActivated'; dropdownVisibility2Under = 'ProjectButtonDeactivated'; break;}
        if(dropdownVisibility2 == 'ProjectButtonActivated'){dropdownVisibility2 = 'ProjectButtonDeactivated'; dropdownVisibility2Under = 'ProjectButtonActivated'; break;}
      }
      //@ts-ignore
      case 3: {
        if(dropdownVisibility3 == 'ProjectButtonDeactivated' || dropdownVisibility3 == ''){dropdownVisibility3 = 'ProjectButtonActivated'; dropdownVisibility3Under = 'ProjectButtonDeactivated'; break;}
        if(dropdownVisibility3 == 'ProjectButtonActivated'){dropdownVisibility3 = 'ProjectButtonDeactivated'; dropdownVisibility3Under = 'ProjectButtonActivated'; break;}
      }
      //@ts-ignore
      case 4: {
        if(dropdownVisibility4 == 'ProjectButtonDeactivated' || dropdownVisibility4 == ''){dropdownVisibility4 = 'ProjectButtonActivated'; dropdownVisibility4Under = 'ProjectButtonDeactivated'; break;}
        if(dropdownVisibility4 == 'ProjectButtonActivated'){dropdownVisibility4 = 'ProjectButtonDeactivated'; dropdownVisibility4Under = 'ProjectButtonActivated'; break;}
      }
      //@ts-ignore
      case 5: {
        if(dropdownVisibility5 == 'ProjectButtonDeactivated' || dropdownVisibility5 == ''){dropdownVisibility5 = 'ProjectButtonActivated'; dropdownVisibility5Under = 'ProjectButtonDeactivated'; break;}
        if(dropdownVisibility5 == 'ProjectButtonActivated'){dropdownVisibility5 = 'ProjectButtonDeactivated'; dropdownVisibility5Under = 'ProjectButtonActivated'; break;}
      }
      //@ts-ignore
      case 6: {
        if(dropdownVisibility6 == 'ProjectButtonDeactivated' || dropdownVisibility6 == ''){dropdownVisibility6 = 'ProjectButtonActivated'; dropdownVisibility6Under = 'ProjectButtonDeactivated'; break;}
        if(dropdownVisibility6 == 'ProjectButtonActivated'){dropdownVisibility6 = 'ProjectButtonDeactivated'; dropdownVisibility6Under = 'ProjectButtonActivated'; break;}
      }
      //@ts-ignore
      case 7: {
        if(dropdownVisibility7 == 'ProjectButtonDeactivated' || dropdownVisibility7 == ''){dropdownVisibility7 = 'ProjectButtonActivated'; dropdownVisibility7Under = 'ProjectButtonDeactivated'; break;}
        if(dropdownVisibility7 == 'ProjectButtonActivated'){dropdownVisibility7 = 'ProjectButtonDeactivated'; dropdownVisibility7Under = 'ProjectButtonActivated'; break;}
      }
      //@ts-ignore
      case 8: {
        if(dropdownVisibility8 == 'ProjectButtonDeactivated' || dropdownVisibility8 == ''){dropdownVisibility8 = 'ProjectButtonActivated'; dropdownVisibility8Under = 'ProjectButtonDeactivated'; break;}
        if(dropdownVisibility8 == 'ProjectButtonActivated'){dropdownVisibility8 = 'ProjectButtonDeactivated'; dropdownVisibility8Under = 'ProjectButtonActivated'; break;}
      }
      //@ts-ignore
      case 9: {
        if(dropdownVisibility9 == 'ProjectButtonDeactivated' || dropdownVisibility9 == ''){dropdownVisibility9 = 'ProjectButtonActivated'; dropdownVisibility9Under = 'ProjectButtonDeactivated'; break;}
        if(dropdownVisibility9 == 'ProjectButtonActivated'){dropdownVisibility9 = 'ProjectButtonDeactivated'; dropdownVisibility9Under = 'ProjectButtonActivated'; break;}
      }
      //@ts-ignore
      case 10: {
        if(dropdownVisibility10 == 'ProjectButtonDeactivated' || dropdownVisibility10 == ''){dropdownVisibility10 = 'ProjectButtonActivated'; dropdownVisibility10Under = 'ProjectButtonDeactivated'; break;}
        if(dropdownVisibility10 == 'ProjectButtonActivated'){dropdownVisibility10 = 'ProjectButtonDeactivated'; dropdownVisibility10Under = 'ProjectButtonActivated'; break;}
      }
      //@ts-ignore
      case 11: {
        if(dropdownVisibility11 == 'ProjectButtonDeactivated' || dropdownVisibility11 == ''){dropdownVisibility11 = 'ProjectButtonActivated'; dropdownVisibility11Under = 'ProjectButtonDeactivated'; break;}
        if(dropdownVisibility11 == 'ProjectButtonActivated'){dropdownVisibility11 = 'ProjectButtonDeactivated'; dropdownVisibility11Under = 'ProjectButtonActivated'; break;}
      }
      //@ts-ignore
      case 12: {
        if(dropdownVisibility12 == 'ProjectButtonDeactivated' || dropdownVisibility12 == ''){dropdownVisibility12 = 'ProjectButtonActivated'; dropdownVisibility12Under = 'ProjectButtonDeactivated'; break;}
        if(dropdownVisibility12 == 'ProjectButtonActivated'){dropdownVisibility12 = 'ProjectButtonDeactivated'; dropdownVisibility12Under = 'ProjectButtonActivated'; break;}
      }
      
    }
  }
  // useEffect(() => {
  //   const interval = setInterval(() => setTime(Date.now()), 6000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);
  {
    return (
      <div>
        <div className='ProjectsContainerHeader'><h2>TAKE A LOOK AT SOME OF MY PROJECTS</h2></div>
        <div className='ProjectsContainer'>
          <div className='ProjectsRowContainer'>
            <div className='ProjectsSectionContainer'>
              <div>
                <a onClick = {() => changeVisibility(1)}><img src={projectObject1.Image} className={dropdownVisibility1Under + ' ProjectsPicture'}/></a>
                <div className='ProjectsPictureTitle'><h3>{projectObject1.Title}</h3></div>
                <p className='ProjectsPictureText'>{projectObject1.Description}
                </p>
                  <button className='ProjectClickButton' onClick={() => changeVisibility(1)}>Info</button>
                <div className={dropdownVisibility1 + ' ProjectsSectionCover'}>
                  <div className='ProjectsSectionCoverText'>
                    Languages: {projectObject1.Languages.toString()}<br/>
                    Frameworks: {projectObject1.Frameworks.toString()}<br/>
                    {/* Tags: {projectObject1.Tags.toString()}<br/> */}
                  </div>
                  <a className='ProjectViewButton' href={projectObject1.Link} target='_blank'>View Project</a>
                </div>
              </div>
            </div>
            <div className='ProjectsSectionContainer'>
              <div>
                <a onClick = {() => changeVisibility(2)}><img src={projectObject2.Image} className={dropdownVisibility2Under + ' ProjectsPicture'}/></a>
                <div className='ProjectsPictureTitle'><h3>{projectObject2.Title}</h3></div>
                <p className='ProjectsPictureText'>{projectObject2.Description}
                </p>
                  <button className='ProjectClickButton' onClick={() => changeVisibility(2)}>Info</button>
                <div className={dropdownVisibility2 + ' ProjectsSectionCover'}>
                  <div className='ProjectsSectionCoverText'>
                    Languages: {projectObject2.Languages.toString()}<br/>
                    Frameworks: {projectObject2.Frameworks.toString()}<br/>
                    {/* Tags: {projectObject2.Tags.toString()}<br/> */}
                  </div>
                  <a className='ProjectViewButton' href={projectObject2.Link} target='_blank'>View Project</a>
                </div>
              </div>
            </div>
            <div className='ProjectsSectionContainer'>
              <div>
                <a onClick = {() => changeVisibility(3)}><img src={projectObject3.Image} className={dropdownVisibility3Under + ' ProjectsPicture'}/></a>
                <div className='ProjectsPictureTitle'><h3>{projectObject3.Title}</h3></div>
                <p className='ProjectsPictureText'>{projectObject3.Description}
                </p>
                  <button className='ProjectClickButton' onClick={() => changeVisibility(3)}>Info</button>
                <div className={dropdownVisibility3 + ' ProjectsSectionCover'}>
                  <div className='ProjectsSectionCoverText'>
                    Languages: {projectObject3.Languages.toString()}<br/>
                    Frameworks: {projectObject3.Frameworks.toString()}<br/>
                    {/* Tags: {projectObject3.Tags.toString()}<br/> */}
                  </div>
                  <a className='ProjectViewButton' href={projectObject3.Link} target='_blank'>View Project</a>
                </div>
              </div>
            </div>
            <div className='ProjectsSectionContainer'>
              <div>
                <a onClick = {() => changeVisibility(4)}><img src={projectObject4.Image} className={dropdownVisibility4Under + ' ProjectsPicture'}/></a>
                <div className='ProjectsPictureTitle'><h3>{projectObject4.Title}</h3></div>
                <p className='ProjectsPictureText'>{projectObject4.Description}
                </p>
                  <button className='ProjectClickButton' onClick={() => changeVisibility(4)}>Info</button>
                <div className={dropdownVisibility4 + ' ProjectsSectionCover'}>
                  <div className='ProjectsSectionCoverText'>
                    Languages: {projectObject4.Languages.toString()}<br/>
                    Frameworks: {projectObject4.Frameworks.toString()}<br/>
                    {/* Tags: {projectObject4.Tags.toString()}<br/> */}
                  </div>
                  <a className='ProjectViewButton' href={projectObject4.Link} target='_blank'>View Project</a>
                </div>
              </div>
            </div>
          </div>
          <div className='ProjectsRowContainer'>
          <div className='ProjectsSectionContainer'>
              <div>
                <a onClick = {() => changeVisibility(5)}><img src={projectObject5.Image} className={dropdownVisibility5Under + ' ProjectsPicture'}/></a>
                <div className='ProjectsPictureTitle'><h3>{projectObject5.Title}</h3></div>
                <p className='ProjectsPictureText'>{projectObject5.Description}
                </p>
                  <button className='ProjectClickButton' onClick={() => changeVisibility(5)}>Info</button>
                <div className={dropdownVisibility5 + ' ProjectsSectionCover'}>
                  <div className='ProjectsSectionCoverText'>
                    Languages: {projectObject5.Languages.toString()}<br/>
                    Frameworks: {projectObject5.Frameworks.toString()}<br/>
                    {/* Tags: {projectObject5.Tags.toString()}<br/> */}
                  </div>
                  <a className='ProjectViewButton' href={projectObject5.Link} target='_blank'>View Project</a>
                </div>
              </div>
            </div>
            <div className='ProjectsSectionContainer'>
              <div>
                <a onClick = {() => changeVisibility(6)}><img src={projectObject6.Image} className={dropdownVisibility6Under + ' ProjectsPicture'}/></a>
                <div className='ProjectsPictureTitle'><h3>{projectObject6.Title}</h3></div>
                <p className='ProjectsPictureText'>{projectObject6.Description}
                </p>
                  <button className='ProjectClickButton' onClick={() => changeVisibility(6)}>Info</button>
                <div className={dropdownVisibility6 + ' ProjectsSectionCover'}>
                  <div className='ProjectsSectionCoverText'>
                    Languages: {projectObject6.Languages.toString()}<br/>
                    Frameworks: {projectObject6.Frameworks.toString()}<br/>
                    {/* Tags: {projectObject6.Tags.toString()}<br/> */}
                  </div>
                  <a className='ProjectViewButton' href={projectObject6.Link} target='_blank'>View Project</a>
                </div>
              </div>
            </div>
            <div className='ProjectsSectionContainer'>
              <div>
                <a onClick = {() => changeVisibility(7)}><img src={projectObject7.Image} className={dropdownVisibility7Under + ' ProjectsPicture'}/></a>
                <div className='ProjectsPictureTitle'><h3>{projectObject7.Title}</h3></div>
                <p className='ProjectsPictureText'>{projectObject7.Description}
                </p>
                  <button className='ProjectClickButton' onClick={() => changeVisibility(7)}>Info</button>
                <div className={dropdownVisibility7 + ' ProjectsSectionCover'}>
                  <div className='ProjectsSectionCoverText'>
                    Languages: {projectObject7.Languages.toString()}<br/>
                    Frameworks: {projectObject7.Frameworks.toString()}<br/>
                    {/* Tags: {projectObject7.Tags.toString()}<br/> */}
                  </div>
                  <a className='ProjectViewButton' href={projectObject7.Link} target='_blank'>View Project</a>
                </div>
              </div>
            </div>
            <div className='ProjectsSectionContainer'>
              <div>
                <a onClick = {() => changeVisibility(8)}><img src={projectObject8.Image} className={dropdownVisibility8Under + ' ProjectsPicture'}/></a>
                <div className='ProjectsPictureTitle'><h3>{projectObject8.Title}</h3></div>
                <p className='ProjectsPictureText'>{projectObject8.Description}
                </p>
                  <button className='ProjectClickButton' onClick={() => changeVisibility(8)}>Info</button>
                <div className={dropdownVisibility8 + ' ProjectsSectionCover'}>
                  <div className='ProjectsSectionCoverText'>
                    Languages: {projectObject8.Languages.toString()}<br/>
                    Frameworks: {projectObject8.Frameworks.toString()}<br/>
                    {/* Tags: {projectObject8.Tags.toString()}<br/> */}
                  </div>
                  <a className='ProjectViewButton' href={projectObject8.Link} target='_blank'>View Project</a>
                </div>
              </div>
            </div>
          </div>
          <div className='ProjectsRowContainer'>
          <div className='ProjectsSectionContainer'>
              <div>
                <a onClick = {() => changeVisibility(9)}><img src={projectObject9.Image} className={dropdownVisibility9Under + ' ProjectsPicture'}/></a>
                <div className='ProjectsPictureTitle'><h3>{projectObject9.Title}</h3></div>
                <p className='ProjectsPictureText'>{projectObject9.Description}
                </p>
                  <button className='ProjectClickButton' onClick={() => changeVisibility(9)}>Info</button>
                <div className={dropdownVisibility9 + ' ProjectsSectionCover'}>
                  <div className='ProjectsSectionCoverText'>
                    Languages: {projectObject9.Languages.toString()}<br/>
                    Frameworks: {projectObject9.Frameworks.toString()}<br/>
                    {/* Tags: {projectObject9.Tags.toString()}<br/> */}
                  </div>
                  <a className='ProjectViewButton' href={projectObject9.Link} target='_blank'>View Project</a>
                </div>
              </div>
            </div>
            <div className='ProjectsSectionContainer'>
              <div>
                <a onClick = {() => changeVisibility(10)}><img src={projectObject10.Image} className={dropdownVisibility10Under + ' ProjectsPicture'}/></a>
                <div className='ProjectsPictureTitle'><h3>{projectObject10.Title}</h3></div>
                <p className='ProjectsPictureText'>{projectObject10.Description}
                </p>
                  <button className='ProjectClickButton' onClick={() => changeVisibility(10)}>Info</button>
                <div className={dropdownVisibility10 + ' ProjectsSectionCover'}>
                  <div className='ProjectsSectionCoverText'>
                    Languages: {projectObject10.Languages.toString()}<br/>
                    Frameworks: {projectObject10.Frameworks.toString()}<br/>
                    {/* Tags: {projectObject10.Tags.toString()}<br/> */}
                  </div>
                  <a className='ProjectViewButton' href={projectObject10.Link} target='_blank'>View Project</a>
                </div>
              </div>
            </div>
            <div className='ProjectsSectionContainer'>
              <div>
                <a onClick = {() => changeVisibility(11)}><img src={projectObject10.Image} className={dropdownVisibility11Under + ' ProjectsPicture'}/></a>
                <div className='ProjectsPictureTitle'><h3>{projectObject11.Title}</h3></div>
                <p className='ProjectsPictureText'>{projectObject11.Description}
                </p>
                  <button className='ProjectClickButton' onClick={() => changeVisibility(11)}>Info</button>
                <div className={dropdownVisibility11 + ' ProjectsSectionCover'}>
                  <div className='ProjectsSectionCoverText'>
                    Languages: {projectObject11.Languages.toString()}<br/>
                    Frameworks: {projectObject11.Frameworks.toString()}<br/>
                    {/* Tags: {projectObject11.Tags.toString()}<br/> */}
                  </div>
                  <a className='ProjectViewButton' href={projectObject11.Link} target='_blank'>View Project</a>
                </div>
              </div>
            </div>
            <div className='ProjectsSectionContainer'>
              <div>
                <a onClick = {() => changeVisibility(12)}><img src={projectObject12.Image} className={dropdownVisibility12Under + ' ProjectsPicture'}/></a>
                <div className='ProjectsPictureTitle'><h3>{projectObject12.Title}</h3></div>
                <p className='ProjectsPictureText'>{projectObject12.Description}
                </p>
                  <button className='ProjectClickButton' onClick={() => changeVisibility(12)}>Info</button>
                <div className={dropdownVisibility12 + ' ProjectsSectionCover'}>
                  <div className='ProjectsSectionCoverText'>
                    Languages: {projectObject12.Languages.toString()}<br/>
                    Frameworks: {projectObject12.Frameworks.toString()}<br/>
                    {/* Tags: {projectObject12.Tags.toString()}<br/> */}
                  </div>
                  <a className='ProjectViewButton' href={projectObject12.Link} target='_blank'>View Project</a>
                </div>
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
