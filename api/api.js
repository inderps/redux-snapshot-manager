import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';

export default function setupApi(customPort, database, callback) {
  const app = express();
  const httpServer = http.createServer(app);

  app.use(bodyParser.json());
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

  return httpServer.listen(customPort, callback);
}
