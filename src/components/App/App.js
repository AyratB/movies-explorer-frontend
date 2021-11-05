import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import Main from "./../Main/Main.js";
import BreadCrumbsPopup from "./../BreadCrumbsPopup/BreadCrumbsPopup.js";
import ProtectedRoute from "./../ProtectedRoute/ProtectedRoute.js";
import Movies from "./../Movies/Movies.js";
import Login from "./../Login/Login.js";
import Register from "./../Register/Register.js";
import PageNotFound from "./../PageNotFound/PageNotFound.js";
import Profile from "./../Profile/Profile.js";

import { fakeMovieData, savedFakeMovieData } from "./../../utils/constants.js";

import { CurrentUserContext } from "./../../contexts/CurrentUserContext";

import './App.css';

function App() {

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  // const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isBreadCrumbsPopupOpened, setIsBreadCrumbsPopupOpened] = React.useState(false);

  const handleBreadCrumbsPopupClick = () => setIsBreadCrumbsPopupOpened(true);
  
  const closeAllPopups = () => {
    if (isBreadCrumbsPopupOpened) setIsBreadCrumbsPopupOpened(false);    
  };

  const [externalFullMovieData, setExternalFullMovieData] = React.useState([]); //исходные данные из внешнего источника
  const [externalFilteredMovieData, setExternalFilteredMovieData] = React.useState([]); //исходные данные из внешнего источника

  //сортированные
  const [savedFullMovieData, setSavedFullMovieData] = React.useState([]); //исходные данные по сохраненным фильмам
  const [savedFilteredMovieData, setSavedFilteredMovieData] = React.useState([]); //исходные данные по сохраненным фильмам

  //инициализация данных вначале
  React.useEffect(() => {
    // if (isLoggedIn){
    if (true){

      setExternalFullMovieData(fakeMovieData.slice(0, fakeMovieData.length));
      setSavedFullMovieData(savedFakeMovieData.slice(0, savedFakeMovieData.length));

      //при первом обращении скачиваем все фильмы один раз

      // Promise.all([api.getUserInfo(), api.getInitialCards()])
      // .then(([user, cardsData]) => {
      //   setCurrentState({
      //     name: user.name,
      //     about: user.about,
      //     avatar: user.avatar,
      //     currentUserId: user._id,
      //   });

      //   setCards(cardsData);
      // })
      // .catch((err) => console.log(err));
    }    
  }, [isLoggedIn]); 

  function autorize(userEmail, userPassword) {
    // auth
    //   .authorize(userEmail, userPassword)
    //   .then((data) => {        
    //     if (data.token) {
    //       handleLogin(data.token, userEmail);
    //       history.push("/");
    //     }
    //   })
    //   .catch((errorStatus) => {
    //     handleTooltipPopup(
    //       true,
    //       errorStatus === 401
    //         ? "Пользователь с email не найден! Пройдите регистрацию"
    //         : errorStatus === 400
    //         ? "Не передано одно из полей. Заполните оба поля"
    //         : "Что-то пошло не так",
    //       true
    //     );
    //   });
  }

  function register(userEmail, userPassword) {
    // auth
    //   .register(userEmail, userPassword)
    //   .then((res) => {
    //     handleTooltipPopup(true, "Вы успешно зарегистрировались!", false);
    //     history.push("/signin");
    //   })
    //   .catch((err) => {
    //     handleTooltipPopup(
    //       true,
    //       "Что-то пошло не так! Попробуйте ещё раз.",
    //       true
    //     );
    //   });
  }

  function logout(userEmail, userPassword) {
    // auth
    //   .register(userEmail, userPassword)
    //   .then((res) => {
    //     handleTooltipPopup(true, "Вы успешно зарегистрировались!", false);
    //     history.push("/signin");
    //   })
    //   .catch((err) => {
    //     handleTooltipPopup(
    //       true,
    //       "Что-то пошло не так! Попробуйте ещё раз.",
    //       true
    //     );
    //   });
  }

  function editUser(userEmail, userPassword) {
    // auth
    //   .register(userEmail, userPassword)
    //   .then((res) => {
    //     handleTooltipPopup(true, "Вы успешно зарегистрировались!", false);
    //     history.push("/signin");
    //   })
    //   .catch((err) => {
    //     handleTooltipPopup(
    //       true,
    //       "Что-то пошло не так! Попробуйте ещё раз.",
    //       true
    //     );
    //   });
  }

  const extrenalMoviesSearchHandler = (searchParam, isShort) => {
    setExternalFilteredMovieData(externalFullMovieData.filter(movie => movie.nameRU.includes(searchParam)));
  }

  const savedMoviesSearchHandler = (searchParam, isShort) => {   
    setSavedFilteredMovieData(savedFullMovieData.filter(movie => movie.nameRU.includes(searchParam))); 
  }

  const [currentUser, setCurrentState] = React.useState({
    name: "Загрузка...",
    about: "Загрузка...",
    avatar: "",
    currentUserId: "",
  });

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app__page">
      <div className="app__container">

        <Switch>
          <Route exact path="/">
            <Main isLoggedIn={isLoggedIn} onBreadClick={handleBreadCrumbsPopupClick}/>
          </Route>

          <Route path="/signin">
            <Login autorize={autorize} />
          </Route>
  
          <Route path="/signup">
           <Register autorize={register} />
          </Route>

          {/* защищенные авторизацие маршруты */}

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

          <ProtectedRoute>
            expract path="/profile"
            <Profile 
              logout={logout} 
              editUser={editUser} 
              isLoggedIn={isLoggedIn} 
              onBreadClick={handleBreadCrumbsPopupClick}/>
          </ProtectedRoute>          

          <Route path="*">
           <PageNotFound/>
          </Route>   

        </Switch>  

      <BreadCrumbsPopup 
          isOpened={isBreadCrumbsPopupOpened}
          onClose={closeAllPopups}
          className="common-links_type_popup"/>
      </div>
    </div>
    </CurrentUserContext.Provider>    
  );
}

export default App;
