const { Sequelize } = require('sequelize');

// Inicializa una conexión a la base de datos SQLite creando una instancia de Sequelize

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '../../EHP_I_BD/BDEcoHarmonyPark.db', 
});

module.exports = sequelize;
