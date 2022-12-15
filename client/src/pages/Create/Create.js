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

        setCreate({ // esto actualiza mi estado
            ...create, // aqui hago una copia del contenido del estado
            [property]: value // actualizo este campo en especifico
        })

        if (valoresNumeros.includes(property)) { // esto lo hago para que cada value integer siempre sea entero
            value = Number(value)
            if (areNumberValuesInvalid(value, event)) return
        } else {
            if (areStringValuesInvalid(value, event)) return
        }


    }

    const updateTypes = (event) => {  // funcion encargada de actualizar los values en el estado
        if(create.type.length === 2) return window.alert("can not choose more types")
        setCreate({ // esto actualiza mi estado
            ...create, // aqui hago una copia del contenido del estado
            type: [...create.type, event.target.value] // actualizo este campo en especifico
        })
    }

    const submitCreate = (event) => {
        event.preventDefault(); // esto para que cuando le de submit no se me borre
        if (isFormUnfilled()) return // este return es para que no continue con lo de abajo y muera en esta linea
        dispatch(actions.createPokemons(create))
    }
    // las validaciones del formulario
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
        } return false
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
        } return false
    }

    const isFormUnfilled = () => {
        const initialCreateObject = { // creando un estado con unos valores iniciales en 0 y vacio,est es mi estado vacio
            name: "",
            hp: 0,
            type: [],
            attack: 0,
            defense: 0,
            speed: 0,
            height: 0,
            weight: 0
        }
        if (JSON.stringify(create) === JSON.stringify(initialCreateObject)) { //JSON.stringify, convierte un objeto en string para poder comparar su contenido
            window.alert("can not create the pokemon, please fill the form")
            return true
        } return window.alert("pokemon creado exitosamente")
    }



    //
    useEffect(() => { //para ejecutar algo apenas se inicie(montar)/actualice el componente
        dispatch(actions.pokemonsTypes()) // esto me va a ejcutar la accion, va ahcer la peticion al back
    }, [dispatch])

    let type = useSelector(store => store.pokemonsTypes) // esto es mi array de tipos 


    return (
        <div className="formulario">
            <img className='logo-pokemon' src="/logo.png" alt="logo" />

            <form className="entries-create" onSubmit={submitCreate}>
                <div className="namehp">
                    <div className="create-input-container">
                        <label htmlFor="name">Name: </label>
                        <input type='text' style={{ width: "100px" }} name='name' value={create.name} onChange={update} required></input>
                    </div>

                    <div className="create-input-container">
                        <label htmlFor="hp">Hp: </label>
                        <input type='number' style={{ width: "100px" }} min="1" max="300" name='hp' value={create.hp} onChange={update} required></input>
                    </div>
                </div>

                <div className="namehp">
                    <div className="create-input-container">
                        <label htmlFor="attack">Attack: </label>
                        <input type='number' style={{ width: "100px" }} min="1" max="300" name='attack' value={create.attack} onChange={update} required></input>
                    </div>

                    <div className="create-input-container">
                        <label htmlFor="defense">Defense: </label>
                        <input type='number' style={{ width: "100px" }} min="1" max="300" name='defense' value={create.defense} onChange={update} required></input>
                    </div>
                </div>

                <div className="namehp">
                    <div className="create-input-container">
                        <label htmlFor="speed">Speed: </label>
                        <input type='number' style={{ width: "100px" }} min="1" max="300" name='speed' value={create.speed} onChange={update} required></input>
                    </div>

                    <div className="create-input-container">
                        <label htmlFor="weight">Weight: </label>
                        <input type='number' style={{ width: "100px" }} min="1" max="300" name='weight' value={create.weight} onChange={update} required></input>
                    </div>
                </div>

                <div className="namehp">
                    <div className="create-input-container">
                        <label htmlFor="height">Height:  </label>
                        <input type='number' style={{ width: "100px" }} min="1" max="300" name='height' value={create.height} onChange={update} required></input>
                    </div>

                    <div className="create-input-container">
                        <label for="sl">Choose a type</label>
                        <select className="choosetypes" name="types[]" style={{ width: "100px" }} id="sl" onChange={updateTypes} required>
                            <option></option>
                            {type.map(i => (
                                <option key={i.id} value={i.id}>{i.name} </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="pokemon-types-card">
                    {type.map(e => create.type.includes(String(e.id)) && <div className="each-type">{e.name}</div>)}
                </div>


                <button className="create-button" type="submit">Create</button>
            </form>
        </div>
    );
};


export default CreatePokemons;