import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, } from "react-router-dom";
import BeerCollection from "./components/BeerCollection";
import { BeerDetails } from "./components/BeerDetails";
import fetchData from "./components/fetchData";

function App() {
  const [beers, setBeerCollection] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);

  useEffect(() => {
    getBeersByPage(1);
  }, []);

  const getBeersByPage = (page) => {
    const url = `https://api.punkapi.com/v2/beers?page=${page}&per_page=6`;
    fetchData(url).then((results) => {
      setBeerCollection(results.data);
    });
    setCurrentPage(page);
  };

  const changePage = (step) => {
    if (parseInt(step) < 0) {
      if (currentPage !== 1) {
        getBeersByPage(currentPage + step);
      }
    } else {
      getBeersByPage(currentPage + step);
    }
  };

  const searchQuery = () => {
    const query = document.getElementById("query");
    const filter = document.getElementById("filters");
    let url = "";

    if (filter.value === "brewed_before") {
      url = `https://api.punkapi.com/v2/beers?${filter.value}=12-${query.value - 1
        }`;
    } else if (filter.value === "brewed_after") {
      url = `https://api.punkapi.com/v2/beers?${filter.value}=01-${query.value}`;
    } else {
      url = `https://api.punkapi.com/v2/beers?${filter.value}=${query.value}`;
    }

    fetchData(url).then((results) => {
      setBeerCollection(results.data);
      console.log(results.data);
    });
  };

  return (
    <Router>
    <div className="layout">
      <div className="navbar">
        <p>Menu1</p>
        <p>Menu2</p>
        <p>Menu3</p>
        <p>Menu4</p>
        <p>Menu5</p>
      </div>
     <Route path="/" exact render={() => {
      <BeerCollection collection={beers} pageCtrl={changePage} page={currentPage} search={searchQuery} />
      </Route>
     <Route
        path={`/:id`}
        render={(props) => <BeerDetails {...props} />}
        exact />
          </div>
</Router>
  );
}

export default App;
