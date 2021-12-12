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
    if (isBreadCrumbsPopupOpened) setIsBreadCrumbsPopupOpened(false);
    if (isTooltipPopupOpen) {
      setIsTooltipPopupOpen(false);
      setIsTooltipMistake(false);
    }
  };

  const setCurrentUserData = (token) => {

    mainApi
        .getUserInfo(token)
        .then((res) => {

          setCurrentState({
            name: res.data.name,
            email: res.data.email,
            currentUserId: res.data._id,
          });

          setIsLoggedIn(true);          
        })
        .catch(() => {
          handleTooltipPopup(true, "Недействительный токен JWT", true);
          logout();
        });
  }  

  const getUserMovies = () => {
    
    const token = localStorage.getItem("token");

    if(!token) return;

    mainApi
      .getMovies(token)
      .then((res) => { 
        if(typeof res !== 'undefined' && res.data){
          setSavedMovies([...res.data, ...savedMovies]);
        }         
      })
      .catch((err) => { console.log(err); }); 
  }

  const autorize = (userEmail, userPassword) => {
    mainApi
      .authorize(userEmail, userPassword)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);

          setToken(data.token);

          if(data.user){
            setCurrentState({
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

    localStorage.removeItem("token");
    localStorage.removeItem("searchValue");
    localStorage.removeItem("filteredMovies");
    localStorage.removeItem("searchSavedValue");
    localStorage.removeItem("filteredSavedMovies");

    localStorage.removeItem("checkboxChecked");
    localStorage.removeItem("savedCheckboxChecked");

    setIsLoggedIn(false);

    setToken("");

    // почистить все сохраненные данные предыдущего пользователя
    setIsMoviesSearchGoing(false);
    setPreviousSearchValue("");
    setConnectionErrorMessage("");

    setFullMovies([]);
    setFilteredFullMovies([]);
    setFilteredFullMoviesByWidth([]);

    setSavedMovies([]);
    setFilteredSavedMovies([]);
    setPreviousSearchSavedValue("");
    setConnectionSavedErrorMessage("");

    setCheckboxChecked(false);
    setSavedCheckboxChecked(false);

    history.push("/signin");
  }

  //-----------работа с фильмами------------------------ 
  
  const [isMoviesSearchGoing, setIsMoviesSearchGoing] = React.useState(false); // признак поиска
  const [previousSearchValue, setPreviousSearchValue] = React.useState("");
  const [connectionErrorMessage, setConnectionErrorMessage] = React.useState("");

  const [fullMovies, setFullMovies] = React.useState([]); // общее количество фильмов
  const [filteredFullMovies, setFilteredFullMovies] = React.useState([]); // фильмы по фильтру
  const [filteredFullMoviesByWidth, setFilteredFullMoviesByWidth] = React.useState([]);
    
  const [savedMovies, setSavedMovies] = React.useState([]); // сохраненные фильмы из БД
  const [filteredSavedMovies, setFilteredSavedMovies] = React.useState([]); // сохраненные фильмы из БД после поиска
  const [previousSearchSavedValue, setPreviousSearchSavedValue] = React.useState("");
  const [connectionSavedErrorMessage, setConnectionSavedErrorMessage] = React.useState("");

  const [checkboxChecked, setCheckboxChecked] = React.useState(false);
  const [savedCheckboxChecked, setSavedCheckboxChecked] = React.useState(false);  
  const [token, setToken] = React.useState("");  

  const setPreviousValues = () => {
    const searchValue = localStorage.getItem("searchValue");

      if(searchValue){
        setPreviousSearchValue(searchValue);
      }

      let filteredMovies = JSON.parse(localStorage.getItem("filteredMovies"));

      if(filteredMovies && filteredMovies.length > 0){
        setFilteredFullMovies(filteredMovies);
      }

      const searchSavedValue = localStorage.getItem("searchSavedValue");

      if(searchSavedValue){
        setPreviousSearchSavedValue(searchSavedValue);
      }

      let filteredSavedMovies = JSON.parse(localStorage.getItem("filteredSavedMovies"));

      if(filteredSavedMovies && filteredSavedMovies.length > 0){
        setFilteredSavedMovies(filteredSavedMovies);
      }

      let checkboxChecked = JSON.parse(localStorage.getItem("checkboxChecked"));

      if(checkboxChecked){
        setCheckboxChecked(checkboxChecked);
      }

      let savedCheckboxChecked = JSON.parse(localStorage.getItem("savedCheckboxChecked"));

      if(checkboxChecked){
        setSavedCheckboxChecked(savedCheckboxChecked);
      }
  }  

  React.useEffect(() => {
    
    window.addEventListener('resize', recalculateCardsNumber);

    return () => {
        window.removeEventListener("resize", recalculateCardsNumber);
    };
  }, []);

  React.useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
      setCurrentUserData(token);
      
      setPreviousValues();

      getUserMovies();
    }
  }, [token]);

  function editUser(userEmail, userName) {

    var token = getToken();

      mainApi
        .updateUserData(userEmail, userName, token)
        .then((res) => {

          setCurrentState({
            ...currentUser,
            name: res.data.name,
            email: res.data.email,
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

    if(isShortFilm){
      result = result.filter(selectedFilm => selectedFilm.duration <= SHORT_FILMS_DURATION);
    }

    return result;
  }

  const fullMoviesSearch = (searchValue, isShortFilm, movies) => {

    let result = getMovieSearch(searchValue, isShortFilm, movies);

    setPreviousSearchValue(searchValue);
    localStorage.setItem("searchValue", searchValue);

    setCheckboxChecked(isShortFilm);
    localStorage.setItem("checkboxChecked", isShortFilm);

    if(result.length > 0){
      setFilteredFullMovies(result);
      localStorage.setItem("filteredMovies", JSON.stringify(result));
    }
    else{
      setFilteredFullMoviesByWidth([]);
      localStorage.removeItem("filteredMovies");
    }
  }

  const externalMoviesSearchHandler = (searchValue, formCleaner, isShortFilm) => {

    setIsMoviesSearchGoing(true);

    setConnectionErrorMessage("");

    if(fullMovies.length === 0){

      moviesApi
        .getFilms()
        .then((movies) => {
          setFullMovies(movies);
          fullMoviesSearch(searchValue, isShortFilm, movies);
        })
        .catch(() => {
          setConnectionErrorMessage("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз");
        })
        .finally(() => {
          setTimeout(setIsMoviesSearchGoing, 1000, false);
        });
    }
    else{
      fullMoviesSearch(searchValue, isShortFilm, fullMovies);
      setTimeout(setIsMoviesSearchGoing, 1000, false);
    }
  }
  
  const savedMoviesSearchHandler = (searchValue, formCleaner, isShortFilm) => {
    setIsMoviesSearchGoing(true);
    
    if(savedMovies.length === 0){
      setIsMoviesSearchGoing(false);
      setConnectionSavedErrorMessage("Сохраните сначала фильмы в коллекцию");
      handleTooltipPopup(true, "Сохраните сначала фильмы в коллекцию", true);
      return;
    }    

    moviesSavedSearch(searchValue, isShortFilm, savedMovies);
    setTimeout(setIsMoviesSearchGoing, 1000, false)
  }

  const moviesSavedSearch = (searchValue, isShortFilm, movies) => {

    if(searchValue === ""){ // для случая пустого поиcка возвращаем полный набор сохраненных фильмов
      setConnectionSavedErrorMessage("");
      setFilteredSavedMovies([]); 
    }

    let result = getMovieSearch(searchValue, isShortFilm, movies);

    setPreviousSearchValue(searchValue);
    localStorage.setItem("searchSavedValue", searchValue);

    setSavedCheckboxChecked(isShortFilm);
    localStorage.setItem("savedCheckboxChecked", isShortFilm);

    if(result.length > 0){
      setConnectionSavedErrorMessage("");
      setFilteredSavedMovies(result);      
      localStorage.setItem("filteredSavedMovies", JSON.stringify(result));
    }
    else{
      setConnectionSavedErrorMessage("Поиск без результатов");
      setFilteredSavedMovies([]); 
      localStorage.removeItem("filteredSavedMovies");
    }
  }

  React.useEffect(() => {
    if(filteredFullMovies.length > 0){
      recalculateCardsNumber();
    }
  }, [filteredFullMovies]);
  

  const recalculateCardsNumber = () => {

    let totalCardsNumberToShow = window.innerWidth >= 1280
      ? CARDS_SHOW_NUMBER_GREATER_1280
      : window.innerWidth < 1280 && window.innerWidth > 760
        ? CARDS_SHOW_NUMBER_GREATER_760_LESS_1280
        : CARDS_SHOW_NUMBER__LESS_760;

    if(filteredFullMovies.length > 0) // условие нужно, чтобы Реакт успевал прочитать данные при перерендере
      setFilteredFullMoviesByWidth(filteredFullMovies.slice(0, totalCardsNumberToShow));
  }

  const addCardsToShow = () => {  

    let addCardsNumberToShow = window.innerWidth >= 1280
      ? ADD_CARD_GREATER_1280
      : ADD_CARD_LESS_1280;

    setFilteredFullMoviesByWidth(filteredFullMovies.slice(0, filteredFullMoviesByWidth.length + addCardsNumberToShow));
  }

  const saveMovieHandler = (movie) => {

    var token = getToken();
    
    mainApi
      .saveMovie(movie, token)
      .then((savedMovie) => { setSavedMovies([savedMovie.data, ...savedMovies]); })
      .catch((err) => { console.log(err); });
  }

  const deleteMovieHandler = (movieId) => {
    var token = getToken();

    mainApi
      .deleteMovies(movieId, token)
      .then((deletedMovie) => { setSavedMovies([...savedMovies.filter(movie => movie.movieId !== deletedMovie.data.movieId)]); })
      .catch((err) => { console.log(err); });
  }

  const getToken = () => {
    const token = localStorage.getItem("token");

    if(!token) {
      handleTooltipPopup(true, "Что-то пошло не так! Попробуйте ещё раз!", true);
      logout();
    }
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
              isLoggedIn={isLoggedIn}
              movieCardsData={filteredFullMoviesByWidth}
              onBreadClick={handleBreadCrumbsPopupClick}
              isSavedMovies={false}
              handleSearchRequest={externalMoviesSearchHandler}
              component={Movies}
              isMoviesSearchGoing={isMoviesSearchGoing}
              previousSearchValue={previousSearchValue ?? ""}
              recalculateCardsNumber={recalculateCardsNumber}
              totalMoviesCount={filteredFullMovies.length}
              addCardsToShow={addCardsToShow}
              connectionErrorMessage={connectionErrorMessage}
              onMovieSave={saveMovieHandler}
              onMovieDelete={deleteMovieHandler}
              savedMovies={savedMovies}
              isChecked = {checkboxChecked}
            />

            <ProtectedRoute
              path="/saved-movies"
              isLoggedIn={isLoggedIn}
              onBreadClick={handleBreadCrumbsPopupClick}
              connectionErrorMessage={connectionSavedErrorMessage}
              isSavedMovies={true}
              handleSavedSearchRequest={savedMoviesSearchHandler}
              component={Movies}
              movieCardsData={filteredSavedMovies.length === 0 && connectionSavedErrorMessage === "" ? savedMovies : filteredSavedMovies}
              onMovieDelete={deleteMovieHandler}
              previousSearchValue={previousSearchSavedValue ?? ""}
              isChecked = {savedCheckboxChecked}
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
