import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetchData from "./fetchData";

const BeerRecipe = (props) => {
  const [details, setDetails] = useState([]);

  function Twist(twistData) {
    const splittedData = twistData.split(", ");
    return splittedData;
  }

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
    <div id="recipePageBody">
      {details.name && (
        <div id="recipeContainer">
          <br></br>
          <div id="recipeHeadContainer">
            <div id="recipeHead">
              <img src={details.image_url}></img>
              <div id="recipeInformationHolder">
                <div id="recipeTitle">
                  <h1> {details.name} </h1>
                  <h2> {details.tagline} </h2>
                </div>
                <h4 id="beerDescription"> {details.description} </h4>
                <div id="recipeParameters">
                  <br></br>
                  <div>
                    <span> ABV: {details.abv}% </span>
                    <span> IBU: {details.ibu} </span>
                    <span> EBC: {details.ebc} </span>
                    <span> SRM: {details.srm} </span>
                  </div>
                  <div>
                    <span> pH: {details.ph}; </span>
                    <span>
                      {" "}
                      Attenuation level: {details.attenuation_level}{" "}
                    </span>
                  </div>
                  <div>
                    <span>
                      {" "}
                      Target OG: {details.target_og} Target FG:{" "}
                      {details.target_fg}{" "}
                    </span>
                  </div>
                  <div>
                    <p>
                      Volume: {details.volume.value} {details.volume.unit}{" "}
                    </p>
                    <p>
                      Boil Volume: {details.boil_volume.value}{" "}
                      {details.boil_volume.unit}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div id="recipeIngredientsHolder">
              <h3>Ingredients:</h3>
              <div>
                <ul id="maltList">
                  {details.ingredients.malt.map((malt) => {
                    return (
                      <li>
                        <p className="malt"></p>
                        {malt.name}
                        {" - "}
                        {malt.amount.value} {malt.amount.unit}
                      </li>
                    );
                  })}
                </ul>
                <ul id="hopList">
                  {details.ingredients.hops.map((hop) => {
                    return (
                      <li>
                        <p className="hop"></p>
                        {hop.name}
                        {" - "}
                        {hop.amount.value} {hop.amount.unit} at the {hop.add} of
                        the boil
                      </li>
                    );
                  })}
                </ul>
                {details.method.twist != null ? (
                  <ul id="additionList">
                    {Twist(details.method.twist).map((addition) => {
                      return (
                        <li>
                          <p className="addition"></p>
                          <span>{addition}</span>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  console.log("No twists on this!")
                )}

                <ul id="yeastList">
                  <li>
                    <p className="yeast"></p>
                    {details.ingredients.yeast}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div id="recipeMethod">
            <h3>Instructions:</h3>
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
            <h5 id="recipeContributor">{details.contributed_by}</h5>
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
