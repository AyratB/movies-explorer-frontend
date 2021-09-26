import React from "react";
import './AboutMe.css';
import authorFoto from "./../../images/diploma_author_foto.jpg";
import { Link } from "react-router-dom";
import { ExternalLink } from 'react-external-link';
import portfolioLink from "./../../images/portfolio_link_logo.svg";

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

            <div className="about-me__portfolio">
                <h5 className="about-me__portfolio-title">Портфолио</h5>
                <ul className="about-me__portfolio-links">
                    <li className="about-me__portfolio-item">
                        <p>Статичный сайт</p>
                        <ExternalLink className="about-me__portfolio-link" href="https://ayratb.github.io/how-to-learn/">
                            <img src={portfolioLink} alt="Лого ссылки на работу"/>
                        </ExternalLink>
                    </li>

                    <li className="about-me__portfolio-item">
                        <p>Адаптивный сайт</p>
                        <ExternalLink className="about-me__portfolio-link" href="https://ayratb.github.io/russian-travel/">
                            <img src={portfolioLink} alt="Лого ссылки на работу"/>
                        </ExternalLink>
                    </li>

                    <li className="about-me__portfolio-item">
                        <p>Одностраничное приложение</p>
                        <ExternalLink className="about-me__portfolio-link" href="http://mestopracticum.students.nomoredomains.club/signin">
                            <img src={portfolioLink} alt="Лого ссылки на работу"/>
                        </ExternalLink>
                    </li>
                </ul> 
            </div>
            
        </div>
    );
}

export default AboutMe;