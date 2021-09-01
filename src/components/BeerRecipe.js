import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetchData from "./fetchData";

const BeerRecipe = (props) => {
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
    <div>
      {details.name && (
        <div>
          <img src={details.image_url} height="200px"></img>
          <h1> {details.name} </h1>
          <h2> {details.tagline} </h2>
          <br></br>
          <h4> {details.description} </h4>
          <br></br>
          <div>
            <span>ABV: {details.abv}% </span>
            <span>IBU: {details.ibu} </span>
            <span>EBC: {details.ebc} </span>
            <span>SRM: {details.srm} </span>
          </div>
          <div>
            <span>pH: {details.ph} </span>
            <span>Attenuation level: {details.attenuation_level} </span>
          </div>
          <div>
            <span>Target OG: {details.target_og} </span>
            <span>Target FG: {details.target_fg} </span>
          </div>
          <br></br>
          <div>
            <span>
              Volume: {details.volume.value} {details.volume.unit}{" "}
            </span>
            <span>
              Boil Volume: {details.boil_volume.value}{" "}
              {details.boil_volume.unit}
            </span>
          </div>
          <br></br>
          <div>
            <h3>Ingredients:</h3>
            <br></br>
            <div>
              <ul>
                {details.ingredients.malt.map((malt) => {
                  return (
                    <li>
                      {malt.name}
                      {" - "}
                      {malt.amount.value} {malt.amount.unit}
                    </li>
                  );
                })}
              </ul>
              <br></br>
              <ul>
                {details.ingredients.hops.map((hop) => {
                  return (
                    <li>
                      {hop.name}
                      {" - "}
                      {hop.amount.value} {hop.amount.unit} at the {hop.add} of
                      the boil
                    </li>
                  );
                })}
              </ul>
              <br></br>
              <p>{details.ingredients.yeast}</p>
            </div>
          </div>
          <br></br>
          <div>
            <h3>Method:</h3>
            <br></br>
            <span>
              Mash at {details.method.mash_temp[0].temp.value}{" "}
              {details.method.mash_temp[0].temp.unit} for{" "}
              {details.method.mash_temp[0].duration} minutes
            </span>
          </div>
          <div>
            <p>
              Fermentation temperature: {details.method.fermentation.temp.value}{" "}
              {details.method.fermentation.temp.unit}
            </p>
          </div>
          <br></br>
          <div>
            <h3>Brewer's tips:</h3>
            <br></br>
            <p>{details.brewers_tips}</p>
            <br></br>
            <h5>{details.contributed_by}</h5>
          </div>
          <br></br>
          <div>
            <h3>Goes well with:</h3>
            <br></br>
            <ul>
              {details.food_pairing.map((dish) => {
                return <li>{dish}</li>;
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeerRecipe;
