import "./TrendingCard.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const TrendingCard = ({
  card,
  onCardClick,
  onBookmarkClick,
  onRemove,
  bookmarked,
  loggedIn,
}) => {
  const [showBookmarkMessage, setShowBookmarkMessage] = useState(false);

  const location = useLocation();

  const isHome = location.pathname === "/" ? card.media_type : null;
  const isMovies = location.pathname === "/movies" ? "movie" : null;
  const isTv = location.pathname === "/tv" ? "tv" : null;

  const isSaved = bookmarked.some((c) => c.id === card.id.toString());

  const handleCardClick = () => {
    onCardClick(card.id, card.media_type);
  };

  const handleBookmarkClick = () => {
    if (!loggedIn) return;
    if (!isSaved) {
      onBookmarkClick(
        card.id,
        card.poster_path,
        card.release_date || card.first_air_date,
        isHome || isMovies || isTv,
        card.title || card.name
      );
    } else {
      const id = bookmarked.filter((c) => c.id === card.id.toString());
      onRemove(id[0]._id);
    }
  };

  const handleBookmarMouseEnter = () => {
    if (!loggedIn) setShowBookmarkMessage(true);
  };

  const handleBookmarkMouseLeave = () => {
    setShowBookmarkMessage(false);
  };

  return (
    <li className="trending-card">
      <div
        className="card__bookmark-wrap"
        onMouseEnter={handleBookmarMouseEnter}
        onMouseLeave={handleBookmarkMouseLeave}
      >
        <label
          className={`card__bookmark-text ${
            showBookmarkMessage ? "card__bookmark-text_show" : ""
          }`}
        >
          Please log in
        </label>
        <i
          className={`card__bookmark ${isSaved ? "card__bookmark_full" : ""}`}
          alt="bookmark"
          onClick={handleBookmarkClick}
        ></i>
      </div>
      <img
        className="trending-card__img"
        src={`https://image.tmdb.org/t/p/original/${card.poster_path}`}
        alt="card"
      ></img>

      <div className="trending-card__info-wrap" onClick={handleCardClick}>
        <div className="card__info-list">
          <p className="card__info">
            {card.release_date || card.first_air_date}
          </p>

          <i className="card__info-seperator"></i>

          <div className="card__info-type">
            <i className="card__info-icon"></i>
            <p className="card__info">{card.media_type}</p>
          </div>
        </div>

        <p className="card__title">{card.title || card.name}</p>
      </div>
    </li>
  );
};
export default TrendingCard;
