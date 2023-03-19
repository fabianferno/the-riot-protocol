const {  DataTypes } = require('sequelize');
const sequelize = require('../db');

const Token = sequelize.define('Token', {
  riotToken: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});
Token.sync();
module.exports = Token;
