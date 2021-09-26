import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import Header from "./../Header/Header.js";
import Main from "./../Main/Main.js";
import BreadCrumbsPopup from "./../BreadCrumbsPopup/BreadCrumbsPopup.js";

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
        
        
        <Main 
          isLoggedIn={isLoggedIn}
          onBreadClick={handleBreadCrumbsPopupClick}/>
      
        

        {/* <Switch>

          <Route path="/signin">
            <Login autorize={autorize} />
          </Route>

          <Route path="/signup">
            <Register register={register} />
          </Route>





      </Switch> */}     

      <BreadCrumbsPopup 
          isOpened={isBreadCrumbsPopupOpened}
          onClose={closeAllPopups}
          className="common-links_type_popup"/>
      </div>
    </div>    
  );
}

export default App;
