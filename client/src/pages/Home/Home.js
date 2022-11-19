import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"; // se importa pq es el que me va a permitir llamar las acciones, quienes son las qe modifican el estado
import { Link } from 'react-router-dom';
import { allPokemons, GET_POKEMONS } from '../../redux/actions';

function Home() {

    const dispatch = useDispatch(); //estoy guardando en la variable dispatch la funcion de UseDispacth para poder usarla, esto siempre que mi componente necesite ejecutar de las acciones, con esto se ejecuta la accion que va actualizar el estado, que queda en store
    useEffect(() => { //para ejecutar algo apenas se inicie(montar)/actualice el componente
        dispatch(allPokemons()) // esto me va a ejcutar la accion, va ahcer la peticion al back
    }, [dispatch])

    let pokemons = useSelector(store => store.pokemons) // el useSelector me sirve para especificar lo que estoy pidiendo, y este me permite traeme de la store la info a mi componente 
    


    return (
        <div>
            {pokemons.map(i => (
                <div key={i.id}><Link to={`/details/${i.id}`}>{i.name}</Link> </div> // cada que hago un .map debo darle un key
            ))}
        </div>
    )
}

export default Home