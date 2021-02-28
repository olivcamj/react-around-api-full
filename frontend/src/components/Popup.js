import React from 'react'

const Popup = (props) => {
  return (
    <div
      className={`modal ${
        props.isOpen ? "modal_visible" : ""
      }`}
    >
      <div className="modal__content">
        <button className="modal__closeBtn" onClick={props.onClose}></button>
        {props.children}
      </div>
    </div>
  );
}

export default Popup
