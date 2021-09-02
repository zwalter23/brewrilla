import React from "react";
import Search from "./Search";
import { Link } from "react-router-dom";

export default function BeerCollection({
  collection,
  pageCtrl,
  page,
  search,
  filter,
  addTasted,
  addBrewed,
  removeTasted,
  removeBrewed,
  brewedList,
  tastedList,
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
                  <div className="img_container">
                    <img src={beer.image_url} alt={beer.name}></img>
                  </div>
                  <div className="card_content">
                    <Link to={`/beer/${beer.id}`}>
                      <div className="card_info">
                        <h2>{beer.name}</h2>
                        <h4>{beer.tagline}</h4>
                      </div>
                    </Link>
                    <div className="add_btns">
                      {brewedList.includes(beer.name) ? (
                        <div
                          onClick={(event) => {
                            event.target.classList.toggle("brewed");
                            if (event.target.classList.contains("brewed")) {
                              addBrewed(beer.name);
                            } else {
                              removeBrewed(beer.name);
                            }
                          }}
                          className="brewed_btn brewed"
                          id={`brewbtn${beer.id}`}
                        ></div>
                      ) : (
                        <div
                          onClick={(event) => {
                            event.target.classList.toggle("brewed");
                            if (event.target.classList.contains("brewed")) {
                              addBrewed(beer.name);
                            } else {
                              removeBrewed(beer.name);
                            }
                          }}
                          className="brewed_btn"
                          id={`brewbtn${beer.id}`}
                        ></div>
                      )}
                      {tastedList.includes(beer.name) ? (
                        <div
                          onClick={(event) => {
                            event.target.classList.toggle("tasted");
                            if (event.target.classList.contains("tasted")) {
                              addTasted(beer.name);
                            } else {
                              removeTasted(beer.name);
                            }
                          }}
                          className="tasted_btn tasted"
                          id={`tastebtn${beer.id}`}
                        ></div>
                      ) : (
                        <div
                          onClick={(event) => {
                            event.target.classList.toggle("tasted");
                            if (event.target.classList.contains("tasted")) {
                              addTasted(beer.name);
                            } else {
                              removeTasted(beer.name);
                            }
                          }}
                          className="tasted_btn"
                          id={`tastebtn${beer.id}`}
                        ></div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pagination">
          {page !== 1 ? (
            <div className="previous active" onClick={previousPg} />
          ) : (
            <div className="previous" onClick={previousPg} />
          )}
          <div className="next" onClick={nextPg} />
        </div>
      </div>
    </>
  );
}
