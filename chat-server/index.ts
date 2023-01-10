import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
  Channel,
  Message,
} from "chat-common/types/index.types"

var STATIC_CHANNELS: Channel[] = [
  {
    name: "Global chat",
    participants: 0,
    id: 1,
    sockets: [],
    messages: [],
  },
  {
    name: "Funny",
    participants: 0,
    id: 2,
    sockets: [],
    messages: [],
  },
];

const app = express();
const port: number = 8080;

const httpServer = createServer(app);

// cors middleware for whitelisting
const whitelist = ["http://localhost:3000"];
app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      console.log(app);
      if (origin && whitelist.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
  })
);

app.get("/channels", (req, res) => {
  res.json({ channels: STATIC_CHANNELS });
});

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  cors: {
    credentials: true,
    origin: whitelist,
    allowedHeaders: ["my-custom-header"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);
  socket.emit("connection");
  socket.on(
    "sendMessage",
    (message: Message) => {
      // Add message locally then emit back to client
      console.log("Server received message", message)
      STATIC_CHANNELS.find(c => c.id === message.channelId)?.messages.push(message)
      io.emit("message", message);
    }
  );
  socket.on("channelJoin", (channelId) => {
    console.log("Server received channel join request", channelId);
    STATIC_CHANNELS.forEach((c) => {
      if (c.id === channelId) {
        if (!c.sockets.includes(socket.id)) {
          c.sockets.push(socket.id);
          c.participants++;
          io.emit("channel", c);
        }
      } else {
        let index = c.sockets.indexOf(socket.id);
        if (index != -1) {
          c.sockets.splice(index, 1);
          c.participants--;
          io.emit("channel", c);
        }
      }
    });
    return channelId;
  });
});

httpServer.listen(port, () => {
  console.log(`listening on *:${port}`);
});
