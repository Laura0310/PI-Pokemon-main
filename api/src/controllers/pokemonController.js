const axios = require("axios");
const { Pokemon, Type } = require("../db");
const { pokemonDetail, findName, sortPokemons, filterBySource, filterType, pagination } = require("../helpers/pokemonHelper");
// aqui vamos a crear los controladores, las funciones que van a funcionar en nuentras Turutas

const getPokemons = async (req, res) => {  // async para especificar que es una funcion asincrona y usar el await
    // try { // try catch para responder errores , cada que haga try catch, poner todo dentro de try
    const { name, orderBy, order, source, type, page } = req.query


    let response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40") // await espera que se resuelva la prmesa para poder segu9ir , response tiene toda la informacion del rwquest que se hizo
    let arrayPokemons = [];

    let allPokemonsDb = await Pokemon.findAll({ include: Type })
    const newPokemonsDb = allPokemonsDb.map(e => {
        return (
            {
                id: e.id,
                name: e.name,
                img: "https://www.esimagenes.com/pimagen/esfera-de-pokemon-png.png",
                type: e.types.map(i => i.name),
                attack: e.attack
            }
        )
    })
    arrayPokemons = [...newPokemonsDb]

    const getPokemonDetails = (url) => { // una funcion que recibe una url,hace una peticion a la url,construye un objeto,y lo rellena con la info de la request
        return axios.get(url) // este return para que funcione el return de abajo 
            .then(response => {
                let arrayTypes = []
                response.data.types.forEach(index => { // iterando sobre este objeto para sacar la info que necesito
                    arrayTypes.push(index.type.name) // aqui estoy pusheando al arreglo, todos los nombres cuando itero
                })
                let objectPokemons = {
                    id: response.data.id,
                    name: response.data.name,
                    img: response.data.sprites.other.dream_world.front_default,
                    type: arrayTypes,
                    attack: response.data.stats[1].base_stat // se puso esto para ordenar por ataque
                }
                return objectPokemons
            })
    }
    response.data.results.forEach(element => { // iterar sobre el arreglo results que so n objetos que contiene info
        let pokemon = getPokemonDetails(element.url)
        arrayPokemons.push(pokemon)
    });
    // al ser tantas promesas debo trabajar con promise All para que se resuelvan  todas
    // estos son los filtros
    arrayPokemons = await Promise.all(arrayPokemons)
    if (name) { arrayPokemons = await findName(name) }
    if (order && orderBy) arrayPokemons = sortPokemons(arrayPokemons, orderBy, order)
    if (source) arrayPokemons = filterBySource(arrayPokemons, source)
    if (type) arrayPokemons = filterType(arrayPokemons, type)

    // aqui estoy haciendo el paginado
    let totalPages = Math.ceil(arrayPokemons.length / 12)
    arrayPokemons = pagination(arrayPokemons, page)

    res.status(200).send({ totalPages, data: arrayPokemons })
}

const getPokemonsId = async (req, res) => {
    try {
        const { id } = req.params

        if (!Number(id)) {
            let idPokemon = await Pokemon.findOne({ where: { id: id }, include: { model: Type } })
            if (idPokemon) return res.status(200).send(idPokemon)
        }

        let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`) // response.data // aqui estoy dentro de la info
        let detail = pokemonDetail(response)

        res.status(200).send(detail)
    } catch (error) {
        res.status(404).send("No existe pokemon")
    }
}

const postPokemons = async (req, res) => {
    try {
        const { name, hp, attack, defense, speed, height, weight, type } = req.body

        let detailPokemon = {
            name: name,
            hp: hp,
            attack: attack,
            defense: defense,
            speed: speed,
            height: height,
            weight: weight
        }
        const createPokemon = await Pokemon.create(detailPokemon)
        await createPokemon.addType(type)
        res.status(200).send({ message: "Pokemón creado exitosamente" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "algo salió mal" })
    }
}

const getPokemonsType = async (req, res) => {
    try {
        let response = await axios.get("https://pokeapi.co/api/v2/type")

        let totalEntries = await Type.count()// este para que me muestre la cantidad de datos que tiene

        if (totalEntries == 0) { // esto para crear en la bd en caso de que no haya nada
            await Type.bulkCreate(response.data.results)
            // bulkCreate es para crear en masa en la bd,aqui estoy llamando el arreglo de obejetos result que tiene todos los tipos, para que esto funcione el objeto debe tener una propiedad  igual q en la columna en la bd
        }

        const allTypes = await Type.findAll() // aqui estoy usando el findAll para traer todos los tipos de pokemonos de mi bd, siempre poner await pq es asincrona 

        res.status(200).send(allTypes)
    } catch (error) {
        console.log(error)
        res.status(500).send("algo salió mal")
    }
}

module.exports = {
    getPokemons,
    getPokemonsId,
    getPokemonsType,
    postPokemons
}