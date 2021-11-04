import React from "react";
import './BreadCrumbsPopup.css';
import closeButton from "./../../images/popup_close_button.svg";
import CommonLinks from "./../CommonLinks/CommonLinks";

function BreadCrumbsPopup(props) {

    React.useEffect(() => {
        if (!props.isOpened) return;

        const handleEscapeClose = (event) => {
            if (event.key === "Escape") {
                props.onClose();
            }
        };

        document.addEventListener("keydown", handleEscapeClose);

        return () => {
            document.removeEventListener("keydown", handleEscapeClose);
        };
    }, [props.isOpened, props.onClose]);
    
    const handleOverlayClose = (event) => {
        if (event.target === event.currentTarget && props.isOpen) {
            props.onClose();
        }
    };
    
    return (
        
        <article className={`popup ${props.isOpened ? "popup_opened" : ""}`}>
            <div className="popup__overlay" onMouseDown={handleOverlayClose}></div>
            <div className="popup__container">
                <h3 className="popup__title">Главная</h3>
                <img 
                    className="popup__close-button" 
                    src={closeButton} 
                    alt="Кнопка закрытия попапа"
                    onClick={props.onClose}/>

                <CommonLinks 
                    linksClass="common-links_type_popup"
                    linkClass="common-link_type_popup"
                    onClick={props.onClose}>
                </CommonLinks>
            </div>
        </article>
  );
}

export default BreadCrumbsPopup;