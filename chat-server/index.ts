import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";


const STATIC_CHANNELS = ['global_notifications', 'global_chat'];
const app = express()
const port: number = 8080;

const httpServer = createServer(app);
const whitelist = ['http://localhost:3000'];
app.use(cors({
  credentials: true,
  origin: (origin, callback) => {
    if(origin && whitelist.includes(origin)) {
      return callback(null, true)
    }
    callback(new Error('Not allowed by CORS'));
  }
}))

app.get('/channels', (req, res) => {
  res.json({
      channels: STATIC_CHANNELS.map(c => ({name: c, participants: 0}))
  })
});

const io = new Server(httpServer, {
  cors: {
    credentials: true,
    origin: whitelist,
    allowedHeaders: ["my-custom-header"],
    methods: ["GET", "POST"],
  },
});

io.on('connection', (socket) => { 
    console.log('new client connected');
    socket.emit('connection', null);
});

httpServer.listen(port, () => {
  console.log(`listening on *:${port}`);
});