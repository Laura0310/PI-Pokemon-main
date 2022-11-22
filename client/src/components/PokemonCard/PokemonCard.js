
import React from "react";
import { Link } from "react-router-dom";
import "./PokemonCard.css"

const PokemonCard = ({ name, id, type, img }) => {


    return (
        <Link to={`/details/${id}`}>
            <div className="pokemon-card">
                <div className="img-contain-pokemon"> <img className="pokemon-card-img" src={img} alt={name} /></div>

                <h3>{name}</h3>
                <div className="pokemon-types-card">
                    {
                        type.map(e => <div className="each-type">{e}</div>)
                    }
                </div>
            </div>
        </Link>
    );
};


export default PokemonCard;