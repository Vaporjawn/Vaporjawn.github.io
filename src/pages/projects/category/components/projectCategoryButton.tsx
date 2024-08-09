import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { VaporwaveBlue, VaporwavePurple } from "../../../../colors";
import AddOrRemoveCategory from "../functions/addOrRemoveCategory";
import { ProjectCategory } from "../types/ProjectCategory";

const ProjectCategoryButton = (args: {
  icon: IconDefinition;
  category: ProjectCategory;
  selectedCategory: ProjectCategory[];
  setSelectedCategory: React.Dispatch<React.SetStateAction<ProjectCategory[]>>;
}) => {
  const { category, selectedCategory, setSelectedCategory, icon } = args;
  return (
    <button
      className="category-button"
      onClick={() => {
        AddOrRemoveCategory({ category, selectedCategory, setSelectedCategory });
      }}
      style={{
        backgroundColor: selectedCategory.includes(category) ? VaporwaveBlue : "",
        borderColor: selectedCategory.includes(category) ? VaporwavePurple : "",
      }}
    >
      <FontAwesomeIcon icon={icon} />
      {" "}
      {category}
    </button>
  );
};

export default ProjectCategoryButton;