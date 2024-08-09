export enum ProjectCategoryEnum {
  React = "React",
  Node = "Node.js",
  Python = "Python",
  Java = "Java",
}
export type ProjectCategory = keyof typeof ProjectCategoryEnum;

const ProjectCategoryButtons = () => {
  return (
    <div style={{
      display: "flex",
      gap: "1rem",
      justifyContent: "center",
      marginTop: "20px",
    }}>
      <button>{ProjectCategoryEnum.React}</button>
      <button>{ProjectCategoryEnum.Node}</button>
      <button>{ProjectCategoryEnum.Python}</button>
      <button>{ProjectCategoryEnum.Java}</button>
    </div>
  );
};

const ProjectsPage = () => {
  return (
    <div>
      <h1 style={{ textDecoration: "underline", textAlign: "left"}}>Projects</h1>
      <p>A curated collection of projects showcasing my engineering journey.</p>
      <ProjectCategoryButtons />
    </div>
  );
};

export default ProjectsPage;