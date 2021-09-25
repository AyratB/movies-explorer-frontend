import React from "react";
import { Link } from "react-router-dom";
import headerAccountLogo from "./../../images/header_account_logo.svg";
import Button from "./../Button/Button";

function BreadCrumbsPopup(props) {  

  return (
      <>
        <li>
            <Link to="/signup" className="header__link"  className={props.linkClass}>
                Фильмы
            </Link> 
        </li>
        <li>
            <Link to="/signin" className="header__link" className={props.linkClass}>
                Сохраненные фильмы
            </Link>
        </li>
        <li>
            <Link to="/signin" className="header__link" className={props.linkClass}>
                <Button 
                    className="button button_type_header-account">
                        <img src={headerAccountLogo} 
                            className="header__logo_type_account" 
                            className={props.logoClass} 
                            alt="Лого аккаунта" />
                        Аккаунт
                </Button>
            </Link>
        </li>
      </>
  );
}

export default BreadCrumbsPopup;