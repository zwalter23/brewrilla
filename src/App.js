import { useState, useEffect } from "react";
import BeerCollection from "./components/BeerCollection";
import fetchData from "./components/fetchData";
import { TastedCollection } from "./components/TastedCollection";

function App() {
  const [beers, setBeerCollection] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);
  const [tastedBeers, setTasted] = useState([]);

  useEffect(() => {
    const getTastedBeerList = () => {
      const localData = localStorage.getItem("tastedBeers");
      setTasted(JSON.parse(localData));
    };

    getBeersByPage(1);
    getTastedBeerList();
  }, []);

  const changeTasted = () => {
    localStorage.setItem("tastedBeers", JSON.stringify(["3", "egy"]));
    setTasted(["3", "egy"]);
  };

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

  return (
    <div className="App">
      <BeerCollection
        collection={beers}
        pageCtrl={changePage}
        page={currentPage}
      />
      <TastedCollection
        tastedCollection={tastedBeers}
        handleClick={changeTasted}
      />
    </div>
  );
}

export default App;
