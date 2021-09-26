import React from "react";
import './Main.css';

import Promo from "./../Promo/Promo";
import SectionItem from "./../SectionItem/SectionItem";
import AboutProject from "./../AboutProject/AboutProject";
import Techs from "./../Techs/Techs";

function Main(props) {
    return (
        <main className="main">
            <Promo isLoggedIn={props.isLoggedIn}/>

            <SectionItem 
                sectionTitle="О проекте"
                component={AboutProject}
                className="section__item_type_about-project">            
            </SectionItem>

            <SectionItem 
                sectionTitle="Технологии"
                component={Techs}
                className="section__item_type_techs">            
            </SectionItem>         
          
        </main>     
    );
}

export default Main;