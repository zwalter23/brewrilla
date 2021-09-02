import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import fetchData from "./fetchData";

export const BeerDetails = ({ addTasted }) => {
  const [details, setDetails] = useState([]);
  const { id } = useParams();
  console.log(addTasted);
  useEffect(() => {
    const url = `https://api.punkapi.com/v2/beers/${id}`;

    fetchData(url).then((result) => {
      try {
        setDetails(result.data[0]);
      } catch (TypeError) {
        console.error(TypeError);
        console.log("Check if there is a beer with the given ID");
      }
    });
  }, [id]);

  return (
    <div id="beerDetailContainer">
      <div className="pageLink">
        <Link to={`/recipe/${details.id}`}>I want to brew this</Link>
      </div>
      {details.name && (
        <>
          <div className="add_btns">
            <div className="brewed_btn">
              <p></p>
            </div>
            <div
              onClick={() => {
                addTasted(details.name);
              }}
              className="tasted_btn"
            >
              <p></p>
            </div>
          </div>
          <div id="beerDetailHead">
            <img src={details.image_url} alt=""></img>
            <div id="beerDetailInformationHolder">
              <div id="beerDetailTitle">
                <h1>{details.name}</h1>
                <h2>{details.tagline}</h2>
              </div>
              <h4 className="beerDescription">{details.description}</h4>
              <div className="recipeParameters">
                <span>ABV: {details.abv}% </span>
                <span> IBU: {details.ibu}</span>
                <span> EBC: {details.ebc} </span>
                <span> SRM: {details.srm} </span>
              </div>
            </div>
          </div>
          <br></br>
          <br></br>
          <div>
            <h4>Have a pint of '{details.name}' with: </h4>
            <br></br>
            <ul className="foodList">
              {details.food_pairing.map((food) => {
                return (
                  <li>
                    {" "}
                    <p className="food"></p>
                    {food}{" "}
                  </li>
                );
              })}
            </ul>
          </div>
          <h5>First brewed: {details.first_brewed}</h5>
        </>
      )}
    </div>
  );
};
