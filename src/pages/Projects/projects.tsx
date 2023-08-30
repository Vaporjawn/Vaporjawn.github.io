import Footer from '../../components/Footer/footer';
import ProjectsBackgroundBanner from '../../components/Projects/ProjectsBackgroundBanner/projectsBackgroundBanner';
import ProjectsCTABanner from '../../components/Projects/ProjectsCTABanner/projectsCTABanner';
import ProjectsFeed from '../../components/Projects/ProjectsFeed/projectsFeed';

const Projects = () => {
  return (
    <div>
      <ProjectsBackgroundBanner />
      <ProjectsFeed />
      <ProjectsCTABanner />
      <Footer />
    </div>
  );
}

export default Projects;
