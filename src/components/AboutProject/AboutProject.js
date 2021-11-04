import React from "react";
import './AboutProject.css';

function AboutProject(props) {

    return (
        <>
            <ul className="about-project__descriptions">
                <li>
                    <h4 className="about-project__description-title">Дипломный проект включал 5 этапов</h4>
                    <p className="about-project__description-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </li>
                <li>
                    <h4 className="about-project__description-title">На выполнение диплома ушло 5 недель</h4>
                    <p className="about-project__description-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </li>
            </ul>
            <div className="about-project__timeline">
                <div className="about-project__timeline-header"><p>1 неделя</p></div>
                <div className="about-project__timeline-header"><p>4 недели</p></div>
                <div className="about-project__timeline-value"><p>Back-end</p></div>
                <div className="about-project__timeline-value"><p>Front-end</p></div>
            </div>
        </>
    );
}

export default AboutProject;