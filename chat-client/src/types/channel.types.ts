export interface Channel {
    id: number,
    name: string,
    participants: number
}

export interface ChannelListState {
    channels: Channel[]
}