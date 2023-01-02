import { Spacer } from "@chakra-ui/react";
import { FC, useState } from "react";
import { ChannelListState } from "../types/channel.types";
import { ChannelListView } from "./channel-list-view";
import { MessageList } from "./message-list";

export const ChatView: FC = () => {
  const [channelList, setChannelList] = useState<ChannelListState>({
    channels: [
      {
        id: 4,
        name: "first",
        participants: 10,
        messages: Array(5)
          .fill({ text: "Hello", senderName: "Admin" })
          .map((m, i) => ({ ...m, id: i })),
      },
    ],
  });
  return (
    <>
      <ChannelListView channels={channelList.channels} />
      <MessageList channel={channelList.channels[0]} flex={1}/>
    </>
  );
};
