const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(
    "postgres://joeshibhak:Joeshibha@2002@localhost:5432/riot",{
        dialect: 'postgres'
    }
  );


module.exports = sequelize;
