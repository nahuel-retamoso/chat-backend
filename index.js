
const { Server } = require("socket.io");
const Port = process.env.PORT;
const Origin = process.env.CORS_ORIGIN;

const io = new Server({
    cors: {
        origin: Origin || "http://localhost:3001",
        methods: ["GET", "POST"]
    }
});

console.log('hi')

const connectedUsers = {};

io.on("connection", (socket) => {
    console.log('user' + socket.id);
    socket.emit('your id', socket.id);
    socket.on("chat message", function (msg) {
        console.log('message: ' + msg)
        io.emit('chat messages', msg)
    });
    socket.on("username", function (user) {
        
        connectedUsers[socket.id] = user;
        console.log(connectedUsers);
        io.emit("users", connectedUsers);
    })
    socket.on('disconnect', function () {
        delete connectedUsers[socket.id];
        io.emit("users", connectedUsers);
    })
});

const port = Port || 3000;

io.listen(port);