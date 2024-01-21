const Sequelize = require("sequelize");
const sequelize = require("./database");

const UserFavoriteMovies = sequelize.define(
  "user_favorite_movies",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users", // Assuming you have a 'users' table
        key: "id",
      },
    },
    movieId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "movies", // Assuming you have a 'movies' table
        key: "id",
      },
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    underscored: true,
    freezeTableName: true,
  }
);

module.exports = UserFavoriteMovies;
