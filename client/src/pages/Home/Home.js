import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"; // se importa pq es el que me va a permitir llamar las acciones, quienes son las qe modifican el estado
import { Link } from 'react-router-dom';
import { allPokemons, pokemonsTypes } from '../../redux/actions';
import PokemonCard from '../../components/PokemonCard/PokemonCard';
import "./home.css";

let initialState = {
    source: "",
    name: "",
    order: "",
    orderBy: "",
    type: "",
    page: 1
}

function Home() {

    const [filters, setFilters] = useState(initialState) // creando estado nuevo para los filtros, inicia vacio y se va llenando segun el usaruoi elija la opcion, es necesario el useState porque es el e  cargado de actualizar el componente, ESTADO LOCALLL

    const dispatch = useDispatch(); //estoy guardando en la variable dispatch la funcion de UseDispacth para poder usarla, esto siempre que mi componente necesite ejecutar de las acciones, con esto se ejecuta la accion que va actualizar el estado, que queda en store

    useEffect(() => { //para ejecutar algo apenas se inicie(montar)/actualice el componente
        dispatch(pokemonsTypes())
        dispatch(allPokemons(filters)) // esto me va a ejcutar la accion, va ahcer la peticion al back
    }, [dispatch, filters])

    let pokemons = useSelector(store => store.pokemons) // el useSelector me sirve para especificar lo que estoy pidiendo, y este me permite traeme de la store la info a mi componente , esto funciona solo con el estado GLOBALL
    let types = useSelector(store => store.pokemonsTypes)

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

    const handlePage = (i) => {
        setFilters({
            ...filters,
            page: i
        })
    }

    // aqui debe ir paginado y filtros y la lista de todos
    return (
        <div className="home">
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
            <select name="type" onChange={handleFilters}>
                <option>Elige el tipo</option>
                {types.map(e => <option value={e.name}>{e.name}</option>)}
            </select>

            <label htmlFor="name">Buscar por nombre: </label>
            <input type='string' name='name' onKeyDown={(e) => e.key === "Enter" && handleFilters(e)}></input>

            <button onClick={() => setFilters(initialState)}>Limpiar filtros</button>
            <Link to="/create">Crea tu pokemon</Link>
            <div>
                <h1><p align="center">POKEMONES</p></h1>
                {pokemons.data?.map(i =>
                    <PokemonCard
                        key={i.id}
                        id={i.id}
                        name={i.name}
                        type={i.type}
                        img={i.img}
                    />
                )
                }
            </div>
            <div>
                {
                    Array(pokemons.totalPages).fill().map((e, i) => (
                        <button onClick={() => handlePage(i + 1)}>{i + 1}</button>
                    ))
                }
            </div>
        </div>

    )
}

export default Home;