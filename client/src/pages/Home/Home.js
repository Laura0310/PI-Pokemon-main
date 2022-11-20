import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"; // se importa pq es el que me va a permitir llamar las acciones, quienes son las qe modifican el estado
import { Link } from 'react-router-dom';
import { allPokemons } from '../../redux/actions';
import PokemonCard from '../../components/PokemonCard/PokemonCard';
import "./home.css";

function Home() {

    const [filters, setFilters] = useState({ // creando estado nuevo para los filtros, inicia vacio y se va llenando segun el usaruoi elija la opcion, es necesario el useState porque es el e  cargado de actualizar el componente, ESTADO LOCALLL
        source: "",
        name: "",
        order: "",
        orderBy: ""
    })

    const dispatch = useDispatch(); //estoy guardando en la variable dispatch la funcion de UseDispacth para poder usarla, esto siempre que mi componente necesite ejecutar de las acciones, con esto se ejecuta la accion que va actualizar el estado, que queda en store
    useEffect(() => { //para ejecutar algo apenas se inicie(montar)/actualice el componente
        dispatch(allPokemons(filters)) // esto me va a ejcutar la accion, va ahcer la peticion al back
    }, [dispatch, filters])

    let pokemons = useSelector(store => store.pokemons) // el useSelector me sirve para especificar lo que estoy pidiendo, y este me permite traeme de la store la info a mi componente , esto funciona solo con el estado GLOBALL


    const handleFilters = (event) => {// funcion que se asume maneja el evento de algun input
        const property = event.target.name
        setFilters({// para actualizar el estado
            ...filters, // hacemos una copia del estado anterior
            [property]: event.target.value // event.target.value es db o api,name o los otros filtros

        })
    }

    const handleSorting = (event) => {
        let newValue = event.target.value.split("_") // aaqui estoy separando el value por el _ para asi asginara sus respectivos valores [ atacck,desc]
        setFilters({
            ...filters, // y aqui nuevamente lo actualizamos
            orderBy: newValue[0],
            order: newValue[1]
        })

    }

    // aqui debe ir paginado y filtros y la lista de todos
    return (
        <div className = "home"> 
            <select name="source" id="sr" onChange={handleFilters}>
                <option>Elige el filtro</option>
                <option value="db">Date base</option>
                <option value="api">Api</option>
            </select>
            <select name="sort" onChange={handleSorting}>
                <option>Ordenar por</option>
                <option value="attack_desc">Attack desc</option>
                <option value="attack_asc">Attack asc</option>
                <option value="name_desc">Name desc</option>
                <option value="name_asc">Name asc</option>

            </select>
            <label htmlFor="name">Buscar por nombre: </label>
            <input type='string' name='name' onKeyDown={(e) => e.key === "Enter" && handleFilters(e)}></input>
            <div>
                <h1><p align="center">POKEMONES</p></h1>
                {pokemons.map(i => (
                    <div key={i.id}><Link to={`/details/${i.id}`}>{i.name}</Link> </div> // cada que hago un .map debo darle un key
                //     <PokemonCard
                //     key = {i.id}
                //     id={i.id}
                //     name={i.name}
                //     type={i.type}
                
                //   />
                ))}
            </div>

        </div>

    )
}

export default Home;