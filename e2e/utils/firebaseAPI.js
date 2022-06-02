const axios = require('axios');
const { google } = require('googleapis');

const instance = axios.create({
  baseURL: process.env.REACT_APP_DB,
});

const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/firebase.database',
];

const userId = process.env.E2E_TEST_UID;

const promisify = f => (...args) =>
  new Promise ((pass, fail) =>
    f (...args, (err, result) => err ? fail(err) : pass(result))
  );

const _getGoogleApiToken = async () => {
  const jwtClient = new google.auth.JWT(process.env.FIREBASE_SC_CLIENT_EMAIL, null, process.env.FIREBASE_SC_PRIVATE_KEY.replace(/\\n/gm, '\n'), scopes);
  return promisify(callback => jwtClient.authorize(callback))();
};

const deleteGearItem = async (id) => {
  const { access_token } = await _getGoogleApiToken();
  return instance.delete(`/users/${userId}/gear/${id}.json`, {  headers: { Authorization: `Bearer ${access_token}` } })
    .then(res => null)
    .catch(err => { throw new Error(`Could not delete id ${id} from DB`); });
};

const addGearItem = async (gearItem) => {
  const { access_token } = await _getGoogleApiToken();
  return instance.post(`/users/${userId}/gear.json`, gearItem, {  headers: { Authorization: `Bearer ${access_token}` } })
    .then(res => res.data.name)
    .catch(err => {
      console.log(err);
      throw new Error(`Could not add gearItem: ${JSON.stringify(gearItem)}`);
    });
};

module.exports = { deleteGearItem, addGearItem };
