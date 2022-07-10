import React from "react";
import failure from "../images/failure.svg";
import success from "../images/success.svg";

function InfoToolTip(props) {
    return (
        <div className={`popup ${props.isOpen && "popup_opened"}`}>
            <div className="popup__wrapper">
                <button
                    type="button"
                    aria-label="закрыть попап"
                    className="popup__close"
                    onClick={props.onClose}
                ></button>

                {props.isSuccess ? (
                    <div className="popup__message">
                        <img
                            src={`${success}`}
                            alt="Регистрация прошла успешно."
                            className="popup__message-image"
                        />
                        <p className="popup__message-text">
                            Вы успешно зарегистрировались!
                        </p>
                    </div>
                ) : (
                    <div className="popup__message">
                        <img
                            src={`${failure}`}
                            alt="Регистрация не была выполнена."
                            className="popup__message-image"
                        />
                        <p className="popup__message-text">
                            Что-то пошло не так. Попробуйте ещё раз!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default InfoToolTip;
