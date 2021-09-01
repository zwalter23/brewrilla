import React from "react";

export const TastedCollection = ({ tastedCollection, handleClick }) => {
  return (
    <div>
      <h1>Tasted Beers</h1>
      <button onClick={handleClick}>Change</button>
      <ul>
        {tastedCollection.length !== 0 &&
          tastedCollection.map((tastedBeer) => {
            return <li>{tastedBeer}</li>;
          })}
      </ul>
    </div>
  );
};
