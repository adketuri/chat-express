import { createServer } from "http";
import { Server } from "socket.io";

const port: number = 8080;

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    allowedHeaders: ["my-custom-header"],
    credentials: true,
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