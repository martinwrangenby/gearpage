const { google } = require('googleapis');

const baseUrl = process.env.REACT_APP_DB;
const userId = process.env.E2E_TEST_UID;

const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/firebase.database',
];

const promisify = f => (...args) =>
  new Promise((resolve, reject) =>
    f(...args, (err, result) => err ? reject(err) : resolve(result))
  );

const _getGoogleApiToken = async () => {
  const jwtClient = new google.auth.JWT(
    process.env.FIREBASE_SC_CLIENT_EMAIL,
    null,
    process.env.FIREBASE_SC_PRIVATE_KEY.replace(/\\n/gm, '\n'),
    scopes
  );
  return promisify(cb => jwtClient.authorize(cb))();
};

const deleteGearItem = async (id) => {
  const { access_token } = await _getGoogleApiToken();
  const res = await fetch(`${baseUrl}/users/${userId}/gear/${id}.json`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!res.ok) {
    throw new Error(`Could not delete id ${id} from DB`);
  }
};

const addGearItem = async (gearItem) => {
  const { access_token } = await _getGoogleApiToken();
  const res = await fetch(`${baseUrl}/users/${userId}/gear.json`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gearItem),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Could not add gearItem: ${JSON.stringify(gearItem)}\n${errText}`);
  }

  const data = await res.json();
  return data.name;
};

module.exports = { deleteGearItem, addGearItem };
