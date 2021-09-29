import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import Main from "./../Main/Main.js";
import BreadCrumbsPopup from "./../BreadCrumbsPopup/BreadCrumbsPopup.js";
import ProtectedRoute from "./../ProtectedRoute/ProtectedRoute.js";
import Movies from "./../Movies/Movies.js";
import Login from "./../Login/Login.js";

import { fakeMovieData, savedFakeMovieData } from "./../../utils/constants.js";

import './App.css';

function App() {

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
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

  const extrenalMoviesSearchHandler = (searchParam, isShort) => {
    setExternalFilteredMovieData(externalFullMovieData.filter(movie => movie.nameRU.includes(searchParam)));
  }

  const savedMoviesSearchHandler = (searchParam, isShort) => {   
    setSavedFilteredMovieData(savedFullMovieData.filter(movie => movie.nameRU.includes(searchParam))); 
  }

  return (
    <div className="app__page">
      <div className="app__container">

        <Switch>

        <Route exact path="/">
          <Main isLoggedIn={isLoggedIn} onBreadClick={handleBreadCrumbsPopupClick}/>
        </Route>

        <Route expract path="/movies">
          <Movies 
            isLoggedIn={isLoggedIn} 
            onBreadClick={handleBreadCrumbsPopupClick} 
            // movieCardsData={externalFilteredMovieData}
            movieCardsData={fakeMovieData}
            isSavedMovies={false}
            handleSearchRequest={extrenalMoviesSearchHandler}/>
        </Route>

        <Route expract path="/saved-movies">
          <Movies 
            isLoggedIn={isLoggedIn} 
            onBreadClick={handleBreadCrumbsPopupClick} 
            // movieCardsData={savedFilteredMovieData}
            movieCardsData={savedFakeMovieData}
            isSavedMovies={true}
            handleSearchRequest={savedMoviesSearchHandler}/>
        </Route>

        <Route path="/profile">
        </Route>  

        <Route path="/signin">
          <Login autorize={autorize} />
        </Route>
  
        <Route path="/signup">
        </Route>

        {/* <ProtectedRoute
          expract path="/movies"
          isLoggedIn={isLoggedIn}
          onBreadClick={handleBreadCrumbsPopupClick}
          component={Main}
        /> */}        

        </Switch>  

      <BreadCrumbsPopup 
          isOpened={isBreadCrumbsPopupOpened}
          onClose={closeAllPopups}
          className="common-links_type_popup"/>
      </div>
    </div>    
  );
}

export default App;
