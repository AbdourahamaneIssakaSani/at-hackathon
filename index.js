const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server); 
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

// try 
// http://localhost:3000 - works on my end
// http://127.0.0.1:3000 - doesn't work on my end

// socket connection in postman doesn't work at all

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/realtime', (req, res) => {
  io.emit('realtime', { message: 'realtime' });
  res.send('realtime');

});

io.on('connection', (socket) => { 
  console.log('a user connected');

  socket.on("realtime", (data) => {
    console.log("realtime");
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

let ws;

// get phone number from the UI
app.post('/call', (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    // send phone number to the server
    ws.send(JSON.stringify({ phoneNumber }));
    }
    // make a call
    // Live: https://voice.sandbox.africastalking.com/call
    // username: payflow
    // from: phoneNumber from them
    // username: payflow
    // to: req.body.phoneNumber
    // Header: Content-Type: application/x-www-form-urlencoded
); 

// receive a call
// Live: https://voice.sandbox.africastalking.com/call
app.post('/events', (req, res) => {
    const data = req.body;

    // send a call message to the UI
    ws.send(JSON.stringify({ data }));

    // send back a Dial event
});

app.post('/test/voice', async (req, res) => {
    const data = req.body;

   console.log(data);
    // connect to mongo db
    await mongoose.connect(process.env.V1_MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    // save in a collection
    const VoiceModel = mongoose.model('Voice', {
        data: Object
    });
    await VoiceModel.create({ data });

    res.send('ok');

});

// app.listen(3000, () => console.log('Server running on port 3000')); 