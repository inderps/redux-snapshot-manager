var setupApi = require('./build/api').default;
var Datastore = require('nedb');

var apiDb = new Datastore({ filename: 'snapshots.db', autoload: true });

setupApi(~~process.env.PORT || 3000, apiDb, function() {
  console.log('Redux Snapshot Manager started on port:3000');
});
