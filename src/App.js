import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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
    const url = `https://api.punkapi.com/v2/beers?page=${page}&per_page=6`
    fetchData(url).then((results) => { setBeerCollection(results.data) })
    setCurrentPage(page);
  }

  const changePage = (step) => {
    if (parseInt(step) < 0) {
      if (currentPage !== 1) {
        getBeersByPage(currentPage + step);
      }
    } else {
      getBeersByPage(currentPage + step);
    }
  };

  return (
    <Router>
      <Route path="/" exact render={() => <div className="App">
        <BeerCollection collection={beers} pageCtrl={changePage} page={currentPage} />
      </div>}>
      </Route>
      <Route
        path={`/:id`}
        render={(props) => <BeerDetails {...props} />}
        exact
      ></Route>
    </Router>
  );
}

export default App;
