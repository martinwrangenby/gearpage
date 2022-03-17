require('dotenv').config(({ path: '.env.local' }));
const logFormat = require('../assets/logFormat');

// TODO: the db URL is only read from the .env file and I haven't figured out how it should work for an deployed version
// Therefore this check below is only user for npm start and not build at this point. DB in production needs to be handled later...
// Warn and crash if db url isn't set
if (!process.env.REACT_APP_DB) {
  console.log(`${logFormat.color.fg.red}
    You need to specify your backend URL as the REACT_APP_DB env variable
    More info on how to work with env variables: ${logFormat.color.fg.blue}https://create-react-app.dev/docs/adding-custom-environment-variables/
    ${logFormat.clearFormat}`);
  process.exit(1);
}
