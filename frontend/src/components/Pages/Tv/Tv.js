import "./Tv.css";

import SearchBar from "../../SearchBar/SearchBar";
import CardsList from "../../CardsList/CardsList";
import Card from "../../Card/Card";

const Tv = ({
  tv,
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
    <section className="tv">
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
        title="TV Series"
        showButton={true}
        onShowMore={onShowMore}
        type={"tv"}
      >
        {tv.map((card, id) => (
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
export default Tv;
