import React from "react";
import { Link } from "react-router-dom";
import headerAccountLogo from "./../../images/header_logo.svg";
import './SiteLogo.css';

function SiteLogo(props) {  

  return (
    <Link to="/" className="site-logo__link">
      <img src={headerAccountLogo} alt="Лого аккаунта"/>
    </Link>       
  );
}

export default SiteLogo;