import React from "react";
import './Techs.css';

function Techs(props) {  

  return (
      <div className="techs">
        <h2 className="techs__title">7 технологий</h2>
        <p className="techs__descripton">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>



        <ul className="techs_list">
            <li className="techs_item">HTML</li>
            <li className="techs_item">CSS</li>
            <li className="techs_item">JS</li>
            <li className="techs_item">React</li>
            <li className="techs_item">Git</li>
            <li className="techs_item">Express.js</li>
            <li className="techs_item">mongoDB</li>

            
        </ul>
      </div>
  );
}

export default Techs;