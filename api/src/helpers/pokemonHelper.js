// me va ayudar a modularizar el codigo ( que se vea mas bonito)
// aqui voy a poner funciones o x cosas que se repitan y poder llamarlas mas corto en el codigo, es decir reutilizar
const { Pokemon, Type } = require("../db");
const axios = require("axios");

const pokemonDetail = (response) => { // esto me saca información y me crea un objeto de mi pokemon
    let arrayTypes = []
    response.data.types.forEach(index => { // iterando sobre este objeto para sacar la info que necesito
        arrayTypes.push(index.type.name) // aqui estoy pusheando al arreglo, todos los nombres cuando itero
    })

    let detail = {
        name: response.data.name,
        img: response.data.sprites.front_default,
        type: arrayTypes,
        id: response.data.id,
        hp: null,
        attack: null,
        defense: null,
        speed: null,
        weight: response.data.weight,
        height: response.data.height,
    };
    response.data.stats.forEach(i => {
        if (i.stat.name == "hp") { // estoy preguntando si cuando itero sobre stat.name es igual a hp
            detail.hp = i.base_stat // estoy diciendo que el valor de base state lo voy a guardar en el hp del objeto
        }
        if (i.stat.name == "attack") {
            detail.attack = i.base_stat
        }
        if (i.stat.name == "defense") {
            detail.defense = i.base_stat
        }
        if (i.stat.name == "speed") {
            detail.speed = i.base_stat
        }
    })
    return detail
}


const findName = async (name) => { // este encuentra un pokemon que coincida el nombre en la apiexterna y en mi bd y si no, me devuelva el error correspondiente
    try {
        let namePokemon = await Pokemon.findOne({ where: { name: name }, include: { model: Type } })
        if (namePokemon) return [namePokemon]

        let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`) // response.data // aqui estoy dentro de la info
        let detail = pokemonDetail(response)
        return [detail] // return porque ya no quiero que siga el proceso, si no que muera en esta linea y se salga del controlador

    } catch (error) {
        return []
    }
}

const sortPokemons = (arrayPokemons, orderBy, order) => { // estos son los filtros

    if (orderBy == "attack") { // esto por ataque
        if (order == "asc") return arrayPokemons.sort((a, b) => a.attack - b.attack) // ascendente ataque
        if (order == "desc") return arrayPokemons.sort((a, b) => b.attack - a.attack) // descendente ataque
    }
    if (orderBy == "name") { // filtrado alfabeticamente
        if (order == "asc") return arrayPokemons.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1) // ascendente ataque
        if (order == "desc") return arrayPokemons.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1) // descendente ataque
    }
    return arrayPokemons;
}

const filterBySource = (arrayPokemons, source) => { // este para filtrar si es un pokemon creado en mi db o en la api externa
    if (source == "api") {
        return arrayPokemons.filter(elemento => typeof elemento.id == "number")
    }
    if (source == "db") {
        return arrayPokemons.filter(elemento => typeof elemento.id == "string")
    }
    return arrayPokemons
}


module.exports = {
    pokemonDetail,
    findName,
    sortPokemons,
    filterBySource
}