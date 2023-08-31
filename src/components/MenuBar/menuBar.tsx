import { ReactNode } from 'react';
import './menuBar.css';
import { Link } from 'react-router-dom';

const MenuLink = (args: {to: string, text: string}) => {
  const { text, to } = args;
  return (
    <Link className="menuLink" to={to}>
      {text}
    </Link>
  );
}

const MenuOption = (children: JSX.Element) => {
  return (
    <li className="menuOption">
      {children}
    </li>
  );
}

const MenuBar = () => {
  return (
    <div className="MenuBar">
      <ul className="menuList">
        <li className="menuOption">
          <a
            className="menuLink"
            target="_blank"
            href="https://drive.google.com/file/d/1rp3GLqFUwAsSeffmqyEWwXglfdXdLDXM/view?usp=sharing" rel="noreferrer"
          >
            Victor's Resume
          </a>
        </li>
        <li className="menuOption">
          <MenuLink to={'/Vaporjawn'} text={'Vaporjawn'} />
        </li>
        <li className="menuOption">
          <MenuLink to={'/Temple'} text={'Temple'} />
        </li>
        <li className="menuOption">
          <MenuLink to={'/'} text={'Home'} />
        </li>
        <li className="menuOption">
          <MenuLink to={'/Projects'} text={'Projects'} />
        </li>
        <li className="menuOption">
          <MenuLink to={'/Hackathons'} text={'Hackathons'} />
        </li>
        <li className="menuOption">
          <MenuLink to={'/SSBM'} text={'SSBM'} />
        </li>
        <li className="menuOption">
          <MenuLink to={'/20XX'} text={'20XX'} />
        </li>
      </ul>
    </div>
  );
}

export default MenuBar;
