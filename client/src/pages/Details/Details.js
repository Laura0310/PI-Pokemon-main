
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pokemonsId } from "../../redux/actions"
import "./Details.css";
// aqui vamos a manejar lo de la ruta del ID

function Details(props) {
    const id = props.match.params.id
    const dispatch = useDispatch(); //estoy guardando en la variable dispatch la funcion de UseDispacth para poder usarla, esto siempre que mi componente necesite ejecutar de las acciones, con esto se ejecuta la accion que va actualizar el estado, que queda en store

    useEffect(() => { //para ejecutar algo apenas se inicie(montar)/actualice el componente
        dispatch(pokemonsId(id)) // esto me va a ejcutar la accion, va ahcer la peticion al back
    }, [dispatch, id])

    let pokemonDetail = useSelector(store => store.pokemonsId) // PARA ACCEDER AL ESTADO, PARA TRAER LA INFO A MI COMPONENTE

    return ( // me faltan los types, porque es un arreglo
        <div className='all-details-container'>
            <div className='contain-details'>
                <h1>{pokemonDetail.name}</h1>
                <div>
                    <h3>Hp: {pokemonDetail.hp}</h3>
                    <h3>Height: {pokemonDetail.height}</h3>
                </div>
                <div>
                    <h3>Attack: {pokemonDetail.attack}</h3>
                    <h3>Defense: {pokemonDetail.defense}</h3>
                </div>
                <div>
                    <h3>Speed: {pokemonDetail.speed}</h3>
                    <h3>Weigth: {pokemonDetail.weight}</h3>
                </div>
                <h3 className='types'>Type: {
                    pokemonDetail.type?.map(e=>(<div>{e}</div>))}</h3>
            </div>
            <div className='img-each-pk'> <img src={pokemonDetail.img} alt="detail" />
            </div>
        </div>

    )
}



export default Details