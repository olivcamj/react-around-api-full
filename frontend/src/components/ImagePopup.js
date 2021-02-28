import React from 'react'

function ImagePopup(props) {
    return (
      <div className={props.isOpen ? "modal modal_type_imgPopup modal_visible" : "modal modal_type_imgPopup"}>
        <div className="modal__content"> 
          <button className="modal__closeBtn" onClick={props.onCardClick}></button>
          <figure className="modal__figure">
          <img src={`${props.card.link}`} alt={props.card.name} className="modal__img" />

          <figcaption className="modal__caption">{props.card.name}</figcaption>
          </figure>
        </div>
      </div>
    )
}

export default ImagePopup;