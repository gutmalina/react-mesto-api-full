export class Api {
  constructor({baseUrl, headers}) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  /** проверить ответ */
  _checkResponse(res){
    return (res.ok) ? res.json() : Promise.reject(res.status)
  }

  /** установить заголовок */
  _getHeaders() {
    return {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      ...this._headers,
    };
  }

  /** получить данные профиля с сервера */
  getProfile(){
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._getHeaders(),
    })
    .then(this._checkResponse)
  }

  /** получить предзагруженные карточки с сервера */
  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._getHeaders(),
    })
    .then(this._checkResponse)
  }

  /** отправить на сервер новые данные профиля */
  editProfile(name, about){
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(this._checkResponse)
  }

  /** добавить новую карточку на сервер */
  addCard(name, link){
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(this._checkResponse)
  }

  /** удалить карточку на сервере */
  deleteCard(id){
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    })
    .then(this._checkResponse)
  }

  /** добавить like */
  addLike(id){
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._getHeaders(),
    })
    .then(this._checkResponse)
  }

  /** удалить like */
  deleteLike(id){
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    })
    .then(this._checkResponse)
  }

  /** отправить на сервер новые данные аватар */
  editAvatar(avatar){
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar
      })
    })
    .then(this._checkResponse)
  }

}

const api = new Api({
  baseUrl: `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:3001'}`,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
