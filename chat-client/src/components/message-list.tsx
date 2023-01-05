import { Box, BoxProps, Button, Flex, Input, Text } from "@chakra-ui/react";
import { FC, useState } from "react";
import { Channel } from "../types/channel.types";
import { MessageView } from "./message";

interface MessageListProps extends BoxProps {
  channel?: Channel;
  onMessageSend: (channelId: number, text: string) => void;
}

export const MessageList: FC<MessageListProps> = ({
  channel,
  onMessageSend,
  ...props
}) => {
  const [text, setText] = useState("");

  if (!channel) return <Text>Select A Channel</Text>;
  
  const handleSubmit = () => {
    onMessageSend(channel.id, text);
    setText("");
  };
  
  return (
    <Flex direction="column" {...props}>
      <Box flex={1}>
        {channel.messages?.map((m) => (
          <MessageView key={m.id} senderName={m.senderName} text={m.text} />
        ))}
      </Box>
      <Flex direction="row">
        <Input
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
          onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
        />
        <Button onClick={handleSubmit}>Send</Button>
      </Flex>
    </Flex>
  );
};
