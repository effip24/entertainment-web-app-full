import "./Bookmark.css";

import SearchBar from "../../SearchBar/SearchBar";
import CardsList from "../../CardsList/CardsList";
import Card from "../../Card/Card";

const Bookmark = ({
  movies,
  tv,
  onSearch,
  searchResult,
  onCardClick,
  onRemove,
  bookmarked,
  loggedIn,
}) => {
  return (
    <section className="bookmark">
      <SearchBar
        placeholder={"Search for bookmarked"}
        onSearch={onSearch}
        searchResult={searchResult}
        onCardClick={onCardClick}
        bookmarked={bookmarked}
        onRemove={onRemove}
        loggedIn={loggedIn}
      />

      <div className="bookmark__container">
        <CardsList title="Bookmared Movies">
          {movies.map((card, id) => (
            <Card
              key={id}
              card={card}
              onCardClick={onCardClick}
              bookmarked={bookmarked}
              onRemove={onRemove}
              loggedIn={loggedIn}
            />
          ))}
        </CardsList>
      </div>

      <div className="bookmark__container">
        <CardsList title="Bookmarked TV Series">
          {tv.map((card, id) => (
            <Card
              key={id}
              card={card}
              onCardClick={onCardClick}
              bookmarked={bookmarked}
              onRemove={onRemove}
              loggedIn={loggedIn}
            />
          ))}
        </CardsList>
      </div>
    </section>
  );
};
export default Bookmark;
