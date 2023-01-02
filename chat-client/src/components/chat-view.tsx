import { Spacer } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { SERVER } from "../App";
import { ChannelListState } from "../types/channel.types";
import { ChannelListView } from "./channel-list-view";
import { MessageList } from "./message-list";

export const ChatView: FC = () => {
  const socket = io(SERVER, {
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "put the bunny back in the box",
    },
  });

  socket.on("connection", () => {
    console.log("Client connected!");
  });

  useEffect(() => {
    let mounted = true;
    const fetchChannels = async () => {
      const data = await fetch(`${SERVER}/channels`, { credentials: "include", referrerPolicy: "no-referrer-when-downgrade" });
      const json = await data.json();
      if (mounted) {
        setChannelList(json);
      }
    };
    fetchChannels();
    return () => {
      mounted = false;
    };
  }, []);

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
      <MessageList channel={channelList.channels[0]} flex={1} />
    </>
  );
};
