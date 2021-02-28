export const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
        name: "Vanois National Park",
        link: "https://code.s3.yandex.net/web-code/vanois.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
  ];


export const defaultConfig = {
    inputSelector: '.form__item',
    submitButtonSelector: '.form__btn',
    inactiveButtonClass: 'form__btn_disabled',
    inputErrorClass: 'form__item_type_error',
    errorClass: 'form__error'
  }; 


// Wrappers
export const editProfileModalWindow = document.querySelector('.modal_type_editProfile');
export const addCardModalWindow = document.querySelector('.modal_type_addCard');
export const openImgModalWindow = document.querySelector('.modal_type_imgPopup');
export const deleteCardModalWindow = document.querySelector('.modal_type_deleteCard');
export const setUserAvatarModalWindow = document.querySelector('.modal_type_setAvatar');
// Buttons and other DOM elements
export const profileEditBtn = document.querySelector('.profile__editBtn');
export const addBtn = document.querySelector('.profile__addBtn');
export const setAvatarBtn = document.querySelector('.profile__avatar-overlay');
export const addCardCloseBtn = addCardModalWindow.querySelector('.modal__closeBtn');

// Form data 
export const inputName = document.querySelector('.form__item_el_name');
export const inputOccupation = document.querySelector('.form__item_el_occupation');
//add new card data
export const addName = document.querySelector('.form__item_el_title');
export const addUrl = document.querySelector('.form__item_el_url');
export const cardTemplateSelector = '.card-template';
export const list = document.querySelector('.elements__container');
export const avatar = document.querySelector('.profile__avatar');
export const addCardForm = document.querySelector('.form__type_add');
export const editProfileForm = document.querySelector('.form__type_edit');