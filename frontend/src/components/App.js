import React from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";

import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";

import ProtectedRoute from "./ProtectedRoute";

import auth from "../utils/Auth";
import api from "../utils/Api";

import EditProfilePopup from "../components/EditProfilePopup";
import EditAvatarPopup from "../components/EditAvatarPopup";
import AddPlacePopup from "../components/AddPlacePopup";
import ImagePopup from "../components/ImagePopup";
import DeleteCardPopup from "./DeleteCardPopup.js";

import CurrentUserContext from "../contexts/CurrentUserContext";

import Login from "./Login";
import Register from "./Register";
import InfoToolTip from "./InfoToolTip";
//---------------------------------------------------------------------------------------------------------------------

function App() {
    //Создаем хуки, управляющие внутренним состоянием.
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [email, setEmail] = React.useState("");

    const history = useHistory();

    const [selectedCard, setSelectedCard] = React.useState({
        name: "",
        link: "",
    });

    const [deletedCard, setDeletedCard] = React.useState({});

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
        React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
        React.useState(false);
    const [isDeleteCardPopup, setIsDeleteCardPopup] = React.useState(false);
    // const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] =
    //     React.useState(false);
    const [isInfoToolTipPopup, setIsInfoToolTipPopup] = React.useState({
        status: false,
        open: false,
    });
    const [isLoading, setIsLoading] = React.useState(false);
    // const [isSuccess, setIsSuccess] = React.useState(false);

    const [profilePopupButtonText, setProfilePopupButtonText] =
        React.useState("Сохранить");
    const [avatarPopupButtonText, setAvatarPopupButtonText] =
        React.useState("Сохранить");
    const [placePopupButtonText, setPlacePopupButtonText] =
        React.useState("Создать");
    const [removePopupButtonText, setRemovePopupButtonText] =
        React.useState("Да");
    //---------------------------------------------------------------------------------------------------------------------

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleCardDeleteClick(card) {
        setIsDeleteCardPopup(true);
        setDeletedCard(card);
    }

    //Функция закрытия всех попапов
    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsDeleteCardPopup(false);
        setDeletedCard({ link: "", name: "" });
        setSelectedCard({ link: "", name: "" });
        // setIsInfoToolTipPopupOpen(false);
        setIsInfoToolTipPopup({ status: false, open: false });
    }

    //---------------------------------------------------------------------------------------------------------------------

    // Настраиваем хук, который устанавливает колбэки. Функция будет вызвана после того, как будут внесены все изменения в DOM.
    React.useEffect(() => {
        setIsLoading(true);
        // Чтение данных с сервера (информация о пользователе и карточках)
        // Проверим, авторизован ли пользователь
        if (isLoggedIn) {
            Promise.all([api.getUserInfo(), api.getCards()])
                .then(([user, cards]) => {
                    setCurrentUser(user);
                    setCards(cards);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => setIsLoading(false));
        }
    }, [isLoggedIn]);

    // Функция, которая отвечает за закрытие попапа нажатием кнопки "escape"
    React.useEffect(
        () => {
            function handleEscapeClick(evt) {
                if (evt.key === "Escape") {
                    closeAllPopups();
                }
            }
            document.addEventListener("keyup", handleEscapeClick);

            return () => {
                document.removeEventListener("keyup", handleEscapeClick);
            };
        }, // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    // Функция, которая отвечает за закрытие попапов по клику вне формы
    React.useEffect(
        () => {
            function handleOverlayClick(evt) {
                if (evt.target.classList.contains("popup")) {
                    closeAllPopups();
                }
            }
            document.addEventListener("mousedown", handleOverlayClick);

            return () => {
                document.removeEventListener("mousedown", handleOverlayClick);
            };
        },
        // колбэк-очистка
        []
    );

    // Хук для проверки токена при каждом монтировании компонента App
    React.useEffect(
        () => {
            handleIsToken();
        }, // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );
    // Проверяем есть ли токен в хранилище, если он есть, устанавливаем адрес почты и отпраляем пользователя на домашнюю страницу
    function handleIsToken() {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            auth.checkToken(jwt)
                .then((res) => {
                    setEmail(res.data.email);
                    setIsLoggedIn(true);
                    history.push("/home");
                })
                .catch(() => {
                    console.log("Переданный токен некорректен.");
                    setIsLoggedIn(false);
                });
        }
    }

    //---------------------------------------------------------------------------------------------------------------------

    // Функция обновления пользователя
    function handleUpdateUser(user) {
        setProfilePopupButtonText("Сохранение...");
        api.editProfile(user)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setProfilePopupButtonText("Сохранить");
            });
    }

    function handleUpdateAvatar(avatar) {
        setAvatarPopupButtonText("Сохранение...");
        api.renewAvatar(avatar) // 1й аргумент с типом String (avatarLink в Api.js:renewAvatar)
            .then((avatar) => {
                setCurrentUser(avatar);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setAvatarPopupButtonText("Сохранить");
            });
    }

    // Функция добавления места
    function handleAddPlaceSubmit(cardNew) {
        setPlacePopupButtonText("Добавление...");
        api.addCard(cardNew)
            .then((res) => {
                setCards([res, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setPlacePopupButtonText("Создать");
            });
    }

    //  Функция удаления карточки: устанавливаем текст на кнопку при удалении карточки
    function handleCardDelete(card) {
        setRemovePopupButtonText("Удаление...");
        // Исключаем из массива удаленную карточку
        api.deleteCard(card._id)
            .then(() => {
                // Исключаем из массива удаленную карточку
                const newCards = cards.filter(
                    (currentCard) => currentCard._id !== card._id
                );
                // Обновляем состояние
                setCards(newCards);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setRemovePopupButtonText("Да");
            });
    }

    // Установка лайка карточкам
    function handleCardLike(card) {
        // Ввод переменной, где мы проверяем при помощи метода some, удовлетворяет ли какой-либо элемент массива условию, заданному в передаваемой функции.
        const isLiked = card.likes.some((like) => like._id === currentUser._id);
        api.changeLike(card._id, !isLiked)
            .then((res) => {
                setCards((condition) =>
                    condition.map((currentCard) =>
                        currentCard._id === card._id ? res : currentCard
                    )
                );
            })
            .catch((err) => {
                console.log(err);
            });
    }
    // Проверяем зарегистрирован ли пользователь
    function handleIsRegister(userEmail, userPassword, resetForm) {
        auth.register(userEmail, userPassword)
            .then((res) => {
                setIsInfoToolTipPopup({ status: true, open: true });
                // setIsInfoToolTipPopupOpen(true);
                // setIsSuccess(true);
                history.push("/signin");
                resetForm();
            })
            .catch((err) => {
                if (err.status === 400) {
                    console.log("400 - некорректно заполнено одно из полей");
                }
                setIsInfoToolTipPopup({ status: false, open: true });
                // setIsInfoToolTipPopupOpen(true);
                // setIsSuccess(false);
            });
    }

    function handleIsLogin(userEmail, userPassword, resetForm) {
        auth.login(userEmail, userPassword)
            .then((res) => {
                if (res.token) {
                    localStorage.setItem("jwt", res.token);
                    resetForm();
                    setIsLoggedIn(true);
                    setEmail(email);
                    history.push("/home");
                }
            })
            .catch((err) => {
                if (err.status === 400) {
                    console.log("400 - не передано одно из полей");
                    // setIsSuccess(false);
                    // setIsInfoToolTipPopupOpen(true);
                } else if (err.status === 401) {
                    console.log("401 - пользователь с email не найден");
                    // setIsInfoToolTipPopupOpen(true);
                }
                setIsInfoToolTipPopup({ status: false, open: true });
            });
    }

    function handleSignOut() {
        setIsLoggedIn(false);
        localStorage.removeItem("jwt");
        history.push("/signin");
    }

    //---------------------------------------------------------------------------------------------------------------------
    return (
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
                {/*текущее значение контекста из ближайшего подходящего Provider выше в дереве компонентов.*/}
                <Header email={email} onSignOut={handleSignOut} />
                <Switch>
                    <ProtectedRoute
                        exact
                        path="/home"
                        isLoggedIn={isLoggedIn}
                        onEditAvatar={handleEditAvatarClick}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDeleteClick}
                        cards={cards}
                        component={Main}
                        isLoading={isLoading}
                    />
                    <Route path="/signin">
                        <Login onLogin={handleIsLogin} history={history} />
                    </Route>
                    <Route path="/signup">
                        <Register
                            onRegister={handleIsRegister}
                            history={history}
                        />
                    </Route>
                    <Route>
                        {isLoggedIn ? (
                            <Redirect to="/home" />
                        ) : (
                            <Redirect to="/signin" />
                        )}
                        {/* Если пользователь залогинен, отправляем его на домашнюю страницу, если нет, то на страницу с логином*/}
                    </Route>
                </Switch>

                <Footer />

                {/* Добавление карточки */}
                <AddPlacePopup
                    buttonSubmitText={placePopupButtonText}
                    isOpen={isAddPlacePopupOpen}
                    onAddPlace={handleAddPlaceSubmit}
                    onClose={closeAllPopups}
                />

                {/* Обновление аватара пользователя */}
                <EditAvatarPopup
                    buttonSubmitText={avatarPopupButtonText}
                    isOpen={isEditAvatarPopupOpen}
                    onUpdateAvatar={handleUpdateAvatar}
                    onClose={closeAllPopups}
                />

                {/* Редактирование профиля пользователя */}
                <EditProfilePopup
                    buttonSubmitText={profilePopupButtonText}
                    isOpen={isEditProfilePopupOpen}
                    onUpdateUser={handleUpdateUser}
                    onClose={closeAllPopups}
                />

                <DeleteCardPopup
                    isOpen={isDeleteCardPopup}
                    buttonSubmitText={removePopupButtonText}
                    card={deletedCard}
                    onSubmitDeleteCard={handleCardDelete}
                    onClose={closeAllPopups}
                />

                {/* Просмотр фотографии */}
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />

                <InfoToolTip
                    isOpen={isInfoToolTipPopup.open}
                    //isOpen={isInfoToolTipPopupOpen}
                    onClose={closeAllPopups}
                    //isSuccess={isInfoToolTipPopupOpen}
                    isSuccess={isInfoToolTipPopup.status}
                />
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
