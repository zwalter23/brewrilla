import { useState, useEffect } from "react";
import BeerCollection from "./components/BeerCollection";
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

  return (
    <div className="layout">
      <div className="navbar">
        <p>Menu1</p>
        <p>Menu2</p>
        <p>Menu3</p>
        <p>Menu4</p>
        <p>Menu5</p>
      </div>
      <div className="pagecontent">
        <BeerCollection
          collection={beers}
          pageCtrl={changePage}
          page={currentPage}
        />
      </div>
    </div>
  );
}

export default App;
