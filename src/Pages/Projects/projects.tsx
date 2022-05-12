import React from 'react';
import Footer from '../../Components/Footer/footer';
import ProjectsBackgroundBanner from '../../Components/Projects/ProjectsBackgroundBanner/projectsBackgroundBanner';
import ProjectsCTABanner from '../../Components/Projects/ProjectsCTABanner/projectsCTABanner';
import ProjectsFeed from '../../Components/Projects/ProjectsFeed/projectsFeed';


function Projects() {
  return (
    <div>
      <ProjectsBackgroundBanner/>
      <ProjectsFeed/>
      <ProjectsCTABanner/>
      <Footer/>
    </div>
  );
}

export default Projects;
