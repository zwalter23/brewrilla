import React from 'react'
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import fetchData from './fetchData';

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
                <Link className="hideDecor" to="/">Home</Link><br></br>
                <Link className="hideDecor" to={`/recipe/${details.id}`}>I want to see the recipe</Link>
            </div>
            {details.name &&
                <>
                    <img className="image" src={details.image_url} alt="" ></img>
                    <p>Name: {details.name}</p>
                    <p>Beer Style: {details.tagline}</p>
                    <p>ABV: {details.abv}%</p>
                    <p>IBU: {details.ibu}</p>
                    <div>
                        <p>Perfectly pairing food: </p>
                        {details.food_pairing.map(food => <p key={details.id} > {food} </p>)}
                    </div>
                    <p>First brewed: {details.first_brewed}</p>
                    <p>Contributor: {details.contributed_by} </p>
                </>
            }
        </div>
    )
}
