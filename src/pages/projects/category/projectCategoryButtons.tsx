import {
  faJava,
  faNodeJs,
  faPython,
  faReact,
} from "@fortawesome/free-brands-svg-icons";
import ProjectCategoryButton from "./components/projectCategoryButton";
import { ProjectCategory, ProjectCategoryEnum } from "./types/ProjectCategory";

const ProjectCategoryButtons = (args: {
  selectedCategory: ProjectCategory[];
  setSelectedCategory: React.Dispatch<React.SetStateAction<ProjectCategory[]>>;
}) => {
  const { selectedCategory, setSelectedCategory } = args;

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <ProjectCategoryButton
        icon={faReact}
        category={ProjectCategoryEnum.React}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <ProjectCategoryButton
        icon={faNodeJs}
        category={ProjectCategoryEnum.NodeJS}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <ProjectCategoryButton
        icon={faPython}
        category={ProjectCategoryEnum.Python}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <ProjectCategoryButton
        icon={faJava}
        category={ProjectCategoryEnum.Java}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  );
};

export default ProjectCategoryButtons;
