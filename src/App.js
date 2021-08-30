import { useState, useEffect } from "react";
import BeerCollection from "./components/BeerCollection";
import fetchData from "./components/fetchData";

function App() {
  const [beers, setBeerCollection] = useState([]);

  useEffect(() => {
    fetchData("https://api.punkapi.com/v2/beers?per_page=80").then((res) => {
      setBeerCollection(res.data);
    });
  }, []);
  return (
    <div className="App">
      <BeerCollection collection={beers} />
    </div>
  );
}

export default App;
