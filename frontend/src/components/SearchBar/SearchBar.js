import "./SearchBar.css";

import CardsList from "../CardsList/CardsList";
import Card from "../Card/Card";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchBar = ({
  placeholder,
  onSearch,
  searchResult,
  onCardClick,
  onBookmarkClick,
  bookmarked,
}) => {
  const [keyword, setKeyWord] = useState("");
  const [isSearched, setIsSearched] = useState(false);

  const location = useLocation();

  const isMulti = location.pathname === "/" ? "multi" : null;
  const isMovie = location.pathname === "/movies" ? "movie" : null;
  const isTv = location.pathname === "/tv" ? "tv" : null;

  useEffect(() => {
    setIsSearched(false);
    setKeyWord("");
  }, []);

  const onKeyWordChange = (e) => {
    setKeyWord(e.target.value);
    e.target.value === ""
      ? setIsSearched(!isSearched)
      : setIsSearched(isSearched);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSearched(!isSearched);

    onSearch(keyword, isMulti || isMovie || isTv);
  };
  return (
    <div className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <div className="search__form-container">
          <i className="search__icon"></i>
          <input
            className="search__input"
            placeholder={placeholder}
            value={keyword}
            onChange={onKeyWordChange}
          ></input>
        </div>
      </form>

      <div
        className="search__result"
        style={{ display: `${isSearched ? "flex" : "none"}` }}
      >
        <CardsList
          title={`Found ${searchResult.length} results for '${keyword}'`}
        >
          {searchResult.map((card, id) => (
            <Card
              key={id}
              card={card}
              onCardClick={onCardClick}
              onBookmarkClick={onBookmarkClick}
              bookmarked={bookmarked}
            />
          ))}
        </CardsList>
      </div>
    </div>
  );
};
export default SearchBar;
