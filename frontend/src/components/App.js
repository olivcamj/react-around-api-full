import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ProtectedRoute from './ProtectedRoute.js';
import Login from './Login.js';
import Register from './Register.js'
import InfoToolTip from './InfoToolTip';
import api from '../utils/api.js';
import { getContent, register, authorize } from "../utils/auth.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [isImageOpen, setIsImageOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState("");
  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory({ forceRefresh: true });

  const token = localStorage.getItem("jwt");
  // InfoToolTip status
  const [isSuccessful, setIsSuccessful] = useState('');

  function handleUpdateUser({ name, about }) {
    if (token) {
      api
        .editUserInfo({ name, about }, token)
        .then((res) => {
          setCurrentUser(res);
        })
        .then(() => setIsEditProfilePopupOpen(false))
        .catch((err) => console.log(err));
    }
  }

  function handleUpdateAvatar({avatar}) {
      api
        .setUserAvatar(avatar.current.value, token)
        .then((res) => {
          setCurrentUser(res);
        })
        .then(() => setIsEditAvatarPopupOpen(false))
        .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit({ link, name }) {
    if (token) {
      api
        .addCard({ link, name }, token)
        .then((newCard) => {
          setCards([newCard, ...cards]);
        })
        .then(() => setIsAddPlacePopupOpen(false))
        .catch((err) => console.log(err));
    }
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImageOpen(false);
    setIsInfoToolTipOpen(false);
  }

  function handleCardClick(card) {
    setIsImageOpen(!isImageOpen);
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some((i) => i === currentUser._id);
      // Send a request to the API and getting the updated card data
      api
        .changeLikeStatus(card._id, !isLiked, token)
        .then((newCard) => {
          // Create a new array based on the existing one and putting a new card into it
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
          // Update the state
          setCards(newCards);
        })
        .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
      api
        .deleteCard(card._id, token)
        .then(() => {
          const arrayCopy = cards.filter((c) => c._id !== card._id);
          setCards(arrayCopy);
        })
        .catch((err) => console.log(err));
  }

  const handleInfoToolTip = (isSuccessful) => {
    setIsSuccessful(isSuccessful);
    setIsInfoToolTipOpen(true);
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  // Log user out
  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/signin");
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();

    if (!password || !email) {
      handleInfoToolTip("fail");
      return;
    }

    register(email, password)
      .then((res) => {
        if (!res || res.statusCode === 400) {
          handleInfoToolTip("fail");
          throw new Error("Bad Request");
        }
        handleInfoToolTip("success");
        return res;
      })
      .then(resetForm())
      .then((res) => {
        if (res.statusCode !== 400) {
          history.push("/signin");
        } else {
          console.log("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
      authorize(email, password)
        .then((res) => {
          if (!email || !password) {
            handleInfoToolTip('fail');
            throw new Error(
              "400 - one or more of the fields were not provided"
            );
          }  else if (!res) {
            handleInfoToolTip('fail');
            throw new Error("01 - the user with the specified email not found");
          }
          setLoggedIn(true);
        })
        .then(() => {
          history.push("/");
        })
        .catch((err) => console.log(err.message));
  };

  // Check if User has a token
  useEffect(() => {
    if (token) {
      getContent(token)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.email);
        })
        .then(() => history.push("/"))
        .catch((err) => console.log(err));
    }
  }, [history, token]);

  // Cards and User
  useEffect(() => {
    if (token) {
      api
        .getUserInfo(token)
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(err.message);
        });
      }
    api
      .getInitialCards(token)
      .then((res) => {
        setCards(
          res.map((card) => ({
            name: card.name,
            link: card.link,
            likes: card.likes,
            _id: card._id,
            owner: card.owner,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
    
  }, [token]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route path="/signin">
            <Login
              loggedIn={loggedIn}
              onLogin={handleLogin}
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
            />
            <InfoToolTip
              isOpen={isInfoToolTipOpen}
              onClose={closeAllPopups}
              toolTipStatus={isSuccessful}
              loggedIn={loggedIn}
            />
          </Route>
          <Route path="/register">
            <Register
              loggedIn={loggedIn}
              onSubmit={handleRegistrationSubmit}
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
            />
            <InfoToolTip
              isOpen={isInfoToolTipOpen}
              onClose={closeAllPopups}
              toolTipStatus={isSuccessful}
              loggedIn={loggedIn}
            />
          </Route>
          <ProtectedRoute
            path="/"
            component={Main}
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            selectedCard={selectedCard}
            onCardDelete={handleCardDelete}
            onCardLike={handleCardLike}
            handleCardLike={handleCardLike}
            handleCardDelete={handleCardDelete}
            loggedIn={loggedIn}
            email={email}
            onSignOut={handleSignOut}
          />
          <Route exact path="/*">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
      </div>

      <ImagePopup
        card={selectedCard}
        isOpen={isImageOpen}
        onCardClick={handleCardClick}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <PopupWithForm
        name="deleteCard"
        title="Are you sure?"
        buttonText="Yes"
        isOpen={
          false
        } /* place a variable here to change the state of delete card */
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
