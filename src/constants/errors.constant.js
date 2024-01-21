class ErrorConstants {

    static ERROR = 'Something went wrong';

    //Movie
    
    static MOVIE_NAME_REQUIRED = 'Movie name is required';
    static MOVIE_IMAGE_REQUIRED = 'Movie image is required';
    static MOVIE_YEAR_REQUIRED = 'Movie year is required';

    static MOVIE_ID_REQUIRED = 'Movie id is required';

    //User

    static USER_NAME_REQUIRED = 'User name is required';
    static USER_EMAIL_REQUIRED = 'User email is required';
    static USER_PASSWORD_REQUIRED = 'User password is required';
    static USER_PASSWORD_DOESNT_MATCHED = 'Password doesnt matched';
    static USER_CONFIRM_PASSWORD_REQUIRED = 'Confirm Password is required';
    static USER_WITH_EMAIL_ALREADY_EXISTS= 'User mail already exists';
    static USER_WITH_USER_NAME_ALREADY_EXISTS= 'User name already exists';
    static USER_NOT_EXIST='User doesnt exists'
}

module.exports = ErrorConstants;