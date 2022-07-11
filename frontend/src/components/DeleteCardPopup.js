import React from "react";
import PopupWithForm from "./PopupWithForm";

//---------------------------------------------------------------------------------------------------------------------

function DeleteCardPopup(props) {
    function handleSubmit(evt) {
        evt.preventDefault();
        props.onSubmitDeleteCard(props.card);
    }

    //---------------------------------------------------------------------------------------------------------------------

    return (
        <PopupWithForm
            name="delete-card"
            title="Вы уверены?"
            button="delete-card"
            buttonSubmitText={props.buttonSubmitText}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        />
    );
}

export default DeleteCardPopup;
