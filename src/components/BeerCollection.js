import React from "react";
import Search from "./Search";

export default function BeerCollection({ collection, pageCtrl, page, search }) {
  const nextPg = () => {
    pageCtrl(1);
  };

  const previousPg = () => {
    pageCtrl(-1);
  };

  return (
    <div>
      <Search search={search} />
      {collection.map((beer) => {
        return (
          <div className="cards">
            <div className="card">
              <p>{beer.name}</p>
            </div>
          </div>
        );
      })}
      <div className="pagination">
        {page !== 1 && <div className="previous" onClick={previousPg} />}
        <p>Page {page}</p>
        <div className="next" onClick={nextPg} />
      </div>
    </div>
  );
}
