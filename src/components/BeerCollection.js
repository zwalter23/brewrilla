import React from "react";

export default function BeerCollection({ collection, pageCtrl, page }) {
  const nextPg = () => {
    pageCtrl(1);
  };

  const previousPg = () => {
    pageCtrl(-1);
  };

  return (
    <>
      <div className="beer_collection">
        <div className="page_content">
          <div className="search_bar"></div>
          <div className="cards">
            {collection.map((beer) => {
              return (
                <div className="card">
                  <p>{beer.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pagination">
          {page !== 1 && <div className="previous" onClick={previousPg} />}
          <p>Page {page}</p>
          <div className="next" onClick={nextPg} />
        </div>
      </div>
    </>
  );
}
