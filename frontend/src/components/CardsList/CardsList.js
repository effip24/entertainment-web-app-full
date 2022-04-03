import "./CardsList.css";
import { useState } from "react";

const CardsList = ({ title, showButton, type, onShowMore, children }) => {
  const [pageCounter, setPageCounter] = useState(2);

  const handleShowMoreClick = () => {
    onShowMore(pageCounter, type);
    setPageCounter(pageCounter + 1);
  };
  return (
    <div className="cards">
      <h1 className="cards__title">{title}</h1>
      <ul className="cards__list">{children}</ul>
      {showButton ? (
        <button className="cards__show-more" onClick={handleShowMoreClick}>
          Show More
        </button>
      ) : (
        ""
      )}
    </div>
  );
};
export default CardsList;
