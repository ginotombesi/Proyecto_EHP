const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '../../EHP_I_BD/BDEcoHarmonyPark.db', 
});

module.exports = sequelize;
