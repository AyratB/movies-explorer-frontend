import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import Main from "./../Main/Main.js";
import BreadCrumbsPopup from "./../BreadCrumbsPopup/BreadCrumbsPopup.js";
import InfoTooltip from "./../InfoTooltip/InfoTooltip.js";
import ProtectedRoute from "./../ProtectedRoute/ProtectedRoute.js";
import Movies from "./../Movies/Movies.js";
import Login from "./../Login/Login.js";
import Register from "./../Register/Register.js";
import PageNotFound from "./../PageNotFound/PageNotFound.js";
import Profile from "./../Profile/Profile.js";

import { fakeMovieData, savedFakeMovieData } from "./../../utils/constants.js";

import { CurrentUserContext } from "./../../contexts/CurrentUserContext";

import './App.css';

import * as mainApi from "./../../utils/MainApi";

function App() {

  const history = useHistory();

  const [isBreadCrumbsPopupOpened, setIsBreadCrumbsPopupOpened] = React.useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = React.useState(false);  

  // Данные для информационного попапа
  const [popupMessage, setPopupMessage] = React.useState("");
  const [isTooltipMistake, setIsTooltipMistake] = React.useState(false);

  // открытие попапов
  const handleBreadCrumbsPopupClick = () => setIsBreadCrumbsPopupOpened(true);
  const handleTooltipPopup = (setOpen, message, isMistake) => {
    setPopupMessage(message);
    setIsTooltipPopupOpen(setOpen);
    setIsTooltipMistake(isMistake);
  };
  // открытие попапов
  
  const closeAllPopups = () => {
    if (isBreadCrumbsPopupOpened) setIsBreadCrumbsPopupOpened(false);    
    if (isTooltipPopupOpen) {
      setIsTooltipPopupOpen(false);
      setIsTooltipMistake(false);
    }   
  };

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  
  const register = (userEmail, userPassword, userName) => {
    mainApi
      .register(userEmail, userPassword, userName)
      .then((res) => {
        handleTooltipPopup(true, "Вы успешно зарегистрировались!", false);        
        history.push("/signin");
      })
      .catch((err) => {
        handleTooltipPopup(
          true,
          "Что-то пошло не так! Попробуйте ещё раз!",
          true
        );
      });
  }

  const [currentUser, setCurrentState] = React.useState({
    name: "",
    email: "",    
    currentUserId: "",
  });

  const handleSuccessLogin = (token) => {    
    setIsLoggedIn(true);
    localStorage.setItem("token", token);
  }

  const autorize = (userEmail, userPassword) => {
    mainApi
      .authorize(userEmail, userPassword)
      .then((data) => {
        if (data.token) {
          handleSuccessLogin(data.token, userEmail);
          history.push("/");
        }
      })
      .catch((errorStatus) => {
        handleTooltipPopup(
          true,
          errorStatus === 401
            ? "Пользователь с email не найден! Пройдите регистрацию"
            : errorStatus === 400
              ? "Не передано одно из полей. Заполните оба поля"
              : "Что-то пошло не так",
          true
        );
      });
  }

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    history.push("/signin");
  }
  
  // проверка на наличие токена и пройденный логин
  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      mainApi
        .getUserInfo(token)
        .then((res) => {

          setCurrentState({
            name: res.data.name,
            email: res.data.email,
            currentUserId: res.data._id,
          });

          setIsLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          handleTooltipPopup(true, "Недействительный токен JWT", true);

          localStorage.removeItem("token");
          setIsLoggedIn(false);

          history.push("/signin");
        });
    }
  }, []);

  //инициализация данных
  React.useEffect(() => {

    if (isLoggedIn){

      const token = localStorage.getItem("token");
      if(token){
        // setExternalFullMovieData(fakeMovieData.slice(0, fakeMovieData.length));
        // setSavedFullMovieData(savedFakeMovieData.slice(0, savedFakeMovieData.length));

        //при первом обращении скачиваем все фильмы один раз

        // Promise.all([api.getUserInfo(), api.getInitialCards()])
        Promise.all([mainApi.getUserInfo()])
        // .then(([user, cardsData]) => {
        .then(([user]) => {

        setCurrentState({
          name: user.data.name,
          email: user.data.email,
          currentUserId: user.data._id,
        });

        // setCards(cardsData);
      })
      .catch((err) => console.log(err));
      }
      else{
        setIsLoggedIn(false);
        history.push("/signin");
      }
    }    
  }, [isLoggedIn]);

  function editUser(userEmail, userName) {
    if(userEmail === "" || userName === ""){
      handleTooltipPopup(
        true,
        "Имя или email не могут быть пустыми",
        true
      );
    } else if(currentUser.email === userEmail && currentUser.name === userName){
      handleTooltipPopup(
        true,
        "Имя и email остались без изменений!",
        true
      );
    } else {
      mainApi
        .updateUserData(userEmail, userName)
        .then((res) => {

          setCurrentState({
            ...currentUser,
            name: res.data.name,
            email: res.data.email,
          });
        })
        .catch((err) => {
          handleTooltipPopup(
            true,
            "Что-то пошло не так! Попробуйте ещё раз!",
            true
          );
        });
    }
  }


  
  
  
  
  // Данные для информационного попапа 

  const [externalFullMovieData, setExternalFullMovieData] = React.useState([]); //исходные данные из внешнего источника
  const [externalFilteredMovieData, setExternalFilteredMovieData] = React.useState([]); //исходные данные из внешнего источника

  //сортированные
  const [savedFullMovieData, setSavedFullMovieData] = React.useState([]); //исходные данные по сохраненным фильмам
  const [savedFilteredMovieData, setSavedFilteredMovieData] = React.useState([]); //исходные данные по сохраненным фильмам


  

  

  

  

  

  

  const extrenalMoviesSearchHandler = (searchParam, isShort) => {
    setExternalFilteredMovieData(externalFullMovieData.filter(movie => movie.nameRU.includes(searchParam)));
  }

  const savedMoviesSearchHandler = (searchParam, isShort) => {
    setSavedFilteredMovieData(savedFullMovieData.filter(movie => movie.nameRU.includes(searchParam))); 
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app__page">
        <div className="app__container">

          <Switch>
            <Route exact path="/">
              <Main isLoggedIn={isLoggedIn} onBreadClick={handleBreadCrumbsPopupClick}/>
            </Route>

            <Route path="/signup">
              <Register register={register} />
            </Route>

            <Route path="/signin">
              <Login autorize={autorize} />
            </Route>

            <ProtectedRoute
              expract path="/movies"
              isLoggedIn={isLoggedIn}
              // movieCardsData={externalFilteredMovieData}
              onBreadClick={handleBreadCrumbsPopupClick}
              movieCardsData={fakeMovieData}
              isSavedMovies={false}
              handleSearchRequest={extrenalMoviesSearchHandler}
              component={Movies}
            />

            <ProtectedRoute
              expract path="/saved-movies"
              isLoggedIn={isLoggedIn}
              // movieCardsData={externalFilteredMovieData}
              onBreadClick={handleBreadCrumbsPopupClick}
              movieCardsData={savedFakeMovieData}
              isSavedMovies={true}
              handleSearchRequest={savedMoviesSearchHandler}
              component={Movies}
            />

            <ProtectedRoute
              expract path="/profile"
              logout={logout}
              editUser={editUser}
              isLoggedIn={isLoggedIn}
              onBreadClick={handleBreadCrumbsPopupClick}
              component={Profile} 
            />

            <Route path="*">
              <PageNotFound/>
            </Route>

          </Switch>

          <BreadCrumbsPopup isOpened={isBreadCrumbsPopupOpened} onClose={closeAllPopups} className="common-links_type_popup"/>

          <InfoTooltip isOpen={isTooltipPopupOpen} message={popupMessage} onClose={closeAllPopups} isTooltipMistake={isTooltipMistake}/>
        
        </div>
      </div>
    </CurrentUserContext.Provider>    
  );
}

export default App;
