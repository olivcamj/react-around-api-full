import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`modal modal_type_${props.name} ${
        props.isOpen ? "modal_visible" : ""
      }`}
    >
      <div className="modal__content">
        <button className="modal__closeBtn" onClick={props.onClose}></button>
        <form
          action="#"
          className={`form form__type_${props.name}`}
          name={props.name}
          noValidate
          onSubmit={props.onSubmit}
        >
          <div className="form__content">
            <h3 className="form__heading">{props.title}</h3>
            {props.children}
            <button type="submit" className="form__btn" onClick={props.onClose}>
              {props.buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
