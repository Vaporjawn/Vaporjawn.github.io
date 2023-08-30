import MenuBar from '../../MenuBar/menuBar';
import TempleHeader from '../TempleHeader/templeHeader';
import './templeBackgroundBanner.css';

const TempleBackgroundBanner = () => {
  return (
    <div className="TempleBackgroundBanner">
      <MenuBar />
      <TempleHeader />
    </div>
  );
}

export default TempleBackgroundBanner;
