import React from "react";
import './Portfolio.css';
import { ExternalLink } from 'react-external-link';
import portfolioLink from "./../../images/portfolio_link_logo.svg";

function Portfolio(props) {

    return (
        <article className="portfolio">
            <h5 className="portfolio-title">Портфолио</h5>
            <ul className="portfolio-links">
                <li className="portfolio-item">
                        <p>Статичный сайт</p>
                        <ExternalLink 
                            className="portfolio-link" 
                            href="https://ayratb.github.io/how-to-learn/">
                                <img src={portfolioLink} alt="Лого ссылки на работу"/>
                        </ExternalLink>
                    </li>
                    <li className="portfolio-item">
                        <p>Адаптивный сайт</p>
                        <ExternalLink 
                            className="portfolio-link" 
                            href="https://ayratb.github.io/russian-travel/">
                                <img src={portfolioLink} alt="Лого ссылки на работу"/>
                        </ExternalLink>
                    </li>
                    <li className="portfolio-item">
                        <p>Одностраничное приложение</p>
                        <ExternalLink 
                            className="portfolio-link" 
                            href="http://mestopracticum.students.nomoredomains.club/signin">
                                <img src={portfolioLink} alt="Лого ссылки на работу"/>
                        </ExternalLink>
                    </li>
                </ul>
        </article>
    );
}

export default Portfolio;