import { io } from "socket.io-client";
import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ChatView } from "./components/chat-view";
const SERVER = "http://localhost:8080";



function App() {
  const socket = io(SERVER, {
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "put the bunny back in the box",
    },
  });
  socket.on("connection", () => {
    console.log("Client connected!");
  });

  return (<ChatView />);
}

export default App;
