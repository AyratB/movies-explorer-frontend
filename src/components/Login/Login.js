import React from "react";
import { withRouter, NavLink } from "react-router-dom";
import Button from "./../Button/Button";
import './Login.css';
import SiteLogo from "./../SiteLogo/SiteLogo";

import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function Login(props) {

  const { values, handleChange, errors, isValid } = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.autorize(values["login-form-user-email"], values["login-form-user-password"]);
  };

  return (
    <div className="login">
      <SiteLogo className="login__logo"/>
      <p className="login__welcome">Рады видеть!</p>

      <form onSubmit={handleSubmit} className="login__form" name="login" noValidate>
        <section className="login__section">
          <label className="login__label" htmlFor="login-form-user-email">Email</label>
          <input
            className={`login__input ${errors["login-form-user-email"] ? "login-form__input_type_error" : ""}`}
            id="login-form-user-email"
            name="login-form-user-email"
            value={values["login-form-user-email"] || ""}
            onChange={handleChange}
            required
            minLength="4"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"/>
          <span className={`login-form__span-error ${errors["login-form-user-email"] ? "login-form__span-error_active" : ""}`}>{errors["login-form-user-email"]}</span>
        </section>

        <section className="login__section">
          <label className="login__label" htmlFor="login-form-user-password">Password</label>
          <input
            className={`login__input ${errors["login-form-user-password"] ? "login-form__input_type_error" : ""}`}
            id="login-form-user-password"
            name="login-form-user-password"
            value={values["login-form-user-password"] || ""}
            onChange={handleChange}
            type="password"
            required
            minLength="2"/>
          <span className={`login-form__span-error ${errors["login-form-user-password"] ? "login-form__span-error_active" : ""}`}>
            {errors["login-form-user-password"]}
          </span>
        </section>

        <Button
          type="submit"
          className={`button button_type_save-form button_type_login ${isValid ? "" : "button_inactive"}`}
          buttonText="Войти"
          disabled={!isValid}
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
