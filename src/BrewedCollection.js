import React from "react";

export const BrewedCollection = ({ brewedCollection }) => {
  return (
    <div>
      <h1>Brewed Beers</h1>
      <ul>
        {brewedCollection &&
          brewedCollection.length !== 0 &&
          brewedCollection.map((tastedBeer) => {
            return <li>{tastedBeer}</li>;
          })}
      </ul>
    </div>
  );
};
