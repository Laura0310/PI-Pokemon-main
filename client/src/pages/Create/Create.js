import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { useState, useEffect } from "react";



const CreatePokemons = () => {
    const dispatch = useDispatch();

    let valoresNumeros = ["hp", "attack", "defense", "speed", "height", "weight"] //creo un array con las propiedades que tienen values integer

    const [create, setCreate] = useState({ // creando un estado con unos valores iniciales en 0 y vacio
        name: "",
        hp: 0,
        type: [],
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0
    })

    const update = (event) => {  // funcion encargada de actualizar los values en el estado
        const property = event.target.name // creo una variable donde guardo el  campo name que saque del fprmulario
        let value = event.target.value // lo mismo q arriba

        if (valoresNumeros.includes(property)) value = Number(value) // esto lo hago para que cada value integer siempre sea entero

        setCreate({ // esto actualiza mi estado
            ...create, // aqui hago una copia del contenido del estado
            [property]: value // actualizo este campo en especifico
        })
    }

    const updateTypes = (event) => {  // funcion encargada de actualizar los values en el estado
        setCreate({ // esto actualiza mi estado
            ...create, // aqui hago una copia del contenido del estado
            type:[...create.type,event.target.value] // actualizo este campo en especifico
        })
    }

    const submitCreate = (event) => {
        event.preventDefault(); // esto para que cuando le de submit no se me borre
        console.log(create)
        dispatch(actions.createPokemons(create))

    }

    useEffect(() => { //para ejecutar algo apenas se inicie(montar)/actualice el componente
        dispatch(actions.pokemonsTypes()) // esto me va a ejcutar la accion, va ahcer la peticion al back
    }, [dispatch])

    let type = useSelector(store => store.pokemonsTypes) // esto es mi array de tipos 


    return (
        <div>
            <h1><p align="center">CREATE POKEMÓN</p></h1>
            <form onSubmit={submitCreate}>
                <label htmlFor="name">Name: </label>
                <input type='text' name='name' value={create.name} onChange={update}></input>

                <label htmlFor="hp">Hp: </label>
                <input type='number' name='hp' value={create.hp} onChange={update} ></input>

                <label htmlFor="attack">Attack: </label>
                <input type='number' name='attack' value={create.attack} onChange={update}></input>

                <label htmlFor="defense">Defense: </label>
                <input type='number' name='defense' value={create.defense} onChange={update}></input>

                <label htmlFor="speed">Speed: </label>
                <input type='number' name='speed' value={create.speed} onChange={update}></input>

                <label htmlFor="weight">Weight: </label>
                <input type='number' name='weight' value={create.weight} onChange={update}></input>

                <label htmlFor="height">Height: </label>
                <input type='number' name='height' value={create.height} onChange={update}></input>
                <label for="sl">Choose a type</label>
                <select name="types[]" id="sl" onChange={updateTypes}>
                    <option></option>
                    {type.map(i => (
                        <option value={i.id}>{i.name} </option>
                    ))}

                </select>

              
                <button type="submit">Create Pokemon</button>

            </form>

        </div>
    );
};


export default CreatePokemons;