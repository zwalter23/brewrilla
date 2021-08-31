import React from "react";
import { Link } from "react-router-dom";

export default function BeerCollection({ collection, pageCtrl, page }) {
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
            <Link className="link" to={`/${beer.id}`}>{beer.name}</Link>
          </div>
        </div>
      })}
      <div className="pagination">
        {page !== 1 && <div className="previous" onClick={previousPg} />}
        <p>Page {page}</p>
        <div className="next" onClick={nextPg} />
      </div>
    </div>
  );
}
