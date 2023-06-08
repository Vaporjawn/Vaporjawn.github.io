import React from 'react';
import Footer from '../../../../src/components/Footer/footer';
import ProjectsBackgroundBanner from '../../../../src/components/Projects/ProjectsBackgroundBanner/projectsBackgroundBanner';
import ProjectsCTABanner from '../../../../src/components/Projects/ProjectsCTABanner/projectsCTABanner';
import ProjectsFeed from '../../../../src/components/Projects/ProjectsFeed/projectsFeed';


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
