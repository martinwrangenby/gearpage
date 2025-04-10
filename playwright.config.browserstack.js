const config = require('./playwright.config');

config.use.baseURL = `http://${process.env.REACT_APP_FIREBASE_AUTHDOMAIN}`;
config.retries = 2;

module.exports = config;
