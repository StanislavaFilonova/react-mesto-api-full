import React from "react";

function PopupWithForm(props) {
    // Введем переменную, которая отображает попап
    const openClass = props.isOpen && "popup_opened";
    return (
        <div className={`popup popup_type_${props.name} ${openClass}`}>
            <div className="popup__wrapper">
                <button
                    className={`popup__close popup__close_type_${props.name}`}
                    type="button"
                    onClick={props.onClose}
                ></button>
                <form
                    className={`popup__form  popup__form_type_${props.name}`}
                    name={`${props.name}`}
                    onSubmit={props.onSubmit}
                >
                    <h2 className="popup__title">{props.title}</h2>

                    {props.children}
                    <button className="popup__save" type="submit">
                        {" "}
                        {props.buttonSubmitText}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;
