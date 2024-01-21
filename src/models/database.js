const { DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST } = require('../config/config');

const Sequelize = require('sequelize');
const sequelize = new Sequelize.Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, {
  host: DATABASE_HOST,
  dialect: "mariadb",
  dialectOptions: {
    allowPublicKeyRetrieval: true,
  },
});

module.exports = sequelize;
