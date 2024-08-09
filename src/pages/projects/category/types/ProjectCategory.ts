export enum ProjectCategoryEnum {
  React = "React",
  NodeJS = "NodeJS",
  Python = "Python",
  Java = "Java",
}
export type ProjectCategory = keyof typeof ProjectCategoryEnum;
