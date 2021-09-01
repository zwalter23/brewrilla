import React from 'react'
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import fetchData from './fetchData';

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
            {details.name &&
                <>
                    <h1> {details.name} </h1>


                </>
            }
        </div>
    )
}

export default BeerRecipe
