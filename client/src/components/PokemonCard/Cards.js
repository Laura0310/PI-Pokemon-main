import React from "react";
import PokemonCard from "./PokemonCard";

export const Cards = ({ results }) => {
    return (
        <div className="container">
            <ul>
                {
                    results.map(p => (
                        <li className="card-item" key ={ p.id}>
                            <PokemonCard url={p.url} />
                        </li>
                    ))
                }
            </ul>

        </div>
    )
}