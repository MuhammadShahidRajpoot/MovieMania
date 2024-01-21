const ErrorConstants = require('../constants/errors.constant');

async function validateRegisterUser(input) {
    let error = {
        status: false,
        error: ""
    };

    if (!input.user_name) {
        error.status = true;
        error.error = ErrorConstants.USER_NAME_REQUIRED;
        return error;
    }

    if (!input.email) {
        error.status = true;
        error.error = ErrorConstants.USER_EMAIL_REQUIRED;
        return error;
    }

    if (!input.password) {
        error.status = true;
        error.error = ErrorConstants.USER_PASSWORD_REQUIRED;
        return error;
    }

    if (!input.confirm_password) {
        error.status = true;
        error.error = ErrorConstants.USER_CONFIRM_PASSWORD_REQUIRED;
        return error;
    }

    if (input.password !=input.confirm_password) {
        error.status = true;
        error.error = ErrorConstants.USER_PASSWORD_DOESNT_MATCHED;
        return error;
    }

    return error;
}

async function validateUpdateUser(input) {
    let error = {
        status: false,
        error: ""
    };

    if (!input.user_name) {
        error.status = true;
        error.error = ErrorConstants.USER_NAME_REQUIRED;
        return error;
    }

    if (!input.email) {
        error.status = true;
        error.error = ErrorConstants.USER_EMAIL_REQUIRED;
        return error;
    }


    return error;
}

async function validateLoginUser(input) {
    let error = {
        status: false,
        error: ""
    };

    if (!input.email) {
        error.status = true;
        error.error = ErrorConstants.USER_EMAIL_REQUIRED;
        return error;
    }

    if (!input.password) {
        error.status = true;
        error.error = ErrorConstants.USER_PASSWORD_REQUIRED;
        return error;
    }

  
    return error;
}


module.exports = { validateRegisterUser, validateLoginUser, validateUpdateUser };

