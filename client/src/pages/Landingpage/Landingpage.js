import React from "react";
import "./landing.css";
import { Link } from "react-router-dom";


// const Landingpage = () => {


   

//     return (
//         <div className ="landing">
//             <h1><p align="center">HOLA</p></h1>
//             <a target="_blank" className="fcc-btn" href="http://localhost:3000/home">HOME</a>
//         </div>
//     )
// }
const Landingpage =() =>{
    return(
        <div className="landing">
          <h1><p align="center">CONOCE A LOS POKEMONES</p></h1>
            <Link to ='/home'>
                <button className="btn">Ingresar</button>
            </Link>
        </div>
    )
}






export default Landingpage;