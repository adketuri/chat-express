
export interface ServerToClientEvents {
    connection: () => void
    channel: (c: Channel) => void
    message: (m: Message) => void
    withAck: (d: string, callback: (e: number) => void) => void;
  }
  
  export interface ClientToServerEvents {
    channelJoin: (id: number) => void;
    sendMessage: (message: Message) => void
  } 
  
  export interface InterServerEvents {
    ping: () => void;
  }
  
  export interface SocketData {
    id: string;
  }
  
  export interface Message {
    channelId: number
    text: string
    senderName: string
    id: number
  }
  
  export interface Channel {
      name: string,
      participants: number,
      id: number,
      sockets: string[],
      messages: Message[],
  }