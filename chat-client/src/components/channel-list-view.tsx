import { FC } from "react";
import { Channel } from "../types/channel.types";
import { Text } from "@chakra-ui/react"
import { ChannelView } from "./channel-view";

interface ChannelListViewProps {
    channels?: Channel[]
}


export const ChannelListView: FC<ChannelListViewProps> = ({channels}) => {

    if (!channels) return <Text>No Channels</Text>
    return <>{channels.map(channel => <ChannelView key={channel.id} channel={channel} />)}</>

}