const axios = require('axios');

const instance = axios.create({
  baseURL: process.env.REACT_APP_DB,
});

const deleteGearItem = (id) => {
  return instance.delete(`/gear/${id}.json`)
    .then(res => null)
    .catch(err => { throw new Error(`Could not delete id ${id} from DB`); });
};

const addGearItem = (gearItem) => {
  return instance.post('/gear.json', gearItem)
    .then(res => res.data.name)
    .catch(err => { throw new Error(`Could not add gearItem: ${JSON.stringify(gearItem)}`); });
};

module.exports = { deleteGearItem, addGearItem };
