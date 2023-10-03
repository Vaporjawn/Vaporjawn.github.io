import ListItem from "../listItem/listItem";
import AngelListListItem from "./components/listItems/angelListListItem";
import FacebookListItem from "./components/listItems/facebookListItem";
import GitHubListItem from "./components/listItems/gitHubListItem";
import InstagramListItem from "./components/listItems/instagramListItem";
import LinkedInListItem from "./components/listItems/linkedInListItem";
import SteamListItem from "./components/listItems/steamListItem";
import TwitchListItem from "./components/listItems/twitchListItem";
import TwitterListItem from "./components/listItems/twitterListItem";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <ul className="icons">
          <GitHubListItem />
          <TwitterListItem />
          <InstagramListItem />
          <FacebookListItem />
          <TwitchListItem />
          <SteamListItem />
          <AngelListListItem />
          <LinkedInListItem />
        </ul>
        <ul className="copyright">
          <ListItem>© Vaporjawn</ListItem>
          <ListItem>
            Design: <a href="http://github.com/vaporjawn/">Github</a>
          </ListItem>
        </ul>
      </footer>
    </>
  );
};

export default Footer;
