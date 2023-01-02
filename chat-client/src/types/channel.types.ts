export interface Message {
  id: number;
  text: string;
  senderName: string;
}

export interface Channel {
  id: number;
  name: string;
  participants: number;
  messages?: Message[];
}

export interface ChannelListState {
  channels: Channel[];
}
