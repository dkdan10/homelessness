const express = require("express")
const app = express()
const mongoose = require('mongoose')
const db = require('./config/keys').mongoURI
const bodyParser = require('body-parser')

// SETUP KEYS / SERVE STATIC FILES
const path = require('path');
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'))
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
}

// IMPORT API ROUTE HANDLING
const users = require('./routes/api/users');
const requests = require('./routes/api/requests')
const conversations = require('./routes/api/conversations')
const messages = require('./routes/api/messages')

// SETUP PASSPORT FOR AUTH, BODY PARSER, AND ROUTES
const passport = require('passport')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(passport.initialize())
require('./config/passport')(passport)

app.use("/api/users", users)
app.use("/api/requests", requests)
app.use("/api/conversations", conversations)
app.use("/api/messages", messages)

// CONNECT TO MONGO DB
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));



// SETUP SERVER AND LISTEN
const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`Server is running on port ${port}`))


//_______________________________ SETUP WEBSOCKETS (Move to seperate file) _______________________________
const socket = require('socket.io')
const io = socket(server)

const socketLookup = {}
const userIdToSocketId = {}
const socketIdToUserId = {}

io.on('connection', (socket) => {
    // console.log(socket.id)
    socketLookup[socket.id] = socket 
    socketIdToUserId[socket.id] = null
    
    socket.on('ASSIGN_USER_TO_SOCKET', function(data) {
        // console.log("connect assign")
        userIdToSocketId[data.userId] = data.socketId
        socketIdToUserId[data.socketId] = data.userId
        // console.log(data)
        // console.log(userIdToSocketId)
    })

    socket.on('disconnect', function () {
        // console.log("disconnect")
        delete userIdToSocketId[socketIdToUserId[socket.id]]
        delete socketIdToUserId[socket.id]
        delete socketLookup[socket.id]
        // console.log(userIdToSocketId)
    })

    socket.on('SEND_MESSAGE', function (data) {
        // SAVE MESSAGE TO DB HERE?
        if (userIdToSocketId[data.recipientUserId] && data.recipientUserId !== data.message.senderId) {
            // console.log(data)
            const socketId = userIdToSocketId[data.recipientUserId]
            socketLookup[socketId].emit('RECEIVE_MESSAGE', data)
        }
        // if (userIdToSocketId[data.senderId]) {
        //     userIdToSocketId[data.senderId].emit('RECEIVE_MESSAGE', data)
        // }
    })

    socket.on("CREATE_CONVERSATION", function (data) {
        console.log(data)
        const createrUserId = data.currentUser.id
        data.convoData.conversation.participants.forEach(userId => {
            if (userId !== createrUserId) {
                const socketId = userIdToSocketId[userId]
                socketLookup[socketId].emit('RECIEVE_CONVERSATION', {
                    conversation: data.convoData.conversation,
                    users: data.convoData.conversationUsers
                })
            }
        })
    })
});
