import React from "react";
import { withRouter, NavLink } from "react-router-dom";

import SiteLogo from "./../SiteLogo/SiteLogo";
import Button from "./../Button/Button";
import './Register.css';

import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function Register(props) {

  const { values, handleChange, errors, isValid } = useFormWithValidation();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    props.register(values["register-form-user-email"], values["register-form-user-password"], values["register-form-user-name"]);
  };

  return (
    <div className="register">
      <SiteLogo className="register__logo"/>
      <p className="register__welcome">Добро пожаловать!</p>

      <form onSubmit={handleSubmit} className="register__form" name="register" noValidate>
        
        <section className="form__section">
          <label className="register__label" htmlFor="register-form-user-name">Имя</label>
          <input
            className={`register__input ${errors["register-form-user-name"] ? "form__input_type_error" : ""}`}
            id="register-form-user-name"
            name="register-form-user-name"
            value={values["register-form-user-name"] || ""}
            onChange={handleChange}
            required
            minLength="2"
            maxLength="30"
            type="text"
          />
          <span className={`form__span-error ${errors["register-form-user-name"] ? "form__span-error_active" : ""}`}>{errors["register-form-user-name"]}</span>
        </section>
        
        <section className="form__section">
          <label className="register__label" htmlFor="register-form-user-email">Email</label>
          <input
            className={`register__input ${errors["register-form-user-email"] ? "form__input_type_error" : ""}`}
            id="register-form-user-email"
            name="register-form-user-email"
            value={values["register-form-user-email"] || ""}
            onChange={handleChange}
            required
            minLength="2"            
          />
          <span className={`form__span-error ${errors["register-form-user-email"] ? "form__span-error_active" : ""}`}>{errors["register-form-user-email"]}</span>
        </section>

        <section className="form__section">
          <label className="register__label" htmlFor="register-form-user-password">Password</label>
          <input
            className={`register__input ${errors["user-password"] ? "form__input_type_error" : ""}`}
            id="register-form-user-password"
            name="register-form-user-password"
            value={values["register-form-user-password"] || ""}
            onChange={handleChange}
            type="password"
            required
            minLength="2"
          />
          <span className={`form__span-error ${errors["register-form-user-password"] ? "form__span-error_active" : ""}`}>{errors["register-form-user-password"]}</span>
        </section>

        <Button
          type="submit"
          className={`button button_type_save-form button_type_register ${isValid ? "" : "button_inactive"}`}
          buttonText="Войти"
          disabled={!isValid}>
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
