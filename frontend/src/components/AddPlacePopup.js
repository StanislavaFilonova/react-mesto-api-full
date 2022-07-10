import React from "react";
import PopupWithForm from "./PopupWithForm";

//---------------------------------------------------------------------------------------------------------------------

function AddPlacePopup(props) {
    const [cardName, setCardName] = React.useState("");
    const [cardLink, setCardLink] = React.useState("");

    function handleChangeCardName(evt) {
        setCardName(evt.target.value);
    }

    function handleChangeCardLink(evt) {
        setCardLink(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onAddPlace({
            name: cardName,
            link: cardLink,
        });
    }

    //---------------------------------------------------------------------------------------------------------------------

    // Используем хук эффект, ктр. вызывает функцию
    React.useEffect(() => {
        setCardName("");
        setCardLink("");
    }, [props.isOpen]);

    //---------------------------------------------------------------------------------------------------------------------
    return (
        <PopupWithForm
            name="card"
            title="Новое место"
            button="card"
            buttonSubmitText={props.buttonSubmitText}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                className="popup__input popup__input_type_placename"
                id="placename-input"
                name="name"
                required
                minLength="2"
                maxLength="30"
                autoComplete="off"
                placeholder="Название"
                value={cardName}
                onChange={handleChangeCardName}
            />
            <span
                id="placename-input-error"
                className="popup__input-error popup__input-error_active"
            ></span>
            <input
                type="url"
                className="popup__input popup__input_type_imagelink"
                id="imageLink-input"
                name="link"
                required
                autoComplete="off"
                placeholder="Ссылка на картинку"
                value={cardLink}
                onChange={handleChangeCardLink}
            />
            <span
                id="imageLink-input-error"
                className="popup__input-error popup__input-error_active"
            ></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
