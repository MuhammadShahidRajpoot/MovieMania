const Sequelize = require('sequelize');
const sequelize = require('./database');
const UserFavoriteMovies = require("./UserFavoriteMovies");

const Movies = sequelize.define("movies", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  year: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  deleted_at: {
    type: Sequelize.DATE
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updated_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  }
}, {
  paranoid: true,
  underscored: true,
  freezeTableName: true,
});

Movies.hasMany(UserFavoriteMovies);

module.exports = Movies;
