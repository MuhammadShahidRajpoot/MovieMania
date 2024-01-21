require('dotenv').config()

class Config {
    static PORT = process.env.PORT || 3000
    static NODE_ENV = process.env.NODE_ENV || "dev"
    static SECRET_FOR_JWT = process.env.SECRET_FOR_JWT?.replace(/\\n/g, '\n')
    static DATABASE_NAME = process.env.DATABASE_NAME
    static DATABASE_USER = process.env.DATABASE_USER
    static DATABASE_PASSWORD = process.env.DATABASE_PASSWORD
    static DATABASE_HOST = process.env.DATABASE_HOST
    static FROM_EMAIL_SEND_ADDRESS = process.env.FROM_EMAIL_SEND_ADDRESS
    static FROM_EMAIL_APP_PASSWORD = process.env.FROM_EMAIL_APP_PASSWORD
    static WEB_URL = process.env.WEB_URL
}

module.exports = Config