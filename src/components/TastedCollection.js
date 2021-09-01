import React from "react";

export const TastedCollection = ({ tastedCollection }) => {
  return (
    <div>
      <h1>Tasted Beers</h1>
      <ul>
        {tastedCollection &&
          tastedCollection.length !== 0 &&
          tastedCollection.map((tastedBeer) => {
            return <li>{tastedBeer}</li>;
          })}
      </ul>
    </div>
  );
};
