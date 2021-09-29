import React from "react";
import { withRouter } from "react-router-dom";
import Button from "./../Button/Button";
import './Login.css';
import { NavLink } from "react-router-dom";

import SiteLogo from "./../SiteLogo/SiteLogo";

function Login(props) {
  const [userEmail, setuserName] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");

  const handleChange = (e) => {
    const input = e.target;
    if (input.name === "userName") {
      setuserName(input.value);
    } else if (input.name === "password") {
      setUserPassword(input.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // props.autorize(userEmail, userPassword);    
  };

  return (
    <div className="login">
      <SiteLogo className="login__logo"/>
      <p className="login__welcome">Рады видеть!</p>

      <form onSubmit={handleSubmit} className="login__form" name="login">
        <section className="login__section">
          <label className="login__label" htmlFor="userEmail">Email</label>
          <input
            className="login__input"
            id="userEmail"
            name="userEmail"
            value={userEmail}
            onChange={handleChange}
          />
        </section>

        <section className="login__section">
          <label className="login__label" htmlFor="password">Password</label>
          <input
            className="login__input"
            id="password"
            name="password"
            value={userPassword}
            onChange={handleChange}
            type="password"
          />
        </section>  

        <Button
          type="submit"
          className="button button_type_save-form button_type_login"
          buttonText="Войти"
        >Войти</Button>

        <div className="login__register">
          <p className="login__not-register">
            Ещё не зарегистрированы?
          </p>
          <p className="login__link-paragraph">
            <NavLink to="/signup" className="login__link" activeClassName="active_common-link">
              Регистрация
            </NavLink> 
          </p>
        </div>
      </form>
    </div>
  );
}

export default withRouter(Login);
