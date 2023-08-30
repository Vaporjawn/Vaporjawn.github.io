import MenuBar from '../../MenuBar/menuBar';
import SmashHeader from '../SmashHeader/smashHeader';
import './smashBackgroundBanner.css';

const SmashBackgroundBanner = () => {
  return (
    <div className="PurpleDrops">
      <div className="SmashBackgroundBanner">
        <MenuBar />
        <SmashHeader />
      </div>
    </div>
  );
}

export default SmashBackgroundBanner;
