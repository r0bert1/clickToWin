const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build/index.html'));
  });
}

let counter = 0;

io.on('connection', socket => {
  console.log('a user connected');
  socket.emit('initialize counter', counter);

  socket.on('increment', () => {
    counter += 1;
    socket.broadcast.emit('incremented', counter);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const port = process.env.PORT || 3001;

server.listen(port, () => console.log(`Listening on port ${port}`));
