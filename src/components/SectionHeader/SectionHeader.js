import React from "react";
import './SectionHeader.css';

function SectionHeader(props) {  

  return (
      <h2 className="section-header__title">
        {props.sectionTitle}
      </h2>
  );
}

export default SectionHeader;