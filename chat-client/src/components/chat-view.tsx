import { Box } from "@chakra-ui/react";
import { FC, useState } from "react";
import { ChannelListState } from "../types/channel.types";
import { ChannelListView } from "./channel-list-view";

export const ChatView: FC = () => {
  const [channelList, setChannelList] = useState<ChannelListState>({
    channels: [{ id: 4, name: "first", participants: 10 }],
  });
  return (
    <>
      <Box>Chat App</Box>
      <ChannelListView channels={channelList.channels}/>
    </>
  );
};
