// jest.useFakeTimers()
// const { } = require("sequelize");
const request = require("supertest") // cada que vaya testear request/peticiones hacer esto con express SOLO CUANDO VOY A USAR RUTAS
const { Pokemon, conn } = require('../../src/db.js');
const app = require("../../src/app")

jest.setTimeout(100000)
// request(app) y aqui estoy haciendo la solicitud a la variable app que guarda a exprees que me va a crear un servidor, de esta forma levanto el servidor solo para que funcione en cada test
// aqui testeamos las ruta SOLAMENTE
// en este test quiero que evalue si si me está trayendo la informacion que estoyt solicitando a la api


describe("GET /pokemons", () => {
    beforeEach(() => conn.authenticate()
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        }));
    it("responds with 200", () => {
        return request(app)
            .get("/pokemons?page=1")
            .expect(200)
    })
    it("responds not null when request for all pokemons", () => {
        return request(app)
            .get("/pokemons?page=1")
            .then(res => {
                return expect(res.body).toEqual(expect.anything())
            })
    })
})

describe("GET /pokemons/:id", () => {
    beforeEach(() => conn.authenticate()
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        }));
    it("responds with 200", () => {
        return request(app)
            .get("/pokemons/1")
            .expect(200)
    })
    it("responds not null when request by id", () => {
        return request(app)
            .get("/pokemons/1")
            .then(res => {
                return expect(res.body).toEqual(expect.anything())
            })
    })
})

describe("GET /pokemons?name", () => {
    beforeEach(() => conn.authenticate()
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        }));
    it("responds with 200", () => {
        return request(app)
            .get("/pokemons?name=bulbasaur")
            .expect(200)
    })
    it("responds  not null when request by name", () => {
        return request(app)
            .get("/pokemons?name=bulbasaur")
            .then(res => {
                return expect(res.body).toEqual(expect.anything())
            })
    })
})

describe("GET /types", () => {
    beforeEach(() => conn.authenticate()
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        }));
    it("responds with 200", () => {
        return request(app)
            .get("/types")
            .expect(200)
    })
    it("responds not null when request by type", () => {
        return request(app)
            .get("/types")
            .then(res => {
                return expect(res.body).toEqual(expect.anything())
            })
    })
})

// en este test quiero testear que si este creando el pokemon
describe("POST /pokemons", () => {
    const defaulPokemon = {
        name: "Pikachu",
        hp: 1,
        attack: 1,
        weight: 1,
        height: 1,
        speed: 1,
        defense: 1,
        type: 1
    };

    beforeEach(() => conn.authenticate()
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        }));

    it("responds with 200 and data is anything", () => {
        return request(app)
            .post("/pokemons")
            .send(defaulPokemon)
            .expect(200)
            .then((res) => {
                expect(res.status).toBe(200)
                return expect(res.body).toEqual(expect.anything())
            })
    });
    it("delete pokemon created", () => {
        Pokemon.destroy({ where: { name: defaulPokemon.name } })
    })
})