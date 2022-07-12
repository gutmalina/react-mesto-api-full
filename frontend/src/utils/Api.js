import BASE_URL from './constants';

export class Api {
  constructor({baseUrl, headers}) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  /** проверить ответ */
  _checkResponse(res){
    return (res.ok) ? res.json() : Promise.reject(res.status)
  }

  /** получить данные профиля с сервера */
  getProfile(){
    // console.log('USER', this._headers)
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  /** получить предзагруженные карточки с сервера */
  getCards() {
    // console.log('CARDS', this._headers)
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  /** отправить на сервер новые данные профиля */
  editProfile(name, about){
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(this._checkResponse)
  }

  /** добавить новую карточку на сервер */
  addCard(name, link, likes){
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
        likes
      })
    })
    .then(this._checkResponse)
  }

  /** удалить карточку на сервере */
  deleteCard(id){
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  /** добавить like */
  addLike(id){
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  /** удалить like */
  deleteLike(id){
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  /** отправить на сервер новые данные аватар */
  editAvatar(avatar){
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
    .then(this._checkResponse)
  }

}

const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
  }
});

export default api;
