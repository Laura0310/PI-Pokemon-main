const express = require("express")
const routes = require("../../../src/routes/index")
const request = require("supertest")
const app = express() // aqui estoy creando una variable app que usa a express, express crea un servidor
app.use("/", routes)


// aqui es para testear las funciones
// y quiero que testee si si devuelve el arreglo de objetos con la info dentro
// lo que deberia de esperar seria un arreglo de objetos arrayPokemon

describe("Deberia traerme a todos los pokemones existentes con la información en particular ", () => {
    const arrayPokemons = [{
        name: "bulbasaur",
        img: "front_default",
        type: "grass"
    }]

    it("ArrayPokemons must exist in /pokemons", (done) => {
        request(app).get("/pokemons").then(res => {
            expect(res.data).toEqual(expect.arrayContaining(arrayPokemons))
        })
        done();
    })
})




describe("Deberia confirmar si el pokemón fue creado", () => {
    it("Respuesta de confirmación del pokemón creado", (done) => {
        request(app).post("/pokemons").then(res => {
            expect(res.data).toBe("Pokemón creado exitosamente")

        })
        done()
    })
})