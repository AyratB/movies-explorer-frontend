import React from "react";
import { Link } from "react-router-dom";
import headerAccountLogo from "./../../images/header_account_logo.svg";
import './CommonLinks.css';
import Button from "./../Button/Button";

function CommonLinks(props) {  

    return (
        <nav>
            <ul className={props.linksClass}>
                <li>
                    <Link to="/signup" className={props.linkClass}>
                         Фильмы
                    </Link> 
                </li>
                <li>
                    <Link to="/signin" className={props.linkClass}>
                        Сохраненные фильмы
                    </Link>
                </li>
                <li>
                    <Link to="/signin" className={props.linkClass}>
                        <Button 
                            className="button button_type_header-account">
                                <img src={headerAccountLogo}
                                    className={props.logoClass} 
                                    alt="Лого аккаунта" />
                            Аккаунт
                        </Button>
                    </Link>
                </li>
            </ul>
        </nav>
    );  
}

export default CommonLinks;