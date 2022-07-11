class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkReponse() {
    return (res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  //---Загрузка информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkReponse());
  }

  //---Смена аватара
  changeUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._checkReponse());
  }

  //---Загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkReponse());
  }

  //---Редактирование профиля
  setUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkReponse());
  }

  //---Добавление новой карточки
  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkReponse());
  }

  //---Удаление карточки
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkReponse());
  }

  //---Отображение количества лайков карточки
  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: `${isLiked ? "PUT" : "DELETE"}`,
      headers: {
        authorization: this._headers.authorization,
      },
    }).then(this._checkReponse());
  }
}

const api = new Api({
  baseUrl: "https://api.mesto1.n-kzn.students.nomoredomainssbs.ru",
  headers: {
    authorization: "d9d0f8c2-9510-4f6f-b039-ce74201bfd31",
    "Content-Type": "application/json",
  },
});

export default api;
