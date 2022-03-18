const axios = require('axios');
const logFormat = require('../../assets/logFormat');

module.exports = async () => {
  try {
    await axios.get(process.env.REACT_APP_FRONTEND);
  } catch (err) {
    console.log(`\t${logFormat.color.fg.red}Target server ${process.env.REACT_APP_FRONTEND} is not up${logFormat.clearFormat}
        Run ${logFormat.color.fg.green}"npm start"${logFormat.clearFormat} before executing the e2e tests`);
    process.exit(0);
  }
};
