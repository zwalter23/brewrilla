import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetchData from "./fetchData";

export const BeerDetails = (props) => {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const id = props.match.params.id;
    const url = `https://api.punkapi.com/v2/beers/${id}`;

    fetchData(url).then((result) => {
      try {
        setDetails(result.data[0]);
      } catch (TypeError) {
        console.error(TypeError);
        console.log("Check if there is a beer with the given ID");
      }
    });
  }, [props.match.params.id]);

  return (
    <div className="div">
      <div className="pageLink">
        <Link className="hideDecor" to="/">
          Home
        </Link>
        <br></br>
        <Link className="hideDecor" to={`/recipe/${details.id}`}>
          I want to brew this
        </Link>
      </div>
      {details.name && (
        <>
          <img className="image" src={details.image_url} alt=""></img>
          <h1>{details.name}</h1>
          <h2>{details.tagline}</h2>
          <h4>ABV: {details.abv}%</h4>
          <h4>IBU: {details.ibu}</h4>
          <h5>First brewed: {details.first_brewed}</h5>
          <br></br>
          <div>
            <p>Have a glass of {details.name} with: </p>
            {details.food_pairing.map((food) => (
              <p key={details.id}> {food} </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
