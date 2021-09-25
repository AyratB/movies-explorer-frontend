import React from "react";

import './Header.css';
import { SIZE_NEED_BREAD_CRUMBS } from "./../../utils/constants.js";
import Navigation from "../Navigation/Navigation";
import SiteLogo from "./../SiteLogo/SiteLogo";

function Header(props) {

const [isNeedToShowBreadCrumbs, setIsNeedToShowBreadCrumbs] = React.useState(window.innerWidth > SIZE_NEED_BREAD_CRUMBS);

React.useEffect(() => {
    function handleResize() {
        setIsNeedToShowBreadCrumbs(window.innerWidth > SIZE_NEED_BREAD_CRUMBS);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isNeedToShowBreadCrumbs]);

  return (
    <header className="header">        
        <SiteLogo />          
        <Navigation 
            isLoggedIn={props.isLoggedIn} 
            isNeedToShowBreadCrumbs={isNeedToShowBreadCrumbs} />
    </header>
  );
}

export default Header;
