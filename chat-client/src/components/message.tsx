import { Box, Flex, Text } from "@chakra-ui/react";
import { FC } from "react";

export interface MessageViewProps {
  senderName: string;
  text: string;
}

export const MessageView: FC<MessageViewProps> = ({ senderName, text }) => {
  return (
    <Flex direction="row">
      <Text as="b" mr={2}>{`${senderName}:`}</Text>
      <Text>{text}</Text>
    </Flex>
  );
};
