import { io } from "socket.io-client";
import { ChakraProvider } from "@chakra-ui/react";
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

  return (
    <ChakraProvider>
      <ChatView />
    </ChakraProvider>
  );
}

export default App;
