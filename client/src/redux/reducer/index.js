// debo importar las actions aqui
import { GET_POKEMONS, GET_POKEMONS_ID, GET_POKEMONS_TYPES, POST_POKEMONS, LOADING } from "../actions";
// aaqui modifico el estado segun la accion que quiera ( todos los pokemones, o por el nombre)


const initialState = {// estado global que voy a poder acceder desde cualquier parte de mi app
    pokemons: {},
    pokemonsId: {},
    pokemonsTypes: [],
    createdPokemon: {},
    loading: false
};


const rootReducer = (state = initialState, action) => { // se encarga de modificar nuestro estado
    switch (action.type) {
        // Acá va tu código:
        case GET_POKEMONS: // esto me lo da las actions para llenar mi store
            return {
                ...state,
                pokemons: action.payload // es la info que traje del backend
            }
        case GET_POKEMONS_ID:
            return {
                ...state,
                pokemonsId: action.payload
            }
        case GET_POKEMONS_TYPES:
            return {
                ...state,
                pokemonsTypes: action.payload
            }
        case POST_POKEMONS:
            return {
                ...state,
                // que iria aqui? que me devulve cuando creo un pokemon?
                createdPokemon: action.payload
            }
        case LOADING:
            return {
                ...state,
                loading: action.payload
            }
        default: return state
    }

};

export default rootReducer;
