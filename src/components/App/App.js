import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import Main from "./../Main/Main.js";
import BreadCrumbsPopup from "./../BreadCrumbsPopup/BreadCrumbsPopup.js";
import ProtectedRoute from "./../ProtectedRoute/ProtectedRoute.js";
import Movies from "./../Movies/Movies.js";

import './App.css';

function App() {

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isBreadCrumbsPopupOpened, setIsBreadCrumbsPopupOpened] = React.useState(false);

  const handleBreadCrumbsPopupClick = () => setIsBreadCrumbsPopupOpened(true);
  
  const closeAllPopups = () => {
    if (isBreadCrumbsPopupOpened) setIsBreadCrumbsPopupOpened(false);    
  };


  return (
    <div className="app__page">
      <div className="app__container">

        <Switch>

        <Route exact path="/">
          <Main isLoggedIn={isLoggedIn} onBreadClick={handleBreadCrumbsPopupClick}/>
        </Route>

        <Route expract path="/movies">
          <Movies isLoggedIn={isLoggedIn} onBreadClick={handleBreadCrumbsPopupClick}/>
        </Route>

        <Route path="/profile">
        </Route>  

        <Route path="/signin">
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
