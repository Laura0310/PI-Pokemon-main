const request = require("supertest")
const { Pokemon, conn } = require('../../src/db.js');
const app = require("../../src/app")

// aqui es para testear las funciones
// y quiero que testee si si devuelve el arreglo de objetos con la info dentro
// lo que deberia de esperar seria un arreglo de objetos arrayPokemon
beforeAll(() => conn.authenticate()
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    }));

describe("Deberia traerme a todos los pokemones existentes con la información en particular ", () => {

    const arrayPokemons = [{
        "attack": 49,
        "id": 1,
        "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        "name": "bulbasaur",
        "type": ["grass", "poison"]
    }]

    it("ArrayPokemons must exist in /pokemons", () => {
        return request(app)
            .get("/pokemons?page=1")
            .then(res => {
                return expect(res.body.data).toEqual(expect.arrayContaining(arrayPokemons))
            })
    })
})

describe("Deberia confirmar si el pokemón fue creado", () => {
    const defaulPokemon = {
        name: "Pikachu",
        hp: 1,
        attack: 1,
        weight: 1,
        height: 1,
        speed: 1,
        defense: 1,
    };


    it("Respuesta de confirmación del pokemón creado", () => {
        return request(app)
            .post("/pokemons")
            .send(defaulPokemon)
            .expect(200)
            .then((res) => {
                return expect(res.body.message).toBe("Pokemón creado exitosamente")
            })
    })
    
    it("delete pokemon created", () => {
        Pokemon.destroy({ where: { name: defaulPokemon.name } })
    })
})