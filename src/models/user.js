const Sequelize = require('sequelize');
const sequelize = require('./database');
const UserFavoriteMovies = require("./UserFavoriteMovies");
const Movies = require('./movie');

const Users = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  user_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
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
Movies.belongsTo(Users);
Users.hasMany(UserFavoriteMovies);
module.exports = Users;
