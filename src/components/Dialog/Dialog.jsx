
import PropTypes from 'prop-types';
import { FaExclamationTriangle } from 'react-icons/fa';
import './customDialog.css';

const CustomDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="dialogOverlay">
      <div className="dialogBox">
        <FaExclamationTriangle className="warningIcon" />
       <div className='message'>
       <h2>Warning</h2>
       <p>{message}</p>
       </div>
        <div className="dialogButtons">
          <button className="cancelButton" onClick={onCancel}>
            Cancel
          </button>
          <button className="deleteButton" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

CustomDialog.propTypes = {
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default CustomDialog;
