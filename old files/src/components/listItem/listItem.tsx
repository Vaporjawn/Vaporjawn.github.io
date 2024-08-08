import { Children } from "../types/children";
import { Style } from "../types/style";

const ListItem = (args: { style?: Style; children: Children }) => {
  const { style, children } = args;
  return <li style={style}>{children}</li>;
};

export default ListItem;
