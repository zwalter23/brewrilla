import React from "react";
import { useState, useEffect } from "react";

export const TastedCollection = (tastedCollection) => {
  useEffect(() => {
    localStorage.setItem("tastedBeers", JSON.stringify(tastedCollection));
  }, []);

  console.log(tastedCollection.tastedCollection);
  return (
    <div>
      <h1>Tasted Beers</h1>
      <ul>
        {tastedCollection.tastedCollection.map((tastedBeer) => {
          return <li>{tastedBeer}</li>;
        })}
      </ul>
    </div>
  );
};
