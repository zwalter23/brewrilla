import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import BeerCollection from "./components/BeerCollection";
import { BeerDetails } from "./components/BeerDetails";
import fetchData from "./components/fetchData";

function App() {
  const [beers, setBeerCollection] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    getBeersByPage(1);
  }, []);

  const getBeersByPage = (page, filter = "") => {
    const url = `https://api.punkapi.com/v2/beers?page=${page}&per_page=6&${filter}`;
    console.log(url);
    fetchData(url).then((results) => {
      setBeerCollection(results.data);
    });
    setCurrentPage(page);
  };

  const changePage = (step, filter) => {
    if (parseInt(step) < 0) {
      if (currentPage !== 1) {
        getBeersByPage(currentPage + step, filter);
      }
    } else {
      getBeersByPage(currentPage + step, filter);
    }
  };

  const searchQuery = () => {
    let filter = "";
    if (filter.value === "brewed_before") {
      filter = `${document.getElementById("filters").value}=12-${
        document.getElementById("query").value - 1
      }`;
    } else if (filter.value === "brewed_after") {
      filter = `${document.getElementById("filters").value}=01-${
        document.getElementById("query").value
      }`;
    } else {
      filter = `${document.getElementById("filters").value}=${
        document.getElementById("query").value
      }`;
    }
    setFilter(filter);
    getBeersByPage(1, filter);
  };

  return (
    <Router>
      <Route
        path="/"
        exact
        render={() => (
          <div className="App">
            <BeerCollection
              collection={beers}
              pageCtrl={changePage}
              page={currentPage}
              search={searchQuery}
              filter={filter}
            />
          </div>
        )}
      ></Route>
      <Route
        path={`/:id`}
        render={(props) => <BeerDetails {...props} />}
        exact
      ></Route>
    </Router>
  );
}

export default App;
