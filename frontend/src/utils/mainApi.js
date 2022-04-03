class MainApi {
  /** constructor of MainApi class.
   * @param  baseUrl - the URL to make the request to.
   */
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  updateToken(token) {
    this._headers.authorization = `Bearer ${token}`;
  }

  register(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  checkToken() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  getMedia() {
    return fetch(`${this._baseUrl}/media`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  saveMedia(id, poster_path, release_date, media_type, title) {
    return fetch(`${this._baseUrl}/media`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        id: id.toString(),
        poster_path: poster_path,
        release_date: release_date,
        media_type: media_type,
        title: title,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  deleteMedia(mediaId) {
    return fetch(`${this._baseUrl}/media/${mediaId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
}

const mainApi = new MainApi({
  baseUrl: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    authorization: "",
  },
});

export default mainApi;
