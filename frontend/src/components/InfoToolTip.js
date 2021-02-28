import React from 'react'
import Popup from './Popup.js';
import check from '../images/success.png';
import fail from '../images/fail.png';

const InfoToolTip = (props) => {
  return (
    <Popup isOpen={props.isOpen} onClose={props.onClose}>
      <div className="tool-tip">
        <img 
        className="tool-tip__img" 
        alt="status check" 
        src={props.toolTipStatus === 'success' ? check : fail}
        />
        <p className="tool-tip__text">
          {props.toolTipStatus === 'success'
          ? "Success! You have now been registered"
          : "Oops, something went wrong! Please try again."}
        </p>
      </div>
    </Popup>
  );
}

export default InfoToolTip
