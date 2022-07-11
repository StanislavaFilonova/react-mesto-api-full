import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

//---------------------------------------------------------------------------------------------------------------------

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeDescription(evt) {
        setDescription(evt.target.value);
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleSubmit(evt) {
        evt.preventDefault(evt);

        props.onUpdateUser({
            name: name,
            about: description,
        });
    }

    //---------------------------------------------------------------------------------------------------------------------

    return (
        <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            button="profile"
            buttonSubmitText={props.buttonSubmitText}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                id="name-input"
                type="text"
                className="popup__input popup__input_type_name"
                name="name"
                placeholder="Ваше имя"
                minLength="2"
                maxLength="40"
                required
                value={name || ""}
                onChange={handleChangeName}
            />
            <span id="name-input-error" className="popup__input-error"></span>
            <input
                id="occupation-input"
                type="text"
                className="popup__input popup__input_type_occupation"
                name="occupation"
                placeholder="Ваша профессия"
                minLength="2"
                maxLength="200"
                required
                value={description || ""}
                onChange={handleChangeDescription}
            />
            <span
                id="occupation-input-error"
                className="popup__input-error popup__input-error_active"
            ></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
