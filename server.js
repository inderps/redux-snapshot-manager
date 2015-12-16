const api = require('./api/api');
const Datastore = require('nedb');

const apiDb = new Datastore({ filename: 'snapshots.db', autoload: true });

api.listen(~~process.env.PORT || 3000, apiDb);
