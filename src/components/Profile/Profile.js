import React from "react";
import { withRouter, NavLink } from "react-router-dom";

import { CurrentUserContext } from "./../../contexts/CurrentUserContext";
import Header from "./../Header/Header";
import Button from "./../Button/Button";
import './Profile.css';

function Profile(props) {
  const currentUserContext = React.useContext(CurrentUserContext);

  const [changedUserEmail, setUserEmail] = React.useState(currentUserContext.email);
  const [changedUserName, setUserName] = React.useState(currentUserContext.name);

  const handleChange = (e) => {
    const input = e.target;
    if (input.name === "userName") {
      setUserName(input.value);
    } else if (input.name === "userEmail") {
      setUserEmail(input.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.editUser(changedUserEmail, changedUserName);
  };

  return (
    <section className="profile__wrapper">
      <Header isLoggedIn={props.isLoggedIn} onBreadClick={props.onBreadClick}/>
      <div className="profile">
      
        <p className="profile__welcome">Привет, {currentUserContext.name}</p>
        
        <form onSubmit={handleSubmit} className="profile__form" name="profile">
          <section className="profile__section">
            <label className="profile__label" htmlFor="userName">Имя</label>
            <input
              className="profile__input"
              id="userName"
              name="userName"
              onChange={handleChange}
              value={changedUserName}
            />
          </section>

          <section className="profile__section">
            <label className="profile__label" htmlFor="userEmail">Email</label>
            <input
              className="profile__input"
              id="userEmail"
              name="userEmail"
              value={changedUserEmail}
              onChange={handleChange}
            />
          </section>

          <Button
            type="submit"
            className="button button_type_save-form button_type_edit-profile"
            buttonText="Войти"
            >Редактировать</Button>

          <div className="profile__profile">
            
            <p className="profile__link-paragraph">
              <NavLink to="/" className="profile__link" onClick={props.logout}>
                Выйти из аккаунта
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default withRouter(Profile);
