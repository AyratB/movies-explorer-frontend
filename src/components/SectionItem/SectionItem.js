import React from "react";
import './SectionItem.css';
import SectionHeader from "./../SectionHeader/SectionHeader";

const SectionItem = ({ component: Component, ...props }) => { 
    return (
        <section className={"section__item " + props.className}>
            <SectionHeader sectionTitle={props.sectionTitle}/>
            <Component/>
        </section>
    );
}

export default SectionItem;