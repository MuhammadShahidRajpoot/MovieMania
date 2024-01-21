const ErrorConstants = require('../constants/errors.constant');

async function validateAddMovie(input) {
    let error = {
        status: false,
        error: ""
    };

    if (!input.name) {
        error.status = true;
        error.error = ErrorConstants.MOVIE_NAME_REQUIRED;
        return error;
    }

    if (!input.year) {
        error.status = true;
        error.error = ErrorConstants.MOVIE_YEAR_REQUIRED;
        return error;
    }

    return error;
}

module.exports = { validateAddMovie };