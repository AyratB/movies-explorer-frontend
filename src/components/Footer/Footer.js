import React from "react";
import './Footer.css';
import { ExternalLink } from 'react-external-link';

function Footer(props) {

  return (
        <footer className="footer">
            <h6 className="footer__sign">Учебный проект Яндекс.Практикум х BeatFilm.</h6>
            <nav className="footer__nav">
                <div className="footer__copyright">© 2021</div>
                <ul className="footer__links">
                    <li>
                        <ExternalLink href="https://practicum.yandex.ru" className="footer__link">
                            Яндекс.Практикум
                        </ExternalLink>
                    </li>
                    <li>
                        <ExternalLink href="https://github.com" className="footer__link">
                            Github
                        </ExternalLink>
                    </li>
                    <li>
                        <ExternalLink href="https://www.facebook.com" className="footer__link">
                            Facebook
                        </ExternalLink>
                    </li>
                </ul>
            </nav>
        </footer>
    );
}

export default Footer;