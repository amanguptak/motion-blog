
import PropTypes from 'prop-types';
import './sideimg.css';

const SideImg = ({ image }) => {
  return (
    <div className="side-img-container">
      <img src={image} alt="Side" className="side-img" />
    </div>
  );
};

SideImg.propTypes = {
  image: PropTypes.string.isRequired,
};

export default SideImg;
