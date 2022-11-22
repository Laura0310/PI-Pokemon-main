import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"; // se importa pq es el que me va a permitir llamar las acciones, quienes son las qe modifican el estado
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
    let loading = useSelector(store => store.loading)



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
            <div className='filters-contain'>
                <select name="source" id="sr" onChange={handleFilters}>
                    <option>Choose a filter</option>
                    <option value="db">Date base</option>
                    <option value="api">Api</option>
                </select>
                <select name="sort" onChange={handleSorting}>
                    <option>Sort by</option>
                    <option value="attack_desc">Attack desc</option>
                    <option value="attack_asc">Attack asc</option>
                    <option value="name_desc">Name desc</option>
                    <option value="name_asc">Name asc</option>
                </select>
                <select name="type" onChange={handleFilters}>
                    <option>Choose a type</option>
                    {types.map(e => <option value={e.name}>{e.name}</option>)}
                </select>

                <input type='string' placeholder='Search for name ' name='name' onKeyDown={(e) => e.key === "Enter" && handleFilters(e)}></input>
                <button className='click-button' onClick={() => setFilters(initialState)}><img src="/cleaning.png" alt="clean" /> </button>
            </div>


            <img className='logo-pokemon' src="/logo.png" alt="logo" />
            {
                // pokemons?.data.length === 0 ? window.alert("pokemon not found") :
                loading ?
                    <div>
                        <div class="loadingio-spinner-rolling-hciydlsv51p"><div class="ldio-os8kw4pbboh">
                            <div></div>
                        </div></div>
                    </div>
                    :
                    <div>
                        {pokemons.data?.length == 0 && <div>Pokemons not found</div>}
                        <div className='card-contain'>
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
            }
        </div>

    )
}

export default Home;