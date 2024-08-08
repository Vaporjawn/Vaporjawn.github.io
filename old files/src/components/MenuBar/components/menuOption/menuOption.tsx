import { MenuOptionProps } from "./types/menuOptionProps";

const MenuOption = (args: MenuOptionProps) => {
  const { children } = args;
  return <li className="menuOption">{children}</li>;
};

export default MenuOption;
