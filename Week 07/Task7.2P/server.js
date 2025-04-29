const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;

app.use(express.static('public'));

// Socket connection logic
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Only one interval, sending to all clients
setInterval(() => {
  const randomNum = Math.floor(Math.random() * 100);
  io.emit('number', randomNum);
}, 1000);

http.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
