import { io } from "socket.io-client";
import { ChatView } from "./components/chat-view";

export const SERVER = "http://localhost:8080";

function App() {
  return (<ChatView />);
}

export default App;
