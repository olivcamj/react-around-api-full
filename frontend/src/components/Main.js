import React, {useContext} from "react";
import Card from "./Card.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Header from './Header.js';
import Footer from './Footer.js';

function Main(props) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <Header
        text={props.email}
        loggedIn={props.loggedIn}
        onSignOut={props.onSignOut}
      />

      <section className="profile section">
        <div className="profile__container">
          <div className="profile__avatar-container">
            <img
              src={currentUser && currentUser.avatar}
              alt="profile"
              className="profile__avatar"
            />
            <button
              aria-label="Edit-Avatar"
              type="button"
              className="profile__avatar-overlay"
              onClick={props.onEditAvatar}
            ></button>
          </div>

          <div className="profile__info">
            <h1 className="profile__heading">
              {currentUser && currentUser.name}
            </h1>
            <button
              aria-label="Edit"
              type="button"
              className="profile__editBtn"
              onClick={props.onEditProfile}
            ></button>
            <p className="profile__occupation">
              {currentUser && currentUser.about}
            </p>
          </div>
          <button
            aria-label="Add"
            type="button"
            className="profile__addBtn"
            onClick={props.onAddPlace}
          ></button>
        </div>
      </section>

      <section className="elements section">
        <ul className="elements__container">
          {props.cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                owner={card.owner}
                //currrentUserId={currentUser._id}
                onCardClick={props.onCardClick}
                onCardDelete={(card) => props.handleCardDelete(card)}
                onCardLike={() => {
                  props.handleCardLike(card);
                }}
              />
            );
          })}
        </ul>
      </section>
      <Footer />
    </main>
  );
}

export default Main;
