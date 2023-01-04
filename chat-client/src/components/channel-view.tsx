import { Box, Button, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Channel } from "../types/channel.types";

export interface ChannelViewProps {
  channel: Channel;
  onChannelSelect?: (id: number) => void;
}
export const ChannelView: FC<ChannelViewProps> = ({
  channel,
  onChannelSelect,
}) => {
  const { name, participants } = channel;
  return (
    <Button
      flexDirection="column"
      onClick={() => onChannelSelect && onChannelSelect(channel.id)}
    >
      <Text fontSize="xl">{name}</Text>
      <Text>{`${participants} participants`}</Text>
    </Button>
  );
};
