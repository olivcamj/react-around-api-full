import React from 'react'
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
	const [link, setLink] = React.useState("");

	function handleCardName(e) {
		setName(e.target.value);
	  }
	  
  function handleCardLink(e) {
      setLink(e.target.value);
  }

  function handleSubmit(e) {
      e.preventDefault();
      props.onAddPlace({
          name,
          link
      });
  }
      
  return (
    <PopupWithForm
      name="addCard"
      title="Add Place"
      buttonText="Create"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >

      <fieldset className="form__input-container">
        <label className="form__label">
          <input
            id="card-title"
            type="text"
            name="name"
            onChange={handleCardName}
            value={name}
            className="form__item form__item_el_title"
            placeholder="Title"
            minLength="1"
            maxLength="30"
            required
          />
          <span id="card-title-error" className="form__error"></span>
        </label>
        <label className="form__label">
          <input
            id="card-url"
            type="url"
            name="link"
            onChange={handleCardLink}
            value={link}
            className="form__item form__item_el_url"
            placeholder="Image-link"
            required
          />
          <span id="card-url-error" className="form__error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  )
}

export default AddPlacePopup;