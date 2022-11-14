const { Router } = require('express');
const { getPokemons,getPokemonsId,getPokemonsType,postPokemons } = require("../controllers/pokemonController");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
//aqu defino rutas de los endpoints, se recibe el request y defino el response (req,res)
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/pokemons", getPokemons)
router.get("/pokemons/:id", getPokemonsId)
router.get("/types", getPokemonsType)
router.post("/pokemons",postPokemons )


module.exports = router;
