import React from "react";
import "./landing.css";

const Landingpage = () => {
    return (
        <div className="landing">
            <img className='pokemones' src="/pokemones.png" alt="pk" />
            <br></br>
            <h1 className="welcome">Discover the world of pokemon</h1>
        </div>
    )
}

export default Landingpage;