const { Pokemon, conn } = require('../../src/db.js');

const defaulPokemon = {
    name: "Pikachu",
    hp: 1,
    attack: 1,
    weight: 1,
    height: 1,
    speed: 1,
    defense: 1
}

describe('Pokemon model', () => {
    beforeEach(() => conn.authenticate()
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        }));
    describe('Validators', () => {
        beforeEach(() => Pokemon.sync({ force: true }));
        describe('name', () => {
            it('should throw an error if name is null', (done) => {
                Pokemon.create({})
                    .then(() => done(new Error('It requires a valid name')))
                    .catch(() => done());
            });
            it('should work when its a valid pokemon object', async () => {
                await Pokemon.create(defaulPokemon);
                let poke = await Pokemon.findOne({ where: { name: defaulPokemon.name } })
                expect(poke.name).toEqual(defaulPokemon.name)
            });
            it('should work when delete a valid pokemon', async () => {
                await Pokemon.destroy({ where: { name: defaulPokemon.name } })
                let poke = await Pokemon.findOne({ where: { name: defaulPokemon.name } })
                expect(poke.name).toEqual(null)
            })
        });
    });
});
