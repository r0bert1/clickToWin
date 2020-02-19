const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());

app.get('/api/counter', (req, res) => {
  res.send({ counter: 3 });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
  });
}

const port = process.env.PORT || 3001;

app.listen(port);
