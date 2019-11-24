const express = require("express");
const app = express();
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI
const bodyParser = require('body-parser');

// SETUP KEYS / SERVE STATIC FILES
const path = require('path');
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}

// SETUP API ROUTE HANDLING
const users = require("./routes/api/users");
const requests = require("./routes/api/requests")

app.use("/api/users", users);
app.use("/api/requests", requests)

// SETUP PASSPORT FOR AUTH AND BODY PARSER
const passport = require('passport');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./config/passport')(passport);

// CONNECT TO MONGO DB
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));



// SETUP SERVER AND LISTEN
const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`Server is running on port ${port}`));

// SETUP WEBSOCKETS
const socket = require('socket.io');
io = socket(server);

io.on('connection', (socket) => {
    console.log(socket.id);
    // add connected ids to hash table. 

    socket.on('SEND_MESSAGE', function (data) {
        console.log(data)
        // io.emit('RECEIVE_MESSAGE', data);
    })
    /*
    // SET UP CHAT SOCKETS;
    chatSockets(socket)
    socketData = {
        senderId: id,
        recepientId: id,
        messageContent: string
    }
    */
});
