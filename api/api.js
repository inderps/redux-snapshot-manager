const express = require('express');
const http = require('http');

const app = express();
const httpServer = http.createServer(app);

const api = {
  listen(customPort, database) {
    app.get('/snapshots', (req, res)=> {
      let query = {};
      if (req.query.key) {
        query = {
          name: new RegExp(req.query.key),
        };
      }
      database.find(query).sort({ createdAt: -1 }).exec((err, docs) => {
        res.json(docs);
      });
    });

    httpServer.listen(customPort);
  },

  close() {
    httpServer.close();
  },
};

module.exports = api;
