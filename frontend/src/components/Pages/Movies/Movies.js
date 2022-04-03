import "./Movies.css";

import SearchBar from "../../SearchBar/SearchBar";
import CardsList from "../../CardsList/CardsList";
import Card from "../../Card/Card";

const Movies = ({
  movies,
  onSearch,
  searchResult,
  onCardClick,
  onShowMore,
  onBookmarkClick,
  onRemove,
  bookmarked,
  loggedIn,
}) => {
  return (
    <section className="movies">
      <SearchBar
        placeholder={"Search for movies"}
        onSearch={onSearch}
        searchResult={searchResult}
        onCardClick={onCardClick}
        onBookmarkClick={onBookmarkClick}
        onRemove={onRemove}
        bookmarked={bookmarked}
        loggedIn={loggedIn}
      />

      <CardsList
        title="Movies"
        showButton={true}
        onShowMore={onShowMore}
        type="movie"
      >
        {movies.map((card, id) => (
          <Card
            key={id}
            card={card}
            onCardClick={onCardClick}
            onBookmarkClick={onBookmarkClick}
            onRemove={onRemove}
            bookmarked={bookmarked}
            loggedIn={loggedIn}
          />
        ))}
      </CardsList>
    </section>
  );
};
export default Movies;
