import { Children } from "../types/children";
import { Style } from "../types/style";

const Header = (args: { style: Style; children: Children }) => {
  const { style, children } = args;
  return <h1 style={style}>{children}</h1>;
};

export default Header;
