import React from "react";
import Search from "./Search";
import { Link } from "react-router-dom";

export default function BeerCollection({
  collection,
  pageCtrl,
  page,
  search,
  filter,
}) {
  const nextPg = () => {
    pageCtrl(1, filter);
  };

  const previousPg = () => {
    pageCtrl(-1, filter);
  };

  return (
    <>
      <div className="beer_collection">
        <div className="page_content">
         <Search search={search} />
          <div className="cards">
            {collection.map((beer) => {
              return (
                <div className="card">
                  <div className="content">
                     <Link to={`/${beer.id}`}>{beer.name}</Link>
                  </div>
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
