import axios from "axios";
// import { URLSearchParams } from "url";
// aqui voy a llamar a mis rutas, aqui mi front va hacer la peticion al back para obtener la informacion
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMONS_ID = "GET_POKEMONS_ID";
export const GET_POKEMONS_TYPES = "GET_POKEMONS_TYPES";
export const POST_POKEMONS = "POST_POKEMONS";
export const LOADING = "LOADING"



export const allPokemons = (params) => { //  params es el objeto del estado filters de home, que contiene la propiedad source
    return async function (dispatch) {
        dispatch({ type: LOADING, payload: true })
        const response = await axios.get("https://pi-pokemon-main-production-2483.up.railway.app/pokemons", { params }); // aqui estoy trayendo la info, el arreglo de objetos de mis pokemones
        dispatch({ type: GET_POKEMONS, payload: response.data }); // dispacth con un tipo que contiene a la accion y el payload que es mi info, se hace dispacth porque se quiere guardar la info en Store, donde esta el State
        dispatch({ type: LOADING, payload: false })
    };
};




export const pokemonsId = (id) => {
    return async function (dispatch) {
        const response = await axios.get(`https://pi-pokemon-main-production-2483.up.railway.app/pokemons/${id}`); // aqui estoy trayendo la info, el arreglo de objetos de mis pokemones
        dispatch({ type: GET_POKEMONS_ID, payload: response.data }); // dispacth con un tipo que contiene a la accion y el payload que es mi info, se hace dispacth porque se quiere guardar la info en Store, donde esta el State
    };
};




export const pokemonsTypes = () => {

    return async function (dispatch) {
        const response = await axios.get("https://pi-pokemon-main-production-2483.up.railway.app/types"); // aqui estoy trayendo la info, el arreglo de objetos de mis pokemones
        dispatch({ type: GET_POKEMONS_TYPES, payload: response.data }); // dispacth con un tipo que contiene a la accion y el payload que es mi info, se hace dispacth porque se quiere guardar la info en Store, donde esta el State
    };
};




export const createPokemons = (post) => { // estoy recibiendo el formulario 

    return async function (dispatch) {
        const response = await axios.post('https://pi-pokemon-main-production-2483.up.railway.app/pokemons', post); // el params.ToString va por defecto cada que use el dicho metodo
        // const response = await axios.post("https://pi-pokemon-main-production-2483.up.railway.app/pokemons"); // aqui estoy trayendo la info, el arreglo de objetos de mis pokemones
        dispatch({ type: POST_POKEMONS, payload: response.data }); // dispacth con un tipo que contiene a la accion y el payload que es mi info, se hace dispacth porque se quiere guardar la info en Store, donde esta el State


    };



};