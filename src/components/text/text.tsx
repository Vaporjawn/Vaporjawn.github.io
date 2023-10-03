import { Children } from "../types/children";
import { Style } from "../types/style";

const P = (args: { style: Style; children: Children }) => {
  const { style, children } = args;
  return <p style={style}>{children}</p>;
};

export default P;
