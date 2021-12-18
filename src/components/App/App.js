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
  const [token, setToken] = React.useState("");

  const [currentUser, setCurrentState] = React.useState({
    name: "",
    email: "",
    currentUserId: "",
  });
  
  const closeAllPopups = () => {
    if (isBreadCrumbsPopupOpened) setIsBreadCrumbsPopupOpened(false);
    if (isTooltipPopupOpen) {
      setIsTooltipPopupOpen(false);
      setIsTooltipMistake(false);
    }
  };

  const autorize = (userEmail, userPassword) => {
    mainApi
      .authorize(userEmail, userPassword)
      .then((data) => {
        if (data.token) {
          
          localStorage.setItem("token", data.token);

          setToken(data.token);

          if(data.user){
            setCurrentState({
              ...currentUser,
              name: data.user.name,
              email: data.user.email,
              currentUserId: data.user._id,
            });
          }

          setIsLoggedIn(true);

          history.push("/movies");
        }
      })
      .catch((errorStatus) => {
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
    setToken("");

    setFullMoviesData({});
    setSavedMoviesData({});

    history.push("/signin");
  }
  
  const [fullMoviesData, setFullMoviesData] = React.useState({
    isSavedMovies: false,                 // флаг сохраненных фильмов
    shortChecked: false,                  // признак короткого метра
    previousSearchValue: "",              // предыдущая строка поиска
    connectionErrorMessage: "",           // сообщение об ошибке поиска
    fullMovies: [],                       // полный перечень фильмы из внешнего АПИ
    filteredMovies: [],                   // фильмы после поиска 
    filteredMoviesByWidth: [],            // фильмы после поиска с фильтрацией отображения ЕЩЕ. ТОЛЬКО для FULL!
  });

  const [savedMoviesData, setSavedMoviesData] = React.useState({
    isSavedMovies: true,                  // флаг сохраненных фильмов
    shortChecked: false,                  // признак короткого метра
    previousSearchValue: "",              // предыдущая строка поиска
    connectionErrorMessage: "",           // сообщение об ошибке поиска
    fullMovies: [],                       // сохраненные фильмы пользователя из БД
    filteredMovies: [],                   // фильмы после поиска 
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
    setMovieObjectProperty(
      false, 
      "previousSearchValue",
      localStorage.getItem("FM_previousSearchValue"));

    let filteredFullMovies = JSON.parse(localStorage.getItem("FM_filteredMovies"));
    
    if(filteredFullMovies && filteredFullMovies.length > 0){

      setFullMoviesData(
        Object.assign(
          fullMoviesData, 
          {
            filteredMovies : [...filteredFullMovies]
          }
        ));
    }

    setMovieObjectProperty(
      false, 
      "shortChecked",
      JSON.parse(localStorage.getItem("FM_shortChecked")));
    // FULL MOVIES 

    // SAVED MOVIES 
    setMovieObjectProperty(
      true,
      "previousSearchValue",
      localStorage.getItem("SM_previousSearchValue"));    

    {
      let filteredSavedMovies = JSON.parse(localStorage.getItem("SM_filteredMovies"));
      
      if (filteredSavedMovies && filteredSavedMovies.length > 0) {

        setSavedMoviesData(
          Object.assign(
            savedMoviesData, 
            {
              filteredMovies : [...filteredSavedMovies]
            }
          ));
      }
    }

    setMovieObjectProperty(
      true,
      "shortChecked",
      JSON.parse(localStorage.getItem("SM_shortChecked")));
    // SAVED MOVIES
  }

  React.useEffect(() => {

    moviesApi
      .getFilms()
      .then((externalMovies) => {

        if(typeof externalMovies !== 'undefined' && externalMovies.length > 0){

          setFullMoviesData(
            Object.assign(
              fullMoviesData, 
              {
                fullMovies : [...externalMovies]
              }
            ));
        }  
      })
      .catch((err) => {
        console.log(err)
      });

      // TODO - при перегрузке необходимо обнулить +++ коллекцию

    window.addEventListener('resize', recalculateCardsNumber);
    
    return () => {
      window.removeEventListener("resize", recalculateCardsNumber);
    }

  }, []);

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

          setToken(token);

          setIsLoggedIn(true);

          if(typeof userSavedMovies !== 'undefined' && userSavedMovies.data){

            setSavedMoviesData(
              Object.assign(
                savedMoviesData, 
                {
                  fullMovies : [...userSavedMovies.data]
                }
              ));
          }        
        })
        .catch((err) => {
          console.log(err)
          // handleTooltipPopup(true, "Недействительный токен JWT", true);
          // logout();
        });
    }
  }, [token]);

  React.useEffect(() => {
    if(fullMoviesData.filteredMovies.length > 0){
      recalculateCardsNumber();
    }
  }, [fullMoviesData.filteredMovies]);

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

  const getMovieSearch = (searchValue, isShortFilm, movies) => {

    let trimmedSearchValue = searchValue.trim();

    let result = movies.filter(film =>
      ((film.nameRU ?? "").toLowerCase().includes(trimmedSearchValue)
      || 
      (film.nameEN ?? "").toLowerCase().includes(trimmedSearchValue)));

    if (isShortFilm) {
      result = result.filter(selectedFilm => selectedFilm.duration <= SHORT_FILMS_DURATION);
    }

    return result;
  }

  const [isMoviesSearchGoing, setIsMoviesSearchGoing] = React.useState(false); // признак поиска фильма

  const commonMoviesSearch = (searchValue, isShortFilm, movieDataObject) => {

    let isSavedMovies = movieDataObject["isSavedMovies"];
    var localStoragePrefix = isSavedMovies ? "SM": "FM";
    
    if (isSavedMovies && searchValue === "") { // для случая пустого поиcка возвращаем полный набор сохраненных фильмов
      
      setMovieObjectProperty(true, "connectionErrorMessage", "");

      setSavedMoviesData(
        Object.assign(
          savedMoviesData, 
          {
            filteredMovies : []
          }
        ));

      localStorage.setItem(`${localStoragePrefix}_filteredMovies`, "");

      return;
    }

    let result = getMovieSearch(
      searchValue, 
      isShortFilm, 
      isSavedMovies ? savedMoviesData["fullMovies"] : fullMoviesData["fullMovies"]);
      
    setMovieObjectProperty(isSavedMovies, "previousSearchValue", searchValue);
    localStorage.setItem(`${localStoragePrefix}_previousSearchValue`, searchValue);

    setMovieObjectProperty(isSavedMovies, "shortChecked", isShortFilm);
    localStorage.setItem(`${localStoragePrefix}_shortChecked`, JSON.stringify(isShortFilm));

    if (result.length > 0) {
      setMovieObjectProperty(isSavedMovies, "connectionErrorMessage", "");      

      if (isSavedMovies) {

        setSavedMoviesData(
          Object.assign(
            savedMoviesData, 
            {
              filteredMovies : [...result]
            }
          ));

      } else {

        setFullMoviesData(
          Object.assign(
            fullMoviesData, 
            {
              filteredMovies : [...result]
            }
          ));
      }

      localStorage.setItem(`${localStoragePrefix}_filteredMovies`, JSON.stringify(result));

    } else {

      setMovieObjectProperty(isSavedMovies, "connectionErrorMessage", "Поиск без результатов");

      if (isSavedMovies) {

        setSavedMoviesData(
          Object.assign(
            savedMoviesData, 
            {
              filteredMovies : []
            }
          ));

      } else {

        setFullMoviesData(
          Object.assign(
            fullMoviesData, 
            {
              filteredMovies : []
            }
          ));
      }

      localStorage.removeItem(`${localStoragePrefix}_filteredMovies`);
    }
  }

  const commonMoviesSearchHandler = (searchValue, isShortFilm, movieDataObject) => {

    setIsMoviesSearchGoing(true);

    if (movieDataObject["isSavedMovies"] && movieDataObject["fullMovies"].length === 0) {

      setIsMoviesSearchGoing(false);
      setMovieObjectProperty(true, "connectionErrorMessage", "Сохраните сначала фильмы в коллекцию");
      handleTooltipPopup(true, "Сохраните сначала фильмы в свою коллекцию", true);

      return;
    }

    commonMoviesSearch(searchValue, isShortFilm, movieDataObject);

    setTimeout(setIsMoviesSearchGoing, 1000, false);
  }

  const recalculateCardsNumber = () => {

    let totalCardsNumberToShow = window.innerWidth >= 1280
      ? CARDS_SHOW_NUMBER_GREATER_1280
      : window.innerWidth < 1280 && window.innerWidth > 760
        ? CARDS_SHOW_NUMBER_GREATER_760_LESS_1280
        : CARDS_SHOW_NUMBER__LESS_760;

    // // условие нужно, чтобы Реакт успевал прочитать данные при перерендере
    // if (fullMoviesData.filteredMovies.length > 0) {

      setFullMoviesData(
        Object.assign(
          fullMoviesData, 
          {
            filteredMoviesByWidth : [...fullMoviesData.filteredMovies.slice(0, totalCardsNumberToShow)]
          }
        ));
    // }
  }

  const addCardsToShow = () => { 

    let addCardsNumberToShow = window.innerWidth >= 1280
      ? ADD_CARD_GREATER_1280
      : ADD_CARD_LESS_1280;

    setFullMoviesData(
      Object.assign(
        fullMoviesData, 
        {
          filteredMoviesByWidth : fullMoviesData.filteredMovies.slice(0, fullMoviesData.filteredMoviesByWidth.length + addCardsNumberToShow)
        }
      ));   
  }

  const saveMovieHandler = (movie) => {

    var token = getToken();
    
    mainApi
      .saveMovie(movie, token)
      .then((savedMovie) => { 

        setSavedMoviesData(

          Object.assign(
            savedMoviesData, 
            {
              fullMovies : [savedMovie.data, [...savedMoviesData.fullMovies]]
            }
          ));

      })
      .catch((err) => { console.log(err); });
  }

  const deleteMovieHandler = (movieId) => {
    var token = getToken();

    mainApi
      .deleteMovies(movieId, token)
      .then((deletedMovie) => {

        setSavedMoviesData(
          Object.assign(
            savedMoviesData, 
            {
              fullMovies : [[...savedMoviesData["fullMovies"]].filter(movie => movie.movieId !== deletedMovie.data.movieId)]
            }
          ));
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
              recalculateCardsNumber={recalculateCardsNumber}
              addCardsToShow={addCardsToShow}
              handleSearchRequest={commonMoviesSearchHandler}
              onMovieSave={saveMovieHandler}
              onMovieDelete={deleteMovieHandler}
              
              movieObject ={fullMoviesData}
              savedMoviesObject={savedMoviesData}

              movieCardsData={fullMoviesData["filteredMoviesByWidth"]}
            />

            <ProtectedRoute
              path="/saved-movies"
              component={Movies}
              isLoggedIn={isLoggedIn}
              onBreadClick={handleBreadCrumbsPopupClick}
              handleSavedSearchRequest={commonMoviesSearchHandler}
              onMovieDelete={deleteMovieHandler}              
              
              movieCardsData={[...(savedMoviesData["filteredMovies"].length !== 0 ? savedMoviesData["filteredMovies"] :  savedMoviesData["fullMovies"])]}
              
              movieObject ={savedMoviesData}
              // TODO попробовать 
              //movieCardsData={savedMoviesData["filteredMovies"] || savedMoviesData["fullMovies"]}              
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
