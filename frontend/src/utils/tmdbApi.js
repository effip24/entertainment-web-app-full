class TmdbApi {
  /** constructor of TmdbApi class.
   * @param  baseUrl - the URL to make the request to.
   */
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
    this._apiKey = process.env;
    this._page = "4";
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getTrending() {
    return fetch(
      `${this._baseUrl}/trending/all/day?api_key=${this._apiKey}`
    ).then((res) => {
      return this._checkResponse(res);
    });
  }

  getRecommended() {
    return fetch(
      `${this._baseUrl}/trending/all/day?api_key=${this._apiKey}&page=${this._page}`
    ).then((res) => {
      return this._checkResponse(res);
    });
  }

  getMovies(page) {
    return fetch(
      `${this._baseUrl}/discover/movie?api_key=${this._apiKey}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=true&page=${page}`
    ).then((res) => {
      return this._checkResponse(res);
    });
  }

  getTv(page) {
    return fetch(
      `${this._baseUrl}/discover/tv?api_key=${this._apiKey}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=true&page=${page}`
    ).then((res) => {
      return this._checkResponse(res);
    });
  }

  getDetails(id, type) {
    return fetch(
      `${this._baseUrl}/${type}/${id}?api_key=${this._apiKey}&language=en-US`
    ).then((res) => {
      return this._checkResponse(res);
    });
  }

  getTrailer(id, type) {
    return fetch(
      `${this._baseUrl}/${type}/${id}/videos?api_key=${this._apiKey}&language=en-US`
    ).then((res) => {
      return this._checkResponse(res);
    });
  }

  search(key, type) {
    return fetch(
      `${this._baseUrl}/search/${type}?api_key=${this._apiKey}&language=en-US&query=${key}&include_adult=true`
    ).then((res) => {
      return this._checkResponse(res);
    });
  }
}

const tmdbApi = new TmdbApi("http://localhost:3000");

export default tmdbApi;
