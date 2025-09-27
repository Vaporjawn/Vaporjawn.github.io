import { Link } from "react-router-dom";
import { MenuLinkProps } from "./types/menuLinkProps";

const MenuLink = (args: MenuLinkProps) => {
  const { text, to } = args;
  return (
    <Link className="menuLink" to={to}>
      {text}
    </Link>
  );
};

export default MenuLink;
