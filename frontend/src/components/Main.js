import React from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
    onEditAvatar,
    onEditProfile,
    onAddPlace,
    onCardClick,
    onCardLike,
    onCardDelete,
    cards,
}) {
    const currentUser = React.useContext(CurrentUserContext);

    //---------------------------------------------------------------------------------------------------------------------

    return (
        <main className="content">
            <section className="profile">
                <button
                    type="button"
                    aria-label="открыть поле добавления аватара"
                    className="profile__button"
                    onClick={onEditAvatar}
                >
                    <img
                        className="profile__avatar"
                        src={`${currentUser.avatar}`}
                        alt="Аватарка пользователя"
                    />
                </button>
                <div className="profile__info">
                    <h1 className="profile__user-name">{`${currentUser.name}`}</h1>
                    <button
                        className="profile__edit-button"
                        type="button"
                        aria-label="открыть попап"
                        onClick={onEditProfile}
                    ></button>
                    <p className="profile__occupation">{`${currentUser.about}`}</p>
                </div>
                <button
                    className="profile__add-button"
                    type="button"
                    aria-label="открыть поле добавления фото"
                    onClick={onAddPlace}
                ></button>
            </section>

            <section className="elements">
                {cards.map((card) => (
                    <Card
                        key={card._id}
                        card={card}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                    />
                ))}
            </section>
        </main>
    );
}

export default Main;
