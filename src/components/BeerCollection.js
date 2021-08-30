import React from "react";

export default function BeerCollection({ collection, pageCtrl }) {
const nextPg = () => {
  pageCtrl(1);
}

const previousPg = () => {
  pageCtrl(-1)
}

  return (
    <div>
      {collection.map((beer) => {
        return <div className="cards">
          <div className="card">
        <p>{beer.name}</p>
        </div>
        </div>
      })}
        <div className="pagination">
          <div className="previous" onClick={previousPg}/>
            <div className="next" onClick={nextPg}/>
          </div>
    </div>
  );
}
