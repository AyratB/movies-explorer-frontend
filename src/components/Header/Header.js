import { Switch, Route, Link } from "react-router-dom";
import './Header.css';

// ????
import headerLogo from "./../../images/header_logo.svg";

function Header(props) {

    console.log(props.isLoggedIn);
  return (
    <header className="header page__container-item">
        <img src={headerLogo} className="header__logo" alt="Лого" />

        <div>
            <ul className = "header__links">

            {                
                !props.isLoggedIn 
                    ? 
                        <> 
                            <Link to="/signup" className="header__link">
                                Регистрация
                            </Link> 

                            <Link to="/signin" className="header__link header__button">
                                Войти
                            </Link>
                        </>
                    : 
                        <> 
                            <Link to="/signup" className="header__link">
                                Фильмы
                            </Link> 
                
                            <Link to="/signin" className="header__link">
                                Сохраненные фильмы
                            </Link>

                            <Link to="/signin" className="header__link">
                                Аккаунт
                            </Link>
                        </>
            }


                

                        
                   
                    
                   
                
            </ul>            
        </div>
      
    </header>
  );
}

export default Header;
