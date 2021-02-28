import React from 'react'
import { Link, /*useHistory*/ } from "react-router-dom";
//import * as auth from "../utils/auth.js";
import Header from './Header.js'

const Login = ({ onLogin, email, setEmail, password, setPassword}) => {
  
  const handleEmail = (e) => {
    setEmail(e.target.value);
  }
  const handlePassword = (e) => { 
    setPassword(e.target.value);
  }

return (
  <>
    <Header text="Sign up" link="/register" />
    <form
      id="form"
      action="#"
      className="form login"
      onSubmit={onLogin} 
    >
      <div className="form__content">
        <h3 className="form__heading form__heading_theme_dark">Log in</h3>
        <label htmlFor="email" className="form__label">
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleEmail}
            className="form__item form__item_theme_dark"
            placeholder="Email"
            required
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
            required
          />
          <span className="form__error"></span>
        </label>
        <div className="form__footer">
          <button type="submit" className="form__btn form__btn_theme_dark">
            Log in
          </button>
          <div className="form__link-container">
            <span>Not a member yet?</span>
            <Link to="register" className="form__link">
              Sign up here!
            </Link>
          </div>
        </div>
      </div>
    </form>
  </>
);
}

export default Login;