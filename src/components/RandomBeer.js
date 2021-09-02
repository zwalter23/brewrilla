import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetchData from "./fetchData";

export const RandomBeer = ({
    addTasted,
    addBrewed,
    removeBrewed,
    removeTasted,
    brewedList,
    tastedList,
}) => {
    const [details, setDetails] = useState([]);
    useEffect(() => {

        const url = "https://api.punkapi.com/v2/beers/random";

        fetchData(url).then((result) => {
            try {
                setDetails(result.data[0]);
            } catch (TypeError) {
                console.error(TypeError);
                console.log("Check if there is a beer with the given ID");
            }
        });
    }, []);

    return (
        <div id="recipeContainer">
            <div className="pageLink">
                <Link to={`/recipe/${details.id}`}>I want to brew this</Link>
            </div>
            {details.name && (
                <>
                    <div className="add_btns">

                        {brewedList.includes(details.name) ? (
                            <div
                                onClick={(event) => {
                                    event.target.classList.toggle("brewed");
                                    if (event.target.classList.contains("brewed")) {
                                        addBrewed(details.name);
                                    } else {
                                        removeBrewed(details.name);
                                    }
                                }}
                                className="brewed_btn brewed"
                                id={`brewbtn${details.id}`}
                            ></div>
                        ) : (
                            <div
                                onClick={(event) => {
                                    event.target.classList.toggle("brewed");
                                    if (event.target.classList.contains("brewed")) {
                                        addBrewed(details.name);
                                    } else {
                                        removeBrewed(details.name);
                                    }
                                }}
                                className="brewed_btn"
                                id={`brewbtn${details.id}`}
                            ></div>
                        )}
                        {tastedList.includes(details.name) ? (
                            <div
                                onClick={(event) => {
                                    event.target.classList.toggle("tasted");
                                    if (event.target.classList.contains("tasted")) {
                                        addTasted(details.name);
                                    } else {
                                        removeTasted(details.name);
                                    }
                                }}
                                className="tasted_btn tasted"
                                id={`tastebtn${details.id}`}
                            ></div>
                        ) : (
                            <div
                                onClick={(event) => {
                                    event.target.classList.toggle("tasted");
                                    if (event.target.classList.contains("tasted")) {
                                        addTasted(details.name);
                                    } else {
                                        removeTasted(details.name);
                                    }
                                }}
                                className="tasted_btn"
                                id={`tastebtn${details.id}`}
                            ></div>
                        )}
                    </div>
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
export default RandomBeer;
