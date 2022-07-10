class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    // Возврат ответа об ошибке от сервера
    _checkResponse(res) {
        if (res.ok) {
            // Метод .json принимает предоставленный JSON, строит его и отправляет его клиенту
            return res.json();
        }
        // Promise  позволяет создать обертку для значения, который еще не известен при создании промиса. Нужен дял асинхронных операций
        return Promise.reject(
            `Ошибка: ${res.statusText}, с кодом: ${res.status}`
        );
    }

    /**
     * Метод получения информации о пользователе с сервера
     */
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        }).then(this._checkResponse);
    }

    /**
     * Метод получения карточек с сервера
     */
    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
        }).then(this._checkResponse);
    }

    /**
     * Метод редактирования профиля пользователя
     * @param {Object} userData Данные о пользователе
     * userData.name {String}
     * userData.about {String}
     */
    editProfile(userData) {
        if (!userData.name) {
            console.error(
                "Api.editProfile в аргументе userData не передано обязательное поле 'name'. Запрос не будет выполнен."
            );
            return;
        }
        if (!userData.about) {
            console.error(
                "Api.editProfile в аргументе userData не передано обязательное поле 'about'. Запрос не будет выполнен."
            );
            return;
        }
        const url = `${this._baseUrl}/users/me`;
        const hdr = this._headers;
        hdr["Content-Type"] = "application/json";

        const opts = {
            method: "PATCH",
            headers: hdr,
            body: JSON.stringify(userData),
        };

        return fetch(url, opts).then(this._checkResponse);
    }

    /**
     * Метод загрузки новой карточки на сервер
     * @param {Object} cardData Данные о карточке
     * cardData.name {String}
     * cardData.link {String}
     */
    addCard(cardData) {
        if (!cardData.name) {
            console.error(
                "Api.addCard в аргументе cardData не передано обязательное поле 'name'. Запрос не будет выполнен."
            );
            return;
        }
        if (!cardData.link) {
            console.error(
                "Api.addCard в аргументе cardData не передано обязательное поле 'link'. Запрос не будет выполнен."
            );
            return;
        }

        const url = `${this._baseUrl}/cards`;
        const hdr = this._headers;
        hdr["Content-Type"] = "application/json";

        const opts = {
            method: "POST",
            headers: hdr,
            body: JSON.stringify(cardData),
        };

        return fetch(url, opts).then(this._checkResponse);
    }

    /**
     * Метод удаления карточки
     * @param {String} cardId Индентификатор карточки
     */
    deleteCard(cardId) {
        if (!cardId) {
            console.error(
                "Api.deleteCard не передан обязательный аргумент cardId. Запрос не будет выполнен."
            );
            return;
        }
        const url = `${this._baseUrl}/cards/${cardId}`;
        const hdr = this._headers;
        hdr["Content-Type"] = "application/json";
        const opts = {
            method: "DELETE",
            headers: hdr,
        };

        return fetch(url, opts).then(this._checkResponse);
    }

    /**
     * Метод постановки/удаления лайка на карточку
     * @param {String} cardId Идентификатор карточки
     */
    changeLike(cardId, like) {
        if (!cardId) {
            console.error(
                "Api.changeLike не передан обязательный аргумент cardId. Запрос не будет выполнен."
            );
            return;
        }

        const url = `${this._baseUrl}/cards/likes/${cardId}`;
        const opts = {
            method: like ? "PUT" : "DELETE",
            headers: this._headers,
        };

        return fetch(url, opts).then(this._checkResponse);
    }

    /**
     * Метод обновления аватара
     */
    renewAvatar(avatarLink) {
        if (!avatarLink) {
            console.error(
                "Api.renewAvatar не передан обязательный аргумент avatarLink. Запрос не будет выполнен."
            );
            return;
        }

        const url = `${this._baseUrl}/users/me/avatar`;
        const hdr = this._headers;
        hdr["Content-Type"] = "application/json";
        const opts = {
            method: "PATCH",
            headers: hdr,
            body: JSON.stringify({
                avatar: avatarLink,
            }),
        };

        return fetch(url, opts).then(this._checkResponse);
    }
}

const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-30",
    headers: {
        authorization: "08bc75e7-78fb-46ea-8791-989ceb63ff7a",
        "Content-Type": "application/json",
    },
});

export default api;
