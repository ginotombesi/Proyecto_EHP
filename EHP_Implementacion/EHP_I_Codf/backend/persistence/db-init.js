const sequelize = require('./db.js');

// Sincroniza los modelos con la base de datos SQLite

async function dbInit() {
  try {
    await sequelize.authenticate();

    await sequelize.sync();
    console.log('Modelos sincronizados con la base de datos');
  } catch (error) {
    console.error('Error al sincronizar modelos:', error);
  }
}

module.exports = dbInit;
