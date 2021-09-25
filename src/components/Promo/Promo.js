import React from "react";
import './Promo.css';
import Header from "../Header/Header";
import promoDecor from "./../../images/promo_decor.svg";

function Promo(props) {  

  return (
      <section className="promo">
        <Header isLoggedIn={props.isLoggedIn}/>
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        <img className="promo__decor" src={promoDecor} alt="Декор промо"/>
      </section>
  );
}

export default Promo;