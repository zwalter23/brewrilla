import React from "react";

export default function BeerCollection({ collection }) {
  return (
    <div>
      {collection.map((beer) => {
        return <div className="cards">
          <div className="card">
        <p>{beer.name}</p>
        </div>
        <div className="pagination">
          <div className="previous"/>
            <div className="next"/>
          </div>
        </div>
      })}
    </div>
  );
}
