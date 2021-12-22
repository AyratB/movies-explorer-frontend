import React from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";

import Main from "./../Main/Main.js";
import BreadCrumbsPopup from "./../BreadCrumbsPopup/BreadCrumbsPopup.js";
import InfoTooltip from "./../InfoTooltip/InfoTooltip.js";
import ProtectedRoute from "./../ProtectedRoute/ProtectedRoute.js";
import Movies from "./../Movies/Movies.js";
import Login from "./../Login/Login.js";
import Register from "./../Register/Register.js";
import PageNotFound from "./../PageNotFound/PageNotFound.js";
import Profile from "./../Profile/Profile.js";

import { CurrentUserContext } from "./../../contexts/CurrentUserContext";

import './App.css';

import {
  SHORT_FILMS_DURATION,
  CARDS_SHOW_NUMBER_GREATER_1280, 
  CARDS_SHOW_NUMBER_GREATER_760_LESS_1280,
  CARDS_SHOW_NUMBER__LESS_760,
  ADD_CARD_GREATER_1280,
  ADD_CARD_LESS_1280
} from "./../../utils/constants.js";

import * as mainApi from "./../../utils/MainApi";
import * as moviesApi from "./../../utils/MoviesApi";

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

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const [currentUser, setCurrentState] = React.useState({
    name: "",
    email: "",
    currentUserId: "",
  });
  
  const closeAllPopups = () => {
    if (isBreadCrumbsPopupOpened) {
      setIsBreadCrumbsPopupOpened(false);
    }
    if (isTooltipPopupOpen) {
      setIsTooltipPopupOpen(false);
      setIsTooltipMistake(false);
    }
  };

  const autorize = (userEmail, userPassword) => {

    mainApi
      .authorize(userEmail, userPassword)
      .then((data) => {

        localStorage.clear();
        localStorage.setItem("token", data.token);

        setCurrentState({
          ...currentUser,
          name: data.user.name,
          email: data.user.email,
          currentUserId: data.user._id,
        });
          
        setIsLoggedIn(true);

        return data.token;
      })
      .then(token => mainApi.getMovies(token))
      .then(movies => {

        setSavedMoviesArray([...movies.data]);

        history.push("/movies");
      })
      .catch((errorStatus) => {

        debugger
        handleTooltipPopup(
          true,
          errorStatus === 401
            ? "Ошибка авторизации! Проверьте параметры"
            : errorStatus === 400
              ? "Не передано одно из полей. Заполните оба поля"
              : "Что-то пошло не так",
          true
        );
      });
  }

  const register = (userEmail, userPassword, userName) => {
    mainApi
      .register(userEmail, userPassword, userName)
      .then((res) => {
        if(res.data){
          handleTooltipPopup(true, "Вы успешно зарегистрировались!", false);
          autorize(userEmail, userPassword);
        }
      })
      .catch(() => { handleTooltipPopup(true, "Что-то пошло не так! Попробуйте ещё раз!", true); });
  }  

  const logout = () => {

    localStorage.clear();

    setIsLoggedIn(false);

    setFullMoviesData({});
    setSavedMoviesData({});

    setFullMoviesArray([]);
    setFullFilteredMovies([]);

    setSavedMoviesArray([]);
    setSavedFilteredMovies([]);

    history.push("/signin");
  }

  const [fullMoviesArray, setFullMoviesArray] = React.useState([]);

  const [fullFilteredMovies, setFullFilteredMovies] = React.useState([]);
  
  const [fullMoviesData, setFullMoviesData] = React.useState({
    isSavedMovies: false,                 // флаг сохраненных фильмов
    shortChecked: false,                  // признак короткого метра
    previousSearchValue: "",              // предыдущая строка поиска
    connectionErrorMessage: "",           // сообщение об ошибке поиска
  });  
  
  const [savedMoviesArray, setSavedMoviesArray] = React.useState([]);
  const [savedFilteredMovies, setSavedFilteredMovies] = React.useState([]);

  const [savedMoviesData, setSavedMoviesData] = React.useState({
    isSavedMovies: true,                  // флаг сохраненных фильмов
    shortChecked: false,                  // признак короткого метра
    previousSearchValue: "",              // предыдущая строка поиска
    connectionErrorMessage: "",           // сообщение об ошибке поиска
  });

  const setMovieObjectProperty = (isSavedMovies, movieDataPropertyName, movieDataPropertyValue) => {
    
    if(movieDataPropertyValue == null || typeof movieDataPropertyValue === "undefined") return;

    let functionType = isSavedMovies ? setSavedMoviesData : setFullMoviesData;
    let movieObject = isSavedMovies ? savedMoviesData : fullMoviesData;

    functionType(
      Object.assign(
        movieObject,
        {
          [movieDataPropertyName]: movieDataPropertyValue
        }
      )
    );
  }

  const setPreviousValues = () => {    

    // FULL MOVIES
    {
      let FM_previousSearchValue = localStorage.getItem("FM_previousSearchValue");
      
      if(FM_previousSearchValue !== null && typeof FM_previousSearchValue !== 'undefined' && FM_previousSearchValue !== 'undefined'){
        setMovieObjectProperty(
          false, 
          "previousSearchValue",
          FM_previousSearchValue);
        }
    }

    {
      let filteredFullMovies = JSON.parse(localStorage.getItem("FM_filteredMovies"));

      if(filteredFullMovies !== "" && filteredFullMovies &&  filteredFullMovies.length > 0 && fullFilteredMovies.length === 0){
        
        setFullFilteredMovies([...filteredFullMovies]);
      }
    }
       
    {
      let FM_shortChecked = localStorage.getItem("FM_shortChecked");
      
      if(FM_shortChecked !== null && typeof FM_shortChecked !== 'undefined' && FM_shortChecked !== 'undefined'){
        setMovieObjectProperty(
          false, 
          "shortChecked",
          JSON.parse(FM_shortChecked));
      }
    } 
    // FULL MOVIES 

    // SAVED MOVIES
    {
      let SM_previousSearchValue = localStorage.getItem("SM_previousSearchValue");
      
      if(SM_previousSearchValue !== null && typeof SM_previousSearchValue !== 'undefined' && SM_previousSearchValue !== 'undefined'){
        setMovieObjectProperty(
          true,
          "previousSearchValue",
          SM_previousSearchValue);
      }
    }    
      
    let filteredSavedMoviesArray = localStorage.getItem("SM_filteredMovies");
    
    if(filteredSavedMoviesArray && filteredSavedMoviesArray !== ""){
      
      let filteredSavedMovies = JSON.parse(filteredSavedMoviesArray);
      
      if (filteredSavedMovies && filteredSavedMovies.length > 0 && savedFilteredMovies.length === 0) {

        setSavedFilteredMovies([...filteredSavedMovies]);
      } 
    }   
    
    {
      let SM_shortChecked = localStorage.getItem("SM_shortChecked");
      
      if(SM_shortChecked !== null &&typeof SM_shortChecked !== 'undefined' && SM_shortChecked !== 'undefined'){

        setSearchWithShortCheck(true);

        setMovieObjectProperty(
          true,
          "shortChecked",
          JSON.parse(SM_shortChecked));
      }
    }    
    // SAVED MOVIES
  }

  React.useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {

      setPreviousValues(); 

      Promise.all([mainApi.getUserInfo(token), mainApi.getMovies(token)])
        .then(([userData, userSavedMovies]) => {

          setCurrentState({
            ...currentUser,
            name: userData.data.name,
            email: userData.data.email,
            currentUserId: userData.data._id,
          });

          setIsLoggedIn(true);

          setSavedMoviesArray([...userSavedMovies.data]);          
        })
        .catch((err) => {
          handleTooltipPopup(true, "Недействительный токен", true);
        });
    }

    window.addEventListener('resize', recalculateCardsNumber);

    return () => {
      window.removeEventListener("resize", recalculateCardsNumber);
    }

  }, []);

  React.useEffect(() => {
   
    if(fullFilteredMovies.length > 0){
      recalculateCardsNumber();
    }
  }, [fullFilteredMovies]);

  function editUser(userEmail, userName) {

    var token = getToken();

    mainApi
      .updateUserData(userEmail, userName, token)
      .then((updatedUserData) => {

        setCurrentState({
          ...currentUser,
          name: updatedUserData.data.name,
          email: updatedUserData.data.email,
        });

        handleTooltipPopup(true, "Успешно отредактированы данные пользователя!", false);
      })
      .catch((er) => {
        handleTooltipPopup(true, "Что-то пошло не так! Попробуйте ещё раз!", true);
      });
  }

  const [searchWithShortCheck, setSearchWithShortCheck] = React.useState(false);

  
  const getExternalMovies = (searchValue, isShortFilm, isSavedMovies, localStoragePrefix) => {
    
    

    if (isSavedMovies) { // сохраненнеы

    } else { //внешние фильмы

      moviesApi
        .getFilms()
        .then((externalMovies) => {

          if(typeof externalMovies !== 'undefined' && externalMovies.length > 0 && fullMoviesArray.length === 0){
            setFullMoviesArray([...externalMovies]);

            //поиск
            searchMovies(searchValue, isShortFilm, externalMovies, isSavedMovies, localStoragePrefix);
        }  
       })
        .catch((err) => {
          console.log(err);
        });      
    }    
  }

  const getMovieSearch = (searchValue, isShortFilm, movies, isSavedMovies) => {

    if(isSavedMovies){
      setSearchWithShortCheck(false);
    }
    
    if(typeof searchValue === 'undefined') return [];

    let trimmedSearchValue = searchValue.trim();

    let result = movies.filter(film =>
      ((film.nameRU ?? "").toLowerCase().includes(trimmedSearchValue)
      || 
      (film.nameEN ?? "").toLowerCase().includes(trimmedSearchValue)));    

    if (isShortFilm) {

      if(isSavedMovies){
        setSearchWithShortCheck(true);
      }
      
      result = result.filter(selectedFilm => selectedFilm.duration <= SHORT_FILMS_DURATION);
    }    
    
    return result;    
  }

  const [isMoviesSearchGoing, setIsMoviesSearchGoing] = React.useState(false);

  const commonMoviesSearch = (searchValue, isShortFilm, movieDataObject) => {
    
    let isSavedMovies = movieDataObject.isSavedMovies;
    var localStoragePrefix = isSavedMovies ? "SM": "FM";

    let arrayForSearch = isSavedMovies ? savedMoviesArray : fullMoviesArray;

    if (arrayForSearch.length === 0) {
      getExternalMovies(searchValue, isShortFilm, isSavedMovies, localStoragePrefix);      
    }
    else{
      searchMovies(searchValue, isShortFilm, arrayForSearch, isSavedMovies, localStoragePrefix);
    }
  }

  const searchMovies = (searchValue, isShortFilm, searchArray, isSavedMovies, localStoragePrefix) => {

    let result = getMovieSearch(
      searchValue, 
      isShortFilm, 
      searchArray,
      isSavedMovies);
      
    setMovieObjectProperty(isSavedMovies, "previousSearchValue", searchValue);
    localStorage.setItem(`${localStoragePrefix}_previousSearchValue`, searchValue);

    setMovieObjectProperty(isSavedMovies, "shortChecked", isShortFilm);
    localStorage.setItem(`${localStoragePrefix}_shortChecked`, JSON.stringify(isShortFilm));
        
    if (result.length > 0) {

      setMovieObjectProperty(isSavedMovies, "connectionErrorMessage", "");      

      if(isSavedMovies){
        setSavedFilteredMovies([...result]);
      }
      else{
        setFullFilteredMovies([...result]);
      }

    } else {

      setMovieObjectProperty(isSavedMovies, "connectionErrorMessage", "Поиск без результатов");

      if(isSavedMovies){

        setSavedFilteredMovies([]);
      }
      else{
        setFullFilteredMovies([]);
      }
    }

    localStorage.setItem(`${localStoragePrefix}_filteredMovies`, JSON.stringify(result));
  }

  const commonMoviesSearchHandler = (searchValue, isShortFilm, movieDataObject) => {

    setIsMoviesSearchGoing(true);

    if (movieDataObject.isSavedMovies && savedMoviesArray.length === 0) {

      setIsMoviesSearchGoing(false);
      setMovieObjectProperty(true, "connectionErrorMessage", "Сохраните сначала фильмы в коллекцию");
      handleTooltipPopup(true, "Сохраните сначала фильмы в свою коллекцию", true);

      return;
    }

    commonMoviesSearch(searchValue, isShortFilm, movieDataObject);

    setIsMoviesSearchGoing(false);
  }

  const [totalCardToShowNumber, setTotalCardToShowNumber] = React.useState(0);

  const recalculateCardsNumber = () => {

    let totalCardsNumberToShow = window.innerWidth >= 1280
      ? CARDS_SHOW_NUMBER_GREATER_1280
      : window.innerWidth < 1280 && window.innerWidth > 760
        ? CARDS_SHOW_NUMBER_GREATER_760_LESS_1280
        : CARDS_SHOW_NUMBER__LESS_760;

    setTotalCardToShowNumber(totalCardsNumberToShow);
  }

  const addCardsToShow = () => {

    let addCardsNumberToShow = window.innerWidth >= 1280
      ? ADD_CARD_GREATER_1280
      : ADD_CARD_LESS_1280;

      setTotalCardToShowNumber(totalCardToShowNumber + addCardsNumberToShow);
  }

  const saveMovieHandler = (movie) => {

    var token = getToken();
    
    mainApi
      .saveMovie(movie, token)
      .then((savedMovie) => {

        if(savedMovie.data){

          setSavedMoviesArray([savedMovie.data, ...savedMoviesArray]);
        }
      })
      .catch((err) => { console.log(err); });
  }

  const deleteMovieHandler = (movieId) => {
    console.log(movieId)
    var token = getToken();

    mainApi
      .deleteMovies(movieId, token)
      .then((deletedMovie) => {

        setSavedMoviesArray([...savedMoviesArray.filter(movie => movie.movieId !== deletedMovie.data.movieId)]);
      })
      .catch((err) => { console.log(err); });
  }

  const getToken = () => {

    const token = localStorage.getItem("token");

    if (!token) {
      handleTooltipPopup(true, "Что-то пошло не так! Попробуйте ещё раз!", true);
      logout();
    }

    return token;
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
              {isLoggedIn ? <Redirect to="/" /> : <Register register={register} />}
            </Route>

            <Route path="/signin">
              {isLoggedIn ? <Redirect to="/" /> : <Login autorize={autorize} />}
            </Route>
            
            <ProtectedRoute
              path="/movies"
              component={Movies}
              isLoggedIn={isLoggedIn}
              onBreadClick={handleBreadCrumbsPopupClick}
              isMoviesSearchGoing={isMoviesSearchGoing}
              addCardsToShow={addCardsToShow}
              handleSearchRequest={commonMoviesSearchHandler}
              onMovieSave={saveMovieHandler}
              onMovieDelete={deleteMovieHandler}
              recalculateCardsNumber={recalculateCardsNumber}
              movieObject ={fullMoviesData}
              moviesCardData={fullFilteredMovies.slice(0, totalCardToShowNumber)}
              savedMovies={savedMoviesArray}
              isNeedToHideAddButton={fullFilteredMovies.length <= totalCardToShowNumber}

              isSavedMovie={false}
            />  

            <ProtectedRoute
              path="/saved-movies"
              component={Movies}
              isLoggedIn={isLoggedIn}
              onBreadClick={handleBreadCrumbsPopupClick}
              handleSearchRequest={commonMoviesSearchHandler}
              onMovieDelete={deleteMovieHandler}
              movieObject ={savedMoviesData}

              isSavedMovie={true}

              moviesCardData={savedFilteredMovies.length !== 0 
                ? savedFilteredMovies 
                : (typeof savedMoviesData.previousSearchValue === 'undefined' || savedMoviesData.previousSearchValue === "") && !searchWithShortCheck
                  ? savedMoviesArray
                  : []
               
                 }
            />

            <ProtectedRoute
              path="/profile"
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
