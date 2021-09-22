import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import Header from "./../Header/Header.js";

import './App.css';

function App() {

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <div className="page">
      <div className="page__container">
        <Header className = "header" isLoggedIn={isLoggedIn}/>

        {/* <Switch>

          <Route path="/signin">
            <Login autorize={autorize} />
          </Route>

          <Route path="/signup">
            <Register register={register} />
          </Route>



        </Switch> */}

      </div>
    </div>    
  );
}

export default App;
