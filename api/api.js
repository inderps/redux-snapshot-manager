const express = require('express');
const http = require('http');

const app = express();
const httpServer = http.createServer(app);

app.get('/snapshots', (req, res)=> {
  res.json({'a': 'b'});
});

const api = {
  listen(customPort) {
    httpServer.listen(customPort);
  },

  close() {
    httpServer.close();
  },
};

module.exports = api;
