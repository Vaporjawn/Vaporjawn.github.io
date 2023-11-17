import MenuLink from "../menuLink/menuLink";
import MenuOption from "../menuOption/menuOption";

export const MenuList = () => {
  return (
    <ul className="menuList">
      <li className="menuOption">
        <a
          className="menuLink"
          target="_blank"
          href="https://drive.google.com/file/d/1rp3GLqFUwAsSeffmqyEWwXglfdXdLDXM/view?usp=sharing"
          rel="noreferrer"
        >
          Victor's Resume
        </a>
      </li>
      <MenuOption>
        <MenuLink to={"/Vaporjawn"} text={"Vaporjawn"} />
      </MenuOption>
      <MenuOption>
        <MenuLink to={"/Temple"} text={"Temple"} />
      </MenuOption>
      <MenuOption>
        <MenuLink to={"/"} text={"Home"} />
      </MenuOption>
      <MenuOption>
        <MenuLink to={"/Projects"} text={"Projects"} />
      </MenuOption>
      <MenuOption>
        <MenuLink to={"/Hackathons"} text={"Hackathons"} />
      </MenuOption>
      <MenuOption>
        <MenuLink to={"/SSBM"} text={"SSBM"} />
      </MenuOption>
      <MenuOption>
        <MenuLink to={"/20XX"} text={"20XX"} />
      </MenuOption>
    </ul>
  );
};
