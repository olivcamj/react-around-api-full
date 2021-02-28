import React from 'react'
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext)
    
  const [name, setName] = React.useState('');
  const [title, setTitle] = React.useState('');

  // After loading the current user from the API
  // their data will be used in managed components.
  React.useEffect(() => {
    setName((currentUser && currentUser.name) || "");
    setTitle((currentUser && currentUser.about) || '');
  }, [currentUser]); 


  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Pass the values of the managed components to the external handler
    props.onUpdateUser({
        name, 
        about: title
    });
    }
    
  return (
    <PopupWithForm
    name="editProfile"
    title="Edit Profile"
    buttonText="Save"
    isOpen={props.isOpen}
    onClose={props.onClose}
    onSubmit={handleSubmit}
    >
      <fieldset className="form__input-container">
        <label className="form__label">
          <input
            id="profile-name"
            onChange={handleNameChange}
            value={name}
            type="text"
            name="name"
            className="form__item form__item_el_name"
            placeholder="Name"
            minLength="2"
            maxLength="40"
            required
          />
          <span id="profile-name-error" className="form__error"></span>
        </label>
        <label className="form__label">
          <input
            id="profile-text"
            type="text"
            name="title"
            onChange={handleTitleChange}
            value={title}
            className="form__item form__item_el_occupation"
            placeholder="Who are you"
            minLength="2"
            maxLength="200"
            required
          />
          <span id="profile-text-error" className="form__error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditProfilePopup;