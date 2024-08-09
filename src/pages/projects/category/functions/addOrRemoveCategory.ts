import { ProjectCategory } from "../types/ProjectCategory";

const AddOrRemoveCategory = (args: {category: ProjectCategory, selectedCategory: ProjectCategory[], setSelectedCategory: React.Dispatch<React.SetStateAction<ProjectCategory[]>>}) => {
  const { category, selectedCategory, setSelectedCategory } = args;
  if (selectedCategory.includes(category)) {
    setSelectedCategory(selectedCategory.filter((c) => c !== category));
  } else {
    setSelectedCategory([...selectedCategory, category]);
  }
};

export default AddOrRemoveCategory;