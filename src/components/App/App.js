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

import { CurrentUserContext } from "./../../contexts/CurrentUserContext";

import './App.css';

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
  
  const closeAllPopups = () => {
    if (isBreadCrumbsPopupOpened) setIsBreadCrumbsPopupOpened(false);
    if (isTooltipPopupOpen) {
      setIsTooltipPopupOpen(false);
      setIsTooltipMistake(false);
    }
  };

  const setCurrentUserData = (token, url) => {

    mainApi
        .getUserInfo(token)
        .then((res) => {

          setCurrentState({
            name: res.data.name,
            email: res.data.email,
            currentUserId: res.data._id,
          });

          setIsLoggedIn(true);
          history.push(url);
        })
        .catch(() => {
          handleTooltipPopup(true, "Недействительный токен JWT", true);
          logout();
        });
  }

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const autorize = (userEmail, userPassword) => {
    mainApi
      .authorize(userEmail, userPassword)
      .then((data) => {
        if (data.token) {          
          localStorage.setItem("token", data.token);
          setCurrentUserData(data.token, "/movies");
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

  const [currentUser, setCurrentState] = React.useState({
    name: "",
    email: "",
    currentUserId: "",
  });

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("searchValue");
    localStorage.removeItem("filteredMovies");
    localStorage.removeItem("searchSavedValue");
    localStorage.removeItem("filteredSavedMovies");

    setIsLoggedIn(false);

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

  const [filteredFullMoviesCopyForCheckBox, setFilteredFullMoviesCopyForCheckBox] = React.useState([]); // фильмы по фильтру
  const [savedMoviesCopyForCheckBox, setSavedMoviesCopyForCheckBox] = React.useState([]); // сохраненные фильмы из БД после поиска и чекбокса
  const [filteredSavedMoviesCopyForCheckBox, setFilteredSavedMoviesCopyForCheckBox] = React.useState([]); // сохраненные фильмы из БД после поиска и чекбокса

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
  }

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setCurrentUserData(token, "/");
      setPreviousValues();
    }
  }, []);

  function editUser(userEmail, userName) {

      mainApi
        .updateUserData(userEmail, userName)
        .then((res) => {

          setCurrentState({
            ...currentUser,
            name: res.data.name,
            email: res.data.email,
          });

          handleTooltipPopup(true, "Успешно отредактированы данные пользователя!", false);
        })
        .catch(() => {
          handleTooltipPopup(true, "Что-то пошло не так! Попробуйте ещё раз!", true);
        });
  }  

  const moviesSearch = (searchValue, isShortFilm, movies) => {

    let result = movies.filter(film =>
      ((film.nameRU ?? "").toLowerCase().includes(searchValue.toLowerCase())
      || 
      (film.nameEN ?? "").toLowerCase().includes(searchValue.toLowerCase())));

    if(isShortFilm){
      result = result.filter(selectedFilm => selectedFilm.duration <= 40);
    }

    setPreviousSearchValue(searchValue);
    localStorage.setItem("searchValue", searchValue);

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

    let previuosSearch = localStorage.getItem("searchValue");
    if(previuosSearch && previuosSearch === searchValue){
      setIsMoviesSearchGoing(false);
      setConnectionErrorMessage("Поменяйте значение поиска. Поисковый запрос равен предыдущему");
      handleTooltipPopup(true, "Поменяйте значение поиска", true);
      return;
    }

    setConnectionErrorMessage("");

    if(fullMovies.length === 0){

      moviesApi
        .getFilms()
        .then((movies) => {
          setFullMovies(movies);
          moviesSearch(searchValue, isShortFilm, movies);
        })
        .catch(() => {
          setConnectionErrorMessage("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз");
        })
        .finally(() => {
          setTimeout(setIsMoviesSearchGoing, 1000, false);
        });
    }
    else{
      moviesSearch(searchValue, isShortFilm, fullMovies);
      setTimeout(setIsMoviesSearchGoing, 1000, false);
    }
  }
  
  const savedMoviesSearchHandler = (searchValue, formCleaner, isShortFilm) => {
    setIsMoviesSearchGoing(true);
    
    let previuosSavedSearch = localStorage.getItem("searchSavedValue");

    if(previuosSavedSearch && previuosSavedSearch === searchValue){
      setIsMoviesSearchGoing(false);
      setConnectionSavedErrorMessage("Поменяйте значение поиска. Поисковый запрос равен предыдущему");
      handleTooltipPopup(true, "Поменяйте значение поиска", true);
      return;
    }
    
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

    let result = movies.filter(film =>
      ((film.nameRU ?? "").toLowerCase().includes(searchValue.toLowerCase())
      || 
      (film.nameEN ?? "").toLowerCase().includes(searchValue.toLowerCase())));

    if(isShortFilm){
      result = result.filter(selectedFilm => selectedFilm.duration <= 40);
    }

    setPreviousSearchValue(searchValue);
    localStorage.setItem("searchSavedValue", searchValue);

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

  // вешаем обработчик на изменение ширины экрана
  React.useEffect(() => {

    window.addEventListener('resize', recalculateCardsNumber);

    return () => {
        window.removeEventListener("resize", recalculateCardsNumber);
    };
  }, []);

  const recalculateCardsNumber = () => {

    let totalCardsNumberToShow = window.innerWidth >= 1280
      ? 12
      : window.innerWidth < 1280 && window.innerWidth > 760
        ? 8
        : 5;

    if(filteredFullMovies.length > 0) // условие нужно, чтобы Реакт успевал прочитать данные при перерендере
      setFilteredFullMoviesByWidth(filteredFullMovies.slice(0, totalCardsNumberToShow));
  }

  const addCardsToShow = () => {

    let addCardsNumberToShow = window.innerWidth >= 1280
      ? 3
      : 2;

    setFilteredFullMoviesByWidth(filteredFullMovies.slice(0, filteredFullMoviesByWidth.length + addCardsNumberToShow));
  }

  //получение фильмов пользователя
  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      mainApi
        .getMovies()
        .then((res) => { setSavedMovies([...res.data, ...savedMovies]); })
        .catch((err) => { console.log(err); });
    }
  }, []);

  const saveMovieHandler = (movie) => {
    
    mainApi
      .saveMovie(movie)
      .then((savedMovie) => { setSavedMovies([savedMovie.data, ...savedMovies]); })
      .catch((err) => { console.log(err); });
  }

  const deleteMovieHandler = (movieId) => {
    mainApi
      .deleteMovies(movieId)
      .then((deletedMovie) => { setSavedMovies([...savedMovies.filter(movie => movie.movieId !== deletedMovie.data.movieId)]); })
      .catch((err) => { console.log(err); });
  }

  const checkBoxHandler = (isShortMoviesChecked, isSavedMovies) => {

    if(isSavedMovies){

      if(filteredSavedMovies.length === 0 && savedMovies.length === 0) return;

      if(isShortMoviesChecked){

        if(filteredSavedMovies.length !== 0){
          setFilteredSavedMoviesCopyForCheckBox([...filteredSavedMovies]);
          setFilteredSavedMovies([...filteredSavedMovies.filter(movie => movie.duration <= 40)]);
        }
        else{
          setSavedMoviesCopyForCheckBox([...savedMovies]);
          setSavedMovies([...savedMovies.filter(movie => movie.duration <= 40)])
        }
      } else{
        if(filteredSavedMovies.length !== 0){
          setFilteredSavedMovies([...filteredSavedMoviesCopyForCheckBox]);
        }
        else{
          setSavedMovies([...savedMoviesCopyForCheckBox]);
        }
      }
    } else {
      
      if(filteredFullMovies.length === 0) return;

      if(isShortMoviesChecked){
        setFilteredFullMoviesCopyForCheckBox([...filteredFullMovies]);
        setFilteredFullMovies([...filteredFullMovies.filter(movie => movie.duration <= 40)]);
      } else{
        setFilteredFullMovies([...filteredFullMoviesCopyForCheckBox]);
      }
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
              <Register register={register} />
            </Route>

            <Route path="/signin">
              <Login autorize={autorize} />
            </Route>

            <ProtectedRoute
              expract path="/movies"
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
              onCheckboxChecked={checkBoxHandler}
            />

            <ProtectedRoute
              expract path="/saved-movies"
              isLoggedIn={isLoggedIn}
              onBreadClick={handleBreadCrumbsPopupClick}
              connectionErrorMessage={connectionSavedErrorMessage}
              isSavedMovies={true}
              handleSavedSearchRequest={savedMoviesSearchHandler}
              component={Movies}
              movieCardsData={filteredSavedMovies.length === 0 && connectionSavedErrorMessage === "" ? savedMovies : filteredSavedMovies}
              onMovieDelete={deleteMovieHandler}
              previousSearchValue={previousSearchSavedValue ?? ""}
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
