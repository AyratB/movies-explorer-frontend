import React from "react";
import { Link } from "react-router-dom";
import './Navigation.css';
import Button from "./../Button/Button";
import CommonLinks from "./../CommonLinks/CommonLinks";
import breadCrumbsLogo from "./../../images/header_logo_bread-crumbs.svg";

function Navigation(props) {

    return !props.isLoggedIn
        ?   (
                <nav> 
                    <ul className = "navigation__links">
                        <li>
                            <Link to="/signup" className="navigation__link_type_register">
                                Регистрация
                            </Link>
                        </li>
                        <li>
                            <Link to="/signin" className="navigation__link">
                                <Button 
                                    className="button button_type_header-enter">
                                    Войти
                                </Button>
                            </Link>
                        </li>  
                    </ul>
                </nav>
            )
        : props.isNeedToShowBreadCrumbs
            ?   (
                    <CommonLinks 
                        linksClass="common-links_type_navigation"
                        linkClass="common-link_type_navigation">
                    </CommonLinks>
                )
            :   (
                    <img src={breadCrumbsLogo} 
                        className="navigation__logo_type_bread-crumbs" 
                        alt="Лого хлебных крошок" 
                        onClick={props.onBreadClick}/>
                )    
}

export default Navigation;