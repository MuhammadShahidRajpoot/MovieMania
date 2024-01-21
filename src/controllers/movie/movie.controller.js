const UserFavoriteMovies = require("../../models/UserFavoriteMovies");
const { validateAddMovie } = require("../../validator/movie.validator");
const Movies = require("../../models/movie");
const { resError, resSuccess } = require("../../utils/response");
const ErrorConstants = require("../../constants/errors.constant");
const SuccessConstants = require("../../constants/success.constant");
const { Op } = require("sequelize");

async function addAndUpdateMovie(req, res) {
  try {
    const valid = await validateAddMovie(req.body);
    req.body.image = req.fileName;

    if (valid.status) {
      return res.status(409).send(resError(valid.error, 409));
    }
    const userId = req.user.user.id;
    let movie;
    if (req.query.id) {
      movie = await Movies.findByPk(req.query.id);
    }
    if (!movie) {
      const addedMovie = await Movies.create({
        ...req.body,
        user_id: userId,
      });
      return res.send(
        resSuccess(SuccessConstants.MOVIE_UPDATED, 200, addedMovie)
      );
    }

    // Check if the movie belongs to the logged-in user
    if (movie.userId !== userId) {
      return res.status(403).send(resError("Unauthorized", 403));
    }

    const movieUpdated = await Movies.update(
      { ...req.body, user_id: userId },
      { where: { id: req.query.id } }
    );

    return res.send(
      resSuccess(SuccessConstants.MOVIE_CREATED, 200, movieUpdated)
    );
  } catch (error) {
    console.log("error", error);
    return res.status(409).send(resError(ErrorConstants.ERROR, 409));
  }
}

async function getAllMovies(req, res) {
  try {
    console.log("req.user line 52", req.query.id, req.query);
    const userId = req.user.user?.id;

    if (req.query.id) {
      const movie = await Movies.findByPk(req.query.id);

      if (!movie) {
        return res.status(404).send(resError("Movie not found", 404));
      }

      return res.send(resSuccess(SuccessConstants.MOVIE_RETRIEVED, 200, movie));
    }
    const { page = 1, moviesPerPage = 8, search } = req.query;

    const offset = (+page - 1) * moviesPerPage;

    let whereCondition = {};

    if (search) {
      whereCondition = {
        name: {
          [Op.like]: `%${search}%`,
        },
      };
    }

    const movies = await Movies.findAndCountAll({
      where: whereCondition,
      limit: parseInt(moviesPerPage),
      offset: offset,
    });
    const { rows, count } = movies;
    // return res.send(resSuccess(SuccessConstants.MOVIE_RETRIEVED, 200, movies));
    // const movies = await Movies.findAll();
    const favorites = await UserFavoriteMovies.findAll({
      where: {
        user_id: userId,
      },
      attributes: ["movie_id"],
    });

    //             {*************for geting all movies ************}
    // const moviesWithFavorites = movies.map((movie) => {
    //   const isFavorite = favorites.some((favorite) => {
    //     favorite = favorite.toJSON();
    //     return favorite?.movie_id === movie.id;
    //   });

    //   return {
    //     ...movie.toJSON(),
    //     isFavorite: isFavorite,
    //   };
    // });

    //   {*************for geting all movies and checking param for fav movies and returning accordingly************}

    // const moviesWithFavorites = movies.map((movie) => {
    //   const isFavorite = favorites.some((favorite) => {
    //     favorite = favorite.toJSON();
    //     return favorite?.movie_id === movie.id;
    //   });
    //        if (req.query.favourites === "true" && isFavorite) {
    //     return {
    //       ...movie.toJSON(),
    //       isFavorite: true,
    //     };
    //   } else if (req.query.favourites !== "true") {
    //     return {
    //       ...movie.toJSON(),
    //       isFavorite: isFavorite,
    //     };
    //   }

    //   return null;
    // });
    //   const filteredMovies = moviesWithFavorites.filter(
    //     (movie) => movie !== null
    //   );

    //   {*************using reduce to avoid looping again for excluding null values************}
    const moviesWithFavorites = rows?.reduce((acc, movie) => {
      const isFavorite = favorites?.some((favorite) => {
        favorite = favorite.toJSON();
        return favorite?.movie_id === movie.id;
      });

      if (req.query.favourites === "true") {
        if (isFavorite) {
          acc.push({
            ...movie.toJSON(),
            isFavorite: true,
          });
        }
      } else if (req.query.favourites !== "true") {
        acc.push({
          ...movie.toJSON(),
          isFavorite: isFavorite,
        });
      }

      return acc;
    }, []);

    return res.send(
      resSuccess(SuccessConstants.MOVIE_RETRIEVED, 200, {
        count,
        moviesWithFavorites,
      })
    );
  } catch (error) {
    console.log("error", error);
    return res.status(409).send(resError(ErrorConstants.ERROR, 409));
  }
}

async function addAndRemoveFav(req, res) {
  try {
    console.log("req.query", req.query, req.body);
    if (!req.body.movieid) {
      return res
        .status(409)
        .send(resError(ErrorConstants.MOVIE_ID_REQUIRED, 409));
    }

    const movieId = req.body.movieid;
    const userId = req.user.user.id;

    // Check if the movie is already a favorite for the user
    const existingFavorite = await UserFavoriteMovies.findOne({
      where: {
        movie_id: movieId,
        user_id: userId,
      },
    });

    if (existingFavorite) {
      // If the movie is already a favorite, delete the row
      await existingFavorite.destroy();
      return res.send(resSuccess(SuccessConstants.MOVIE_DELETED, 200));
    } else {
      // If the movie is not a favorite, add a new row
      await UserFavoriteMovies.create({
        movieId: movieId,
        userId: userId,
      });

      return res.send(
        resSuccess(SuccessConstants.MOVIE_ADDED_TO_FAVORITES, 200)
      );
    }
  } catch (error) {
    console.log("error", error);
    return res.status(409).send(resError(ErrorConstants.ERROR, 409));
  }
}

// async function addAndUpdateMovie(req, res) {
//   try {
//     const valid = await validateAddMovie(req.body);
//     console.log("fileName{{1}}", req)
//     console.log("fileName{{2}}", req.fileName)
//     req.body.image=req.fileName;
//     if (valid.status) {
//       return res.status(409).send(resError(valid.error, 409));
//     }
//    if(req.query.id){
//     const movie = await Movies.findByPk(req.query.id);
//     if (!movie) {
//       return res.status(404).send(resError("Movie not found", 404));
//     }
//     const movieUpdated= await movie.update(req.body);
//     return res.send(resSuccess(SuccessConstants.MOVIE_UPDATED, 200, movieUpdated));
//   }
//     const addedMovie = await Movies.create(req.body);
//     return res.send(resSuccess(SuccessConstants.MOVIE_CREATED, 200, addedMovie));
//   } catch (error) {
//     console.log("error", error)
//     return res.status(409).send(resError(ErrorConstants.ERROR, 409));
//   }
// }

// async function deleteMovie(req, res) {
//   try {
//     if (!req.query.id) {
//       return res
//         .status(409)
//         .send(resError(ErrorConstants.MOVIE_ID_REQUIRED, 409));
//     }
//     const movie = await Movies.findByPk(req.query.id);
//     if (!movie) {
//       return res.status(404).send(resError("Movie not found", 404));
//     }
//     await movie.destroy();
//     return res.send(resSuccess(SuccessConstants.MOVIE_DELETED, 200));
//   } catch (error) {
//     console.log("error", error);
//     return res.status(409).send(resError(ErrorConstants.ERROR, 409));
//   }
// }

// async function getAllMovies(req, res) {
//   try {
//     if (req.query.id) {
//       const movie = await Movies.findByPk(req.query.id);
//       if (!movie) {
//         return res.status(404).send(resError("Movie not found", 404));
//       }
//       return res.send(resSuccess(SuccessConstants.MOVIE_RETRIEVED, 200, movie));
//     }
//     const movies = await Movies.findAll();
//     return res.send(resSuccess(SuccessConstants.MOVIE_RETRIEVED, 200, movies));
//   } catch (error) {
//     console.log("error", error);
//     return res.status(409).send(resError(ErrorConstants.ERROR, 409));
//   }
// }

module.exports = {
  addAndUpdateMovie,
  // deleteMovie,
  getAllMovies,
  addAndRemoveFav,
};
