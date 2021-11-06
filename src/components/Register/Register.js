import React from "react";
import { withRouter, NavLink } from "react-router-dom";

import SiteLogo from "./../SiteLogo/SiteLogo";
import Button from "./../Button/Button";
import './Register.css';

function Register(props) {
  
  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const [userName, setUserName] = React.useState("");

  const handleChange = (e) => {
    const input = e.target;

    switch(input.name) {

      case "userEmail":
        setUserEmail(input.value);
        break;
    
      case "userPassword":
        setUserPassword(input.value);
        break;
    
      case "userName":
        setUserName(input.value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.register(userEmail, userPassword, userName);
  };

  return (
    <div className="register">
      <SiteLogo className="register__logo"/>
      <p className="register__welcome">Добро пожаловать!</p>

      <form onSubmit={handleSubmit} className="register__form" name="register">
        
        <section className="register__section">
          <label className="register__label" htmlFor="userName">Имя</label>
          <input
            className="register__input"
            id="userName"
            name="userName"
            value={userName}
            onChange={handleChange}
          />
        </section>
        
        <section className="register__section">
          <label className="register__label" htmlFor="userEmail">Email</label>
          <input
            className="register__input"
            id="userEmail"
            name="userEmail"
            value={userEmail}
            onChange={handleChange}
          />
        </section>

        <section className="register__section">
          <label className="register__label" htmlFor="userPassword">Password</label>
          <input
            className="register__input"
            id="userPassword"
            name="userPassword"
            value={userPassword}
            onChange={handleChange}
            type="password"
          />
        </section>

        <Button
          type="submit"
          className="button button_type_save-form button_type_register"
          buttonText="Войти">
            Зарегистрироваться
        </Button>

        <div className="register__register">
          <p className="register__not-register">
            Уже зарегистрированы?
          </p>
          <p className="register__link-paragraph">
            <NavLink to="/signin" className="register__link" activeClassName="active_common-link">
              Войти
            </NavLink>
          </p>
        </div>

      </form>
    </div>
  );
}

export default withRouter(Register);
