import React from "react";

export default function BeerCollection({ collection }) {
  return (
    <div>
      {collection.map((beer) => {
        return <p>{beer.name}</p>;
      })}
    </div>
  );
}
