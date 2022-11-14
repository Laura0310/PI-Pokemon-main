
jest.useFakeTimers()
// const { } = require("sequelize");
const request = require("supertest") // cada que vaya testear request/peticiones hacer esto con express SOLO CUANDO VOY A USAR RUTAS
const express = require("express")
const routes = require("../../src/routes/index")

// jest.setTimeout(100000)
const app = express() // aqui estoy creando una variable app que usa a express, express crea un servidor
app.use("/", routes) // aqui estoy usando las rutas
// request(app) y aqui estoy haciendo la solicitud a la variable app que guarda a exprees que me va a crear un servidor, de esta forma levanto el servidor solo para que funcione en cada test
// aqui testeamos las ruta SOLAMENTE
// en este test quiero que evalue si si me está trayendo la informacion que estoyt solicitando a la api


describe("GET /pokemons", () => {
    it("responds with 200", (done) => {
        request(app).get("/pokemons").expect(200)
        done()
    })
    it("responds not null when request for all pokemons", (done) => {
        request(app).get("/pokemons").then(res => { expect(res.data).toEqual(expect.anything()) })
        done()
    })
})

describe("GET /pokemons/:id", () => {
    it("responds with 200", (done) => {
        request(app).get("/pokemons/1").expect(200)
        done()
    })
    it("responds not null when request by id", (done) => {
        request(app).get("/pokemons/1").then(res => { expect(res.data).toEqual(expect.anything()) })
        done()
    })
})


describe("GET /pokemons?name", () => {
    it("responds with 200", (done) => {
        request(app).get("/pokemons?name=bulbasaur").expect(200)
        done()
    })
    it("responds  not null when request by name", (done) => {
        request(app).get("/pokemons?name=bulbasaur").then(res => {
            expect(res.data).toEqual(expect.anything())
        })
        done()
    })
})


describe("GET /types", () => {
    it("responds with 200", (done) => {
        request(app).get("/types").expect(200)
        done()
    })
    it("responds not null when request by type", (done) => {
        request(app).get("/types").then(res => { expect(res.data).toEqual(expect.anything()) })
        done()
    })
})

// en este test quiero testear que si este creando el pokemon


describe("POST /pokemons", () => {
    it("responds with 200", (done) => {
        request(app).post("/pokemons").expect(200)
        done()
    })
    it("responds is not null", (done) => {
        request(app).post('/pokemons').then((res) => {
            expect(res.data).toEqual(expect.anything())
        })
        done()
    })
})


