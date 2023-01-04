
export interface ServerToClientEvents {
  connection: () => void;
  channel: (c: any) => void
  withAck: (d: string, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents {
  channelJoin: (id: number) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  id: string;
}

export interface Channel {
    name: string,
    participants: number,
    id: number,
    sockets: string[],
}