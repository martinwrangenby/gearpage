const axios = require('axios');

const checkServerStatus = async () => {
  try {
    await axios.get(process.env.REACT_APP_FRONTEND);
  } catch (err) {
    console.log(`\n\n\t\x1b[31mTarget server ${process.env.REACT_APP_FRONTEND} is not up\x1b[0m
        Run \x1b[32m"npm start"\x1b[0m before executing the e2e tests`);
    process.exit(0);
  }
};

module.exports = async () => {
  await checkServerStatus();
};
