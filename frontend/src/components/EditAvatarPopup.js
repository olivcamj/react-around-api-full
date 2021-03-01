import {useRef} from 'react';  
import PopupWithForm from './PopupWithForm';


function EditAvatarPopup(props) {
  const avatarRef = useRef('');

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({ avatar: avatarRef }); 
  }

  return (
    <PopupWithForm
      name="setAvatar"
      title="Change profile picture"
      buttonText="Save"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__label">
        <input
          ref={avatarRef}
          id="avatar"
          type="url"
          name="avatar"
          className="form__item form__item_el_url"
          placeholder="Image-link"
          required
        />
        <span className="form__error"></span>
      </label>
    </PopupWithForm>
    );
}

export default EditAvatarPopup;