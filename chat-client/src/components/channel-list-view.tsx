import { FC } from "react";
import { Channel } from "../types/channel.types";
import { Box, BoxProps, Text } from "@chakra-ui/react"
import { ChannelView } from "./channel-view";

interface ChannelListViewProps extends BoxProps {
    channels?: Channel[]
}


export const ChannelListView: FC<ChannelListViewProps> = ({channels, ...props}) => {

    if (!channels) return <Text>No Channels</Text>
    return <Box {...props}>{channels.map(channel => <ChannelView key={channel.id} channel={channel} />)}</Box>

}