
import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { pokemonsId } from "../../redux/actions"
// aqui vamos a manejar lo de la ruta del ID

function Details(props) {
    const id = props.match.params.id
    const dispatch = useDispatch(); //estoy guardando en la variable dispatch la funcion de UseDispacth para poder usarla, esto siempre que mi componente necesite ejecutar de las acciones, con esto se ejecuta la accion que va actualizar el estado, que queda en store
    useEffect(() => { //para ejecutar algo apenas se inicie(montar)/actualice el componente
        dispatch(pokemonsId(id)) // esto me va a ejcutar la accion, va ahcer la peticion al back
    }, [dispatch])

    let pokemonDetail = useSelector(store => store.pokemonsId) // PARA ACCEDER AL ESTADO, PARA TRAER LA INFO A MI COMPONENTE

    return ( // me faltan los types, porque es un arreglo
        <div>
            <h1>{pokemonDetail.name}</h1>
            <h3>{pokemonDetail.hp}</h3>
            <h3>{pokemonDetail.type}</h3>
            <h3>{pokemonDetail.attack}</h3>
            <h3>{pokemonDetail.defense}</h3>
            <h3>{pokemonDetail.speed}</h3>
            <h3>{pokemonDetail.weight}</h3>
            <h3>{pokemonDetail.height}</h3>
            <img src = {pokemonDetail.img}/>
        </div>
    )
}



export default Details