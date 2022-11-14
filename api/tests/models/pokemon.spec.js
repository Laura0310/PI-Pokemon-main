const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai').expect;

// xdescribe('Pokemon model', () => {
//   beforeEach(() => conn.authenticate()
//     .catch((err) => {
//       console.error('Unable to connect to the database:', err);
//     }));
//   xdescribe('Validators', () => {
//     beforeEach(() => Pokemon.sync({ force: true }));
//     xdescribe('name', () => {
//       it('should throw an error if name is null', (done) => {
//         Pokemon.create({})
//           .then(() => done(new Error('It requires a valid name')))
//           .catch(() => done());
//       });
//       it('should work when its a valid name', () => {
//         Pokemon.create({ name: 'Pikachu' });
//       });
//     });
//   });
// });
