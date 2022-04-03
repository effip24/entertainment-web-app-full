import "./Home.css";

import trendingSlider from "../../../utils/slider";

import SearchBar from "../../SearchBar/SearchBar";
import CardsList from "../../CardsList/CardsList";
import TrendingCard from "./TrendingCard/TrendingCard";
import Card from "../../Card/Card";

import { useEffect, useState } from "react";

const Home = ({
  trending,
  recommended,
  onSearch,
  searchResult,
  onCardClick,
  onBookmarkClick,
  onRemove,
  bookmarked,
  loggedIn,
}) => {
  useEffect(() => {
    trendingSlider();
  }, []);

  return (
    <section className="home">
      <SearchBar
        placeholder={"Search for movies or TV series"}
        onSearch={onSearch}
        searchResult={searchResult}
        onCardClick={onCardClick}
        onBookmarkClick={onBookmarkClick}
        bookmarked={bookmarked}
        onRemove={onRemove}
        loggedIn={loggedIn}
      />

      <div className="trending">
        <h1 className="trending__title">Trending</h1>
        <ul className="trending__list">
          {trending.map((card, id) => (
            <TrendingCard
              key={id}
              card={card}
              onCardClick={onCardClick}
              onBookmarkClick={onBookmarkClick}
              onRemove={onRemove}
              bookmarked={bookmarked}
              loggedIn={loggedIn}
            />
          ))}
        </ul>
      </div>

      <div className="recommended">
        <CardsList title="Recommended for you">
          {recommended.map((card, id) => (
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
      </div>
    </section>
  );
};
export default Home;
