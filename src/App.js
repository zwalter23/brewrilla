import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import BeerCollection from "./components/BeerCollection";
import { BeerDetails } from "./components/BeerDetails";
import BeerRecipe from "./components/BeerRecipe";
import fetchData from "./components/fetchData";
import { TastedCollection } from "./components/TastedCollection";
import { BrewedCollection } from "./components/BrewedCollection";
import { Login } from "./components/Login";
import { RandomBeer } from "./components/RandomBeer";


function App() {
  const [beers, setBeerCollection] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);
  const [tastedBeers, setTasted] = useState([]);
  const [filter, setFilter] = useState([]);
  const [brewedBeers, setBrewed] = useState([]);
  const [usernames, setUsernames] = useState(["zsofi", "kristof", "walter"]);
  const [passwords, setPasswords] = useState(["zsofi", "kristof", "walter"]);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");




  useEffect(() => {
    getBeersByPage(1);
    getTastedBeerList();
    getBrewedBeerList();
    if (usernames.includes(username)) {
      if (passwords[usernames.indexOf(username)] === password) {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("username", username);
      }
    }
  }, [usernames, username, password, passwords]);

  const getTastedBeerList = () => {
    const localData = localStorage.getItem("tastedBeers");
    if (localData != null) {
      setTasted(JSON.parse(localData));
    } else {
      setTasted([]);
    }
  };

  const getBrewedBeerList = () => {
    const localData = localStorage.getItem("brewedBeers");
    if (localData != null) {
      setBrewed(JSON.parse(localData));
    } else {
      setBrewed([]);
    }
  };

  const removeBrewed = (beer) => {
    const index = brewedBeers.indexOf(beer);
    brewedBeers.splice(index, 1);
    localStorage.setItem("brewedBeers", JSON.stringify(brewedBeers));
    getBrewedBeerList();
  };

  const addBrewed = (brewedBeer) => {
    brewedBeers.push(brewedBeer);
    localStorage.setItem("brewedBeers", JSON.stringify(brewedBeers));
    getBrewedBeerList();
  };

  const removeTasted = (beer) => {
    const index = tastedBeers.indexOf(beer);
    tastedBeers.splice(index, 1);
    localStorage.setItem("tastedBeers", JSON.stringify(tastedBeers));
    getBrewedBeerList();
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
          <Link to="/get-random" >
            <div>
              <h3>Random beer</h3>
            </div>
          </Link>
          <Link to="/tastedlist">
            <div>
              <h3>Tasted beers</h3>
            </div>
          </Link>
          <Link to="/brewedlist">
            <div>
              <h3>Brewed beers</h3>
            </div>
          </Link>
          {/* <div>
            <h3>Menu4</h3>
          </div>
          <div>
            <h3>Menu5</h3>

          </div> */}
          <Link to="/home">
            <div>
              <h3>Home</h3>
            </div>
          </Link>
        </div>
        <Route
          path={"/login"}
          exact
          render={() => (
            <Login setUserName={setUserName} setPassword={setPassword} />
          )}
        />
        <Route
          path={"/home"}
          exact
          render={() => (
            <BeerCollection
              collection={beers}
              pageCtrl={changePage}
              page={currentPage}
              search={searchQuery}
              filter={filter}
              addTasted={addTasted}
              addBrewed={addBrewed}
              removeBrewed={removeBrewed}
              removeTasted={removeTasted}
              brewedList={brewedBeers}
              tastedList={tastedBeers}
              username={username}
            />
          )}
        />
        <Route path={`/beer/:id`} exact>
          <BeerDetails
            addTasted={addTasted}
            addBrewed={addBrewed}
            removeBrewed={removeBrewed}
            removeTasted={removeTasted}
            brewedList={brewedBeers}
            tastedList={tastedBeers}
          />
        </Route>
        <Route
          path={`/tastedlist`}
          exact
          render={() => <TastedCollection tastedCollection={tastedBeers} />}
        />
        <Route
          path={`/brewedlist`}
          exact
          render={() => <BrewedCollection brewedCollection={brewedBeers} />}
        />
        <Route
          path={`/recipe/:id`}
          render={(props) => <BeerRecipe {...props} />}
          exact
        />
        <Route
          path={'/get-random'}
          render={(props) => <RandomBeer
            key={props.match.params.id}
            addTasted={addTasted}
            addBrewed={addBrewed}
            removeBrewed={removeBrewed}
            removeTasted={removeTasted}
            brewedList={brewedBeers}
            tastedList={tastedBeers}
          />}
          exact
        />
      </div>
    </Router>
  )
}

export default App;
