import React from "react";
import { withRouter } from "react-router-dom";
import Button from "./../Button/Button";
import './Profile.css';
import { NavLink } from "react-router-dom";

import Header from "./../Header/Header";

function Profile(props) {
  const [userEmail, setUserEmail] = React.useState("");
  const [userName, setuserName] = React.useState("");

  const handleChange = (e) => {
    const input = e.target;
    if (input.name === "userName") {
      setuserName(input.value);
    } else if (input.name === "userEmail") {
      setUserEmail(input.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // props.autorize(userEmail, userPassword);    
  };

  const logout = (e) => {
    alert("logout")

    // props.autorize(userEmail, userPassword);    
  };

  return (
    <section className="profile__wrapper">
      <Header isLoggedIn={props.isLoggedIn} onBreadClick={props.onBreadClick}/>
      <div className="profile">      
      
        <p className="profile__welcome">Привет, Пользователь</p>
        
        <form onSubmit={handleSubmit} className="profile__form" name="profile">
          <section className="profile__section">
            <label className="profile__label" htmlFor="userName">Имя</label>
            <input
              className="profile__input"
              id="userName"
              name="userName"
              value={userEmail}
              onChange={handleChange}
              value={"Пользователь"}
            />
          </section>

          <section className="profile__section">
            <label className="profile__label" htmlFor="userEmail">Email</label>
            <input
              className="profile__input"
              id="userEmail"
              name="userEmail"
              value={userEmail}
              onChange={handleChange}
              value={"Пользовательский email"}
            />
          </section>

          <Button
            type="submit"
            className="button button_type_save-form button_type_edit-profile"
            buttonText="Войти"
          >Редактировать</Button>

          <div className="profile__profile">
            
            <p className="profile__link-paragraph">
              <NavLink to="/" className="profile__link" onClick={logout}>
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
