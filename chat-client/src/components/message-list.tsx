import { Box, BoxProps, Button, Flex, Input } from "@chakra-ui/react";
import { FC } from "react";
import { Channel } from "../types/channel.types";
import { MessageView } from "./message";

interface MessageListProps extends BoxProps {
  channel: Channel;
}

export const MessageList: FC<MessageListProps> = ({ channel, ...props }) => {
  return (
    <Flex direction="column" {...props}>
      <Box flex={1}>
        {channel.messages?.map((m) => (
          <MessageView key={m.id} senderName={m.senderName} text={m.text} />
        ))}
      </Box>
      <form>
        <Flex direction="row">
          <Input type="text" />
          <Button>Send</Button>
        </Flex>
      </form>
    </Flex>
  );
};
