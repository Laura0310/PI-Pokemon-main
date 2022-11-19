const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
// aqui van las funciones de las rutas
module.exports = (sequelize) => {
    // defino el modelo, aqui van los campos que necesita el pokemon
    sequelize.define('type', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    });
};


// router.get('/types', async (req, res) => {
//     const typesApi = await axios.get("https://pokeapi.co/api/v2/type");
//     const types = typesApi.data.results;
//     types.forEach(el => {
//         Type.findOrCreate({
//             where: { name: el.name }
//         })
//     })
//     const allTypes = await Type.findAll();
//     return res.send(allTypes);
// });
