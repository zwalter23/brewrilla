import React from "react";

export const BrewedCollection = ({ brewedCollection }) => {
  return (
    <div>
      <div className="collectionContainer">
        {/* <h1>Brewed Beers</h1> */}
        <ul>
          {brewedCollection &&
            brewedCollection.length !== 0 &&
            brewedCollection.map((brewedBeer) => {
              return <li className="collectionItem">{brewedBeer}</li>;
            })}
        </ul>
      </div>
    </div>
  );
};
