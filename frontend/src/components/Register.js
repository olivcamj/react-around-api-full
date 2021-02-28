import React from "react";
import { Link } from "react-router-dom";
import Header from './Header.js';

const Register = ({ onSubmit, email, setEmail, password, setPassword }) => {
 const handleEmail = (e) => {
    setEmail(e.target.value);
  }
  const handlePassword = (e) => { 
    setPassword(e.target.value);
  }
  return (
    <>
      <Header text='Log in' link='/signin' />
      <form
        id="form"
        action="#"
        className="form login"
        onSubmit={onSubmit}
      >
        <div className="form__content">
          <h3 className="form__heading form__heading_theme_dark">Sign Up</h3>
          <label htmlFor="email" className="form__label">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleEmail}
              className="form__item form__item_theme_dark"
              placeholder="Email"
            />
            <span className="form__error"></span>
          </label>

          <label htmlFor="password" className="form__label">
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handlePassword}
              className="form__item form__item_theme_dark"
              placeholder="Password"
            />
            <span className="form__error"></span>
          </label>
          <div className="form__footer">
            <button type="submit" className="form__btn form__btn_theme_dark">
              Sign up
            </button>
            <div className="form__link-container">
              <span>Already a member?</span>
              <Link to="signin" className="form__link">
                Log in here!
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Register;
