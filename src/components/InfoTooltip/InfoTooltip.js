import React from "react";
import Button from "./../Button/Button";

import tooltipLogoCheck from "./../../images/tooltip-check.svg";
import tooltipLogoMistake from "./../../images/tooltip-mistake.svg";

import './InfoTooltip.css';

function InfoTooltip(props) {

  React.useEffect(() => {
    if (!props.isOpened) return;

    const handleEscapeClose = (event) => {
        if (event.key === "Escape") {
            props.onClose();
        }
      };

      document.addEventListener("keydown", handleEscapeClose);

      return () => document.removeEventListener("keydown", handleEscapeClose);      

    }, [props.isOpened, props.onClose]);

    const handleOverlayClose = (event) => {
      if (event.target === event.currentTarget && props.isOpen) {
        props.onClose();
      }
    };

  return (
    <article className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__overlay" onMouseDown={handleOverlayClose}></div>
      <div className="popup__container popup__container_type_tooltip">
        <img
          src={props.isTooltipMistake ? tooltipLogoMistake : tooltipLogoCheck}
          className="tooltip__logo"
          alt="Лого"
        />

        <h2 className="tooltip__title">{props.message}</h2>

        <Button
          type="button"
          className="button button_type_close-popup"
          ariaLabel="Кнопка закрытия попапа"
          onClick={props.onClose}
        ></Button>
      </div>
    </article>
  );
}

export default InfoTooltip;
