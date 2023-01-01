import { Box, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Channel } from "../types/channel.types";

export interface ChannelViewProps {
    channel: Channel
}
export const ChannelView: FC<ChannelViewProps> = ({channel}) => {
    const {name, participants} = channel
    return <Box>
        <Text>{name}</Text>
        <Text>{`${participants} participants`}</Text>
    </Box>
}