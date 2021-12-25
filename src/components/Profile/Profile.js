import React from "react";
import { withRouter, NavLink } from "react-router-dom";

import { CurrentUserContext } from "./../../contexts/CurrentUserContext";
import Header from "./../Header/Header";
import Button from "./../Button/Button";
import './Profile.css';

import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function Profile(props) {

  const currentUserContext = React.useContext(CurrentUserContext);
  
  const [userName, setUserName] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");  

  const [isUserDataChanged, setIsUserDataChanged] = React.useState(true);
  const [isSubmitButtonValid, submitButtonValid] = React.useState(false);

  const { values, handleChange, errors, isValid, customEditFormValidity } = useFormWithValidation();

  // в первый раз считываем значения из Контекста, потом - из измененных  
  const [userNameFirstChange, setUserNameFirstChange] = React.useState(false);
  const [userEmailFirstChange, setUserEmailFirstChange] = React.useState(false);  

  const handleChangeForm = (e) => {

    setIsUserDataChanged(true);

    const input = e.target;

    if (input.name === "profile-form-user-name") {
      setUserNameFirstChange(true);
      
      setUserName("");
      
    } else if (input.name === "profile-form-user-email") {
      setUserEmailFirstChange(true);
      
      setUserEmail("");
      
    }

    handleChange(e);
    submitButtonValid(customEditFormValidity(currentUserContext.name, currentUserContext.email, e));
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    props.editUser(values["profile-form-user-email"] || userEmail, values["profile-form-user-name"] || userName);
    setIsUserDataChanged(false);
  };

  React.useEffect(() => {

    if(currentUserContext.currentUserId){
      setUserName(currentUserContext.name);
      setUserEmail(currentUserContext.email);
    }
  }, [currentUserContext]);

  return (
    <section className="profile__wrapper">
      <Header isLoggedIn={props.isLoggedIn} onBreadClick={props.onBreadClick}/>
      <div className="profile">
      
        <p className="profile__welcome">Привет, {currentUserContext.name}</p>
        
        <form onSubmit={handleSubmit} className="profile__form" name="profile" noValidate>
          <section className="profile-form__section">
            <div className="profile__section">
              <label className="profile__label" htmlFor="profile-form-user-name">Имя</label>
              <input
                className={`profile__input ${errors["profile-form-user-name"] ? "profile-form__input_type_error" : ""}`}
                id="profile-form-user-name"
                name="profile-form-user-name"                
                value={userNameFirstChange ? userName || values["profile-form-user-name"] || "" :  currentUserContext.name}
                onChange={handleChangeForm}
                required
                minLength="2"
                maxLength="30"
                type="text"
                pattern="^[A-Za-zА-Яа-яЁё\s\-]+$"
                disabled={props.isProfileDataEditing}/>
            </div>
            <span className={`profile-form__span-error ${errors["profile-form-user-name"] ? "profile-form__span-error_active" : ""}`}>{errors["profile-form-user-name"]}</span>
          </section>

          <section className="profile-form__section">
            <div className="profile__section">
              <label className="profile__label" htmlFor="profile-form-user-email">Email</label>
              <input
                className={`profile__input ${errors["profile-form-user-email"] ? "profile-form__input_type_error" : ""}`}
                id="profile-form-user-email"
                name="profile-form-user-email"
                value={userEmailFirstChange ? userEmail || values["profile-form-user-email"] || "" : currentUserContext.email }
                onChange={handleChangeForm}
                required
                minLength="2"
                type="email"
                disabled={props.isProfileDataEditing}/>
            </div>
            <span className={`profile-form__span-error ${errors["profile-form-user-email"] ? "profile-form__span-error_active" : ""}`}>{errors["profile-form-user-email"]}</span>
          </section>

          <Button
            type="submit"
            className={`button button_type_save-form button_type_edit-profile ${isValid && isSubmitButtonValid && isUserDataChanged ? "" : "button_inactive"}`}
            disabled={!(isValid && isSubmitButtonValid && isUserDataChanged)}
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
