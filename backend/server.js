const express = require('express');
const authRoutes = require('./routes/auth.route.js');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { Server } = require('socket.io');
const { spawn } = require("child_process");
const http = require('http');

const app = express();
const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: "*",
    methods:["GET","POST"]
  },
});

if (io) {
  console.log("Sockets Initialized ")
}

const emailToSocketIdMap = new Map();
const socketIdToEmailMap = new Map();

const getUsersInRoom = async (roomName) => {
  const sockets = await io.in(roomName).fetchSockets();
  const users = sockets.map((socket) => ({
    socketId: socket.id,
    email: socketIdToEmailMap.get(socket.id) || "Unknown",
  }));
  return users;
};


io.on("connection", socket => {
  console.log('socket connected', socket.id);
  socket.on('room:join', (data) => {
    const { email, room } = data;  
    emailToSocketIdMap.set(email, socket.id);
    socketIdToEmailMap.set(socket.id, email)
    socket.join(room);  
    socket.to(room).emit('user:joined', { email, id: socket.id });
    socket.emit('room:join', data);

    console.log(emailToSocketIdMap);
    console.log(socketIdToEmailMap);
    

    socket.on('user:call', ({ to, offer }) => {
      console.log("User Accepted");

      io.to(to).emit('incoming:call', {
        from: socket.id, offer
      })
    });

    socket.on("call:accepted", ({ to, ans }) => {
      console.log("Call Accepted");
      
      io.to(to).emit('call:accepted', {
        from: socket.id, ans
      })
    });

    socket.on('peer:nego:needed', ({ to, offer }) => {
      console.log("peer:nego:needed",offer);
      
      io.to(to).emit('peer:nego:needed', {
        from: socket.id, offer
      })
    });

    socket.on("peer:nego:done", ({ to, ans }) => {
      console.log("peer:nego:done",ans);

      io.to(to).emit('peer:nego:final', {
        from: socket.id, ans
      })
    })

    socket.on("room:getUsers", async ({ room }) => {
      const users = await getUsersInRoom(room);
      socket.emit("room:users", users);
    });

  });
  
})









// CORS + other Express setup
app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Mongo connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Start server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
