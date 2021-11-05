import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import './PageNotFound.css';

function PageNotFound () {
  const history = useHistory();

  return (
    <div className="not-found">
      <h3 className="not-found__title">
       <span>404</span>
      </h3>
      <p className="not-found__text">
       Страница не найдена
      </p>
      <button className="button button_type_to-main" onClick={() => history.goBack()}>Назад</button>
    </div>
  )
}

export default PageNotFound;