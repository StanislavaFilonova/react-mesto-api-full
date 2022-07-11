import React from "react";
import PopupWithForm from "./PopupWithForm";

//---------------------------------------------------------------------------------------------------------------------

function EditAvatarPopup(props) {
    const inputRef = React.useRef(); // позволяет сохранить некоторый объект, который можно можно изменять и который хранится в течение всей жизни компонента.

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onUpdateAvatar(inputRef.current.value);
    }

    React.useEffect(() => {
        inputRef.current.value = "";
    }, [props.isOpen]);

    //---------------------------------------------------------------------------------------------------------------------

    return (
        <PopupWithForm
            name="avatar"
            button="avatar"
            title="Обновить аватар"
            isOpen={props.isOpen}
            onClose={props.onClose}
            buttonSubmitText={props.buttonSubmitText}
            onSubmit={handleSubmit}
        >
            <input
                id="avatar-input"
                type="url"
                className="popup__input popup__input_type_avatar"
                name="avatar"
                placeholder="Ссылка на картинку"
                required
                ref={inputRef}
            />
            <span
                id="avatar-input-error"
                className="popup__input-error popup__input-error_active"
            ></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
