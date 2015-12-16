const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();
const httpServer = http.createServer(app);

app.use(bodyParser.json());

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

    app.post('/snapshots', (req, res)=> {
      const name = req.body.name;
      const data = req.body.data;
      const createdAt = new Date();

      database.insert({
        name: name,
        data: data,
        createdAt: createdAt,
      }, (err, doc) => {
        res.status(201).json(doc);
      });
    });

    httpServer.listen(customPort);
  },

  close() {
    httpServer.close();
  },
};

module.exports = api;
