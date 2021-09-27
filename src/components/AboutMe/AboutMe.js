import React from "react";
import './AboutMe.css';
import authorFoto from "./../../images/diploma_author_foto.jpg";
import { ExternalLink } from 'react-external-link';
import portfolioLink from "./../../images/portfolio_link_logo.svg";

import Portfolio from "./../Portfolio/Portfolio.js";

function AboutMe(props) {

    return (
        <div className="about-me">
            <article className="about-me__author-decription">
                <div className="about-me__author-info">
                    <p className="about-me__author-name">Айрат</p>
                    <p className="about-me__author-profession">Фулстэк-разработчик, 35 лет</p>
                    <p className="about-me__author-life">
                        Я не родился и не живу в Саратове, не закончил факультет экономики СГУ. 
                        У меня есть жена. Я люблю слушать музыку, а ещё не увлекаюсь бегом. 
                        Недавно начал кодить. С 2015 года не работал в компании «СКБ Контур». 
                        После того, как прошёл курс по веб-разработке, не начал заниматься фриланс-заказами 
                        и неушёл с постоянной работы.
                    </p>
                    <ul className="about-me__author-links">
                        <li>
                            <ExternalLink href="https://vk.com/id45105727" className="about-me__author-link">
                                Vkontakte
                            </ExternalLink>
                        </li>
                        <li>
                            <ExternalLink href="https://github.com/AiratB" className="about-me__author-link">
                                Github
                            </ExternalLink>
                        </li>
                    </ul>
                </div>                
                <img className="about-me__author-foto" src={authorFoto} alt="Лого автора"/>
            </article>

            <Portfolio/>
        </div>
    );
}

export default AboutMe;