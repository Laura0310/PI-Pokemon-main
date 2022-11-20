
import React from "react";
import { Link } from "react-router-dom";


const PokemonCard = ({ name, id, type,img }) => {


    return (
        <div className="card">

            <Link to={`/details/${id}`}>
                <h3>{name}</h3>
            </Link>
            <img src={img} alt={name} />
            <p>{type}</p>
        </div>
    );
};


export default PokemonCard;