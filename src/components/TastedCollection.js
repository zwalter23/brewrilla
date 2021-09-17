import React from "react";

export const TastedCollection = ({ tastedCollection }) => {
  return (
    <div>
      <div className="collectionContainer">
        {/* <h1>Tasted Beers</h1> */}
        <ul>
          {tastedCollection &&
            tastedCollection.length !== 0 &&
            tastedCollection.map((tastedBeer) => {
              return <li className="collectionItem">{tastedBeer}</li>;
            })}
        </ul>
      </div>
    </div>
  );
};
