import React from "react";
import Search from "./Search";
import { Link } from "react-router-dom";

export default function BeerCollection({ collection, pageCtrl, page, search }) {
  const nextPg = () => {
    pageCtrl(1);
  }

  const previousPg = () => {
    pageCtrl(-1)
  }

  return (
    <div>
      <div className="pageLink">
        <Link className="hideDecor" to="/random" >Random beer</Link>
      </div>
      <Search search={search} />
      {collection.map((beer) => {
        return <div className="cards">
          <div className="card">
            <Link className="hideDecor" to={`/${beer.id}`}>{beer.name}</Link>
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
