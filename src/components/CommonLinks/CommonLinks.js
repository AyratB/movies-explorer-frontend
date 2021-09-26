import React from "react";
import { NavLink } from "react-router-dom";
import headerAccountLogo from "./../../images/header_account_logo.svg";
import './CommonLinks.css';
import Button from "./../Button/Button";

function CommonLinks(props) {  

    return (        
        <nav> 
            <ul className={`common-links ${props.linksClass}`}>
                <li>
                    <NavLink to="/signup" className={props.linkClass} activeClassName="active_common-link">
                         Фильмы
                    </NavLink> 
                </li>
                <li>
                    <NavLink to="/signin" className={props.linkClass} activeClassName="active_common-link">
                        Сохраненные фильмы
                    </NavLink>
                </li>
                <li className="common-link__logo">
                    <NavLink to="/signin" className={props.linkClass}>
                        <Button 
                            className="button button_type_header-account">
                                <img src={headerAccountLogo}
                                    className={props.logoClass} 
                                    alt="Лого аккаунта" />
                            Аккаунт
                        </Button>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );  
}

export default CommonLinks;