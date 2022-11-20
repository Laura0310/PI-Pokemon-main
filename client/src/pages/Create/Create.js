import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { useState, useEffect } from "react";
import "./create.css";



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

    
        if (valoresNumeros.includes(property)) { // esto lo hago para que cada value integer siempre sea entero
            value = Number(value) 
            if (areNumberValuesInvalid(value, event)) return
        } else {
            if (areStringValuesInvalid(value, event)) return
        }

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
        if (isFormUnfilled()) return
        dispatch(actions.createPokemons(create))
    }

    const areNumberValuesInvalid = (value, event) => {
        if (value < 1) {
            window.alert("field must be greater than 0")
            event.target.focus()
            return true
        }

        if (value > 10000) {
            window.alert("field must be less than 10000")
            event.target.focus()
            return true
        }

        return false
    }

    const areStringValuesInvalid = (value, event) => {
        if (value === "") {
            window.alert("field can not be empty")
            event.target.focus()
            return true
        }

        if (!isNaN(+value)) {
            window.alert("field can not be a number")
            event.target.focus()
            return true
        }

        if (value.length > 15) {
            window.alert("field must not be longer than 15 characters")
            event.target.focus()
            return true
        }

        return false
    }

    const isFormUnfilled = () => {
        const initialCreateObject = { // creando un estado con unos valores iniciales en 0 y vacio
            name: "",
            hp: 0,
            type: [],
            attack: 0,
            defense: 0,
            speed: 0,
            height: 0,
            weight: 0
        }

        if (JSON.stringify(create) === JSON.stringify(initialCreateObject)) {
            window.alert("can not create the pokemon, please fill the form")
            return true
        }

        return false
    }

    useEffect(() => { //para ejecutar algo apenas se inicie(montar)/actualice el componente
        dispatch(actions.pokemonsTypes()) // esto me va a ejcutar la accion, va ahcer la peticion al back
    }, [dispatch])

    let type = useSelector(store => store.pokemonsTypes) // esto es mi array de tipos 


    return (
        <div className ="formulario">
            <h1><p align="center">CREA TU POKEMÓN</p></h1>
            <form onSubmit={submitCreate}>
                <label htmlFor="name">Name: </label>
                <input type='text' name='name' value={create.name} onChange={update} required></input>

                <label htmlFor="hp">Hp: </label>
                <input type='number' name='hp' value={create.hp} onChange={update} required></input>

                <label htmlFor="attack">Attack: </label>
                <input type='number' name='attack' value={create.attack} onChange={update} required></input>

                <label htmlFor="defense">Defense: </label>
                <input type='number' name='defense' value={create.defense} onChange={update} required></input>

                <label htmlFor="speed">Speed: </label>
                <input type='number' name='speed' value={create.speed} onChange={update} required></input>

                <label htmlFor="weight">Weight: </label>
                <input type='number' name='weight' value={create.weight} onChange={update} required></input>

                <label htmlFor="height">Height: </label>
                <input type='number' name='height' value={create.height} onChange={update} required></input>
                <label for="sl">Elige un tipo</label>
                <select name="types[]" id="sl" onChange={updateTypes}>
                    <option></option>
                    {type.map(i => (
                        <option key={ i.id} value={i.id}>{i.name} </option>
                    ))}

                </select>
              
                <button type="submit">Create Pokemon</button>

            </form>

        </div>
    );
};


export default CreatePokemons;