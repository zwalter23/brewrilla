import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import BeerCollection from "./components/BeerCollection";
import { BeerDetails } from "./components/BeerDetails";
import BeerRecipe from "./components/BeerRecipe";
import fetchData from "./components/fetchData";
import { TastedCollection } from "./components/TastedCollection";

function App() {
  const [beers, setBeerCollection] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);
  const [tastedBeers, setTasted] = useState([]);
  const [filter, setFilter] = useState([]);




  useEffect(() => {
    getBeersByPage(1);
    getTastedBeerList();
  }, []);

  const getTastedBeerList = () => {
    const localData = localStorage.getItem("tastedBeers");
    if (localData) {
      setTasted(JSON.parse(localData));
    } else {
      setTasted([]);
    }
  };

  const addTasted = (tastedBeer) => {
    tastedBeers.push(tastedBeer);
    localStorage.setItem("tastedBeers", JSON.stringify(tastedBeers));
    getTastedBeerList();
  };

  const getBeersByPage = (page, filter = "") => {
    const url = `https://api.punkapi.com/v2/beers?page=${page}&per_page=6&${filter}`;
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
    let filterToPass = "";
    const filterValue = document.getElementById("filters").value;
    const queryValue = document.getElementById("query").value;

    if (queryValue === "") {
      filterToPass = "";
    } else {
      if (filterValue === "brewed_before") {
        filterToPass = `${filterValue}=12-${queryValue - 1}`;
      } else if (filterValue === "brewed_after") {
        filterToPass = `${filterValue}=01-${queryValue}`;
      } else {
        filterToPass = `${filterValue}=${queryValue}`;
      }
    }
    setFilter(filterToPass);
    getBeersByPage(1, filterToPass);
  };


  return (
    <Router>
      <div className="layout">
        <div className="navbar">
          <Link to="/beer/random">Random beer</Link>
          <Link to="/tastedlist">Tasted beers</Link>
          <p>Menu3</p>
          <p>Menu4</p>
          <p>Menu5</p>
          <Link to="/">Home</Link>
        </div>
        <Route
          path={"/"}
          exact
          render={() => (
            <BeerCollection
              collection={beers}
              pageCtrl={changePage}
              page={currentPage}
              search={searchQuery}
              filter={filter}
              addTasted={addTasted}
            />
          )}
        />
        <Route path={`/beer/:id`} exact>
          <BeerDetails addTasted={addTasted} />
        </Route>
        <Route
          path={`/tastedlist`}
          exact
          render={() => <TastedCollection tastedCollection={tastedBeers} />}
        />
        <Route
          path={`/recipe/:id`}
          render={(props) => <BeerRecipe {...props} />}
          exact
        />
      </div>
    </Router>
  )
}

export default App;
