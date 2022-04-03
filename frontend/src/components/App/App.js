import "./App.css";

import { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import tmdbApi from "../../utils/tmdbApi";
import mainApi from "../../utils/mainApi";

import SideNav from "../SideNav/SideNav";
import Home from "../Pages/Home/Home";
import Movies from "../Pages/Movies/Movies";
import Tv from "../Pages/Tv/Tv";
import Bookmark from "../Pages/Bookmark/Bookmark";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Modal from "../Modal/Modal";

function App() {
  const [trending, setTrending] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);
  const [searchResult, setSearchReult] = useState([]);
  const [bookmarkedMovies, setBookMarkedMovies] = useState([]);
  const [bookmarkedTv, setBookMarkedTv] = useState([]);
  const [bookmarked, setBookmarked] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCard, setModalCard] = useState({});
  const [modalTrailer, setModalTrailer] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [registerationError, setRegisterationError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isSending, setIsSending] = useState(false);

  const history = useHistory();

  // checking if user already logged in
  useEffect(() => {
    if (token) {
      mainApi.updateToken(token);

      mainApi
        .checkToken(token)
        .then(() => {
          setLoggedIn(true);
        })
        .catch((err) => {
          if (err === 400) {
            console.log(
              "400 — Token not provided or provided in the wrong format"
            );
          } else if (err === 401) {
            console.log("401 — The provided token is invalid ");
          }
        });

      mainApi
        .getMedia()
        .then((media) => {
          const movies = media.filter((movie) => movie.media_type !== "tv");
          const tv = media.filter((movie) => movie.media_type !== "movie");
          setBookmarked(media);
          setBookMarkedMovies(movies);
          setBookMarkedTv(tv);
        })
        .catch((err) => {
          console.log(
            "there was a problem getting saved articles from the server",
            err
          );
        });
    }
  }, [token]);

  useEffect(() => {
    tmdbApi
      .getTrending()
      .then((tmdb) => {
        setTrending(tmdb.results);
      })
      .catch((err) => {
        console.log("there was a problem getting info", err);
      });

    tmdbApi
      .getRecommended()
      .then((tmdb) => {
        setRecommended(tmdb.results);
      })
      .catch((err) => {
        console.log("there was a problem getting info", err);
      });

    tmdbApi
      .getMovies(1)
      .then((tmdb) => {
        setMovies(tmdb.results);
      })
      .catch((err) => {
        console.log("there was a problem getting info", err);
      });

    tmdbApi
      .getTv(1)
      .then((tmdb) => {
        setTv(tmdb.results);
      })
      .catch((err) => {
        console.log("there was a problem getting info", err);
      });
  }, []);

  const handleSearch = (keyword, type) => {
    tmdbApi
      .search(keyword, type)
      .then((tmdbi) => {
        setSearchReult(tmdbi.results);
      })
      .catch((err) => {
        console.log("there was a problem getting info", err);
      });
  };

  const handleBookmarkedSearch = (keyword) => {
    const result = bookmarked.filter(
      (media) => media.title.toLowerCase() === keyword.toLowerCase()
    );
    setSearchReult(result);
  };

  const handleCardClick = (id, type) => {
    setIsModalOpen(!isModalOpen);

    tmdbApi
      .getDetails(id, type)
      .then((tmdbi) => {
        setModalCard(tmdbi);
      })
      .catch((err) => {
        console.log("there was a problem getting info", err);
      });

    tmdbApi
      .getTrailer(id, type)
      .then((tmdb) => {
        tmdb.results.forEach((trailer) => {
          if (trailer.site === "YouTube" && trailer.iso_639_1 === "en") {
            setModalTrailer(trailer.key);
          }
        });
      })
      .catch((err) => {
        console.log("there was a problem getting info", err);
      });
  };

  const handleShowMore = (page, type) => {
    if (type === "movie") {
      tmdbApi
        .getMovies(page)
        .then((tmdb) => {
          setMovies([...movies, ...tmdb.results]);
        })
        .catch((err) => {
          console.log("there was a problem getting info", err);
        });
    } else {
      tmdbApi
        .getTv(page)
        .then((tmdb) => {
          setTv([...tv, ...tmdb.results]);
        })
        .catch((err) => {
          console.log("there was a problem getting info", err);
        });
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleBookmarkClick = (id, poster, date, type, title) => {
    console.log(id, poster, date, type, title);
    mainApi
      .saveMedia(id, poster, date, type, title)
      .then((media) => {
        setBookmarked([media, ...bookmarked]);
        if (media.media_type === "movie") {
          setBookMarkedMovies([media, ...bookmarkedMovies]);
        } else {
          setBookMarkedTv([media, ...bookmarkedTv]);
        }
      })
      .catch((err) => {
        console.log("there was a problem saving media", err);
      });
  };

  const handleBookmarkRemove = (id) => {
    mainApi.deleteMedia(id).then((media) => {
      const newBookmarked = bookmarked.filter((c) => c._id !== media._id);
      const newBookmarkdedMovies = bookmarkedMovies.filter(
        (c) => c._id !== media._id
      );
      const newBookmarkedTv = bookmarkedTv.filter((c) => c._id !== media._id);

      setBookmarked(newBookmarked);
      setBookMarkedMovies(newBookmarkdedMovies);
      setBookMarkedTv(newBookmarkedTv);
    });
  };

  const handleLogin = (email, password) => {
    setIsSending(true);
    mainApi
      .login(email, password)
      .then((data) => {
        setLoggedIn(true);
        setToken(data.token);
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", email);
        history.push("/");
      })
      .catch((err) => {
        if (err === "Error: 404") setLoginError("User not found");
        else if (err === "Error: 500") {
          setLoginError("Server error, please try again later");
        }
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  const handleRegister = (email, password) => {
    mainApi
      .register(email, password)
      .then(() => {
        history.push("/login");
      })
      .catch((err) => {
        if (err === "Error: 409") {
          setRegisterationError("User already exists");
        } else if (err === "Error: 500") {
          setRegisterationError("Server error, please try again later");
        }
      });
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setToken("");
    localStorage.removeItem("token", "");
    localStorage.removeItem("email", "");
  };

  return (
    <div className="App">
      <SideNav loggedIn={loggedIn} onLogout={handleLogout} />

      <Switch>
        <Route path="/login">
          <Login
            onLogin={handleLogin}
            isSending={isSending}
            loginError={loginError}
          />
        </Route>

        <Route path="/signup">
          <Register
            onRegister={handleRegister}
            isSending={isSending}
            registerationError={registerationError}
          />
        </Route>

        <Route exact path="/">
          <Home
            trending={trending}
            recommended={recommended}
            onSearch={handleSearch}
            searchResult={searchResult}
            onCardClick={handleCardClick}
            onBookmarkClick={handleBookmarkClick}
            onRemove={handleBookmarkRemove}
            bookmarked={bookmarked}
            loggedIn={loggedIn}
          />
        </Route>

        <Route path="/movies">
          <Movies
            movies={movies}
            onSearch={handleSearch}
            searchResult={searchResult}
            onCardClick={handleCardClick}
            onShowMore={handleShowMore}
            onBookmarkClick={handleBookmarkClick}
            onRemove={handleBookmarkRemove}
            bookmarked={bookmarked}
            loggedIn={loggedIn}
          />
        </Route>

        <Route path="/tv">
          <Tv
            tv={tv}
            onSearch={handleSearch}
            searchResult={searchResult}
            onCardClick={handleCardClick}
            onShowMore={handleShowMore}
            onBookmarkClick={handleBookmarkClick}
            onRemove={handleBookmarkRemove}
            bookmarked={bookmarked}
            loggedIn={loggedIn}
          />
        </Route>

        <ProtectedRoute path="/saved" loggedIn={loggedIn}>
          <Bookmark
            movies={bookmarkedMovies}
            tv={bookmarkedTv}
            onSearch={handleBookmarkedSearch}
            searchResult={searchResult}
            onCardClick={handleCardClick}
            onBookmarkClick={handleBookmarkClick}
            onRemove={handleBookmarkRemove}
            bookmarked={bookmarked}
            loggedIn={loggedIn}
          />
        </ProtectedRoute>
      </Switch>

      <Modal
        card={modalCard}
        trailer={modalTrailer}
        isModalOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
}

export default App;
