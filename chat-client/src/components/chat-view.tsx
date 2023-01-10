import { Spinner } from "@chakra-ui/react";
import { FC, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { SERVER } from "../App";
import { Channel, ChannelListState } from "../types/channel.types";
import { ChannelListView } from "./channel-list-view";
import { MessageList } from "./message-list";

export const ChatView: FC = () => {
  const [channelList, setChannelList] = useState<
    ChannelListState | undefined
  >();
  const [currentChannelIndex, setCurrentChannelIndex] = useState<number>(0);

  const socket = useRef<Socket | undefined>();
  const connected = useRef(false);
  useEffect(() => {
    if (!connected.current) {
      socket.current = io(SERVER, {
        withCredentials: true,
        extraHeaders: {
          "my-custom-header": "put the bunny back in the box",
        },
      });
    }

    socket.current?.on("connection", () => {
      console.log("Client connected!");
      connected.current = true;
    });
    socket.current?.on("channel", (channel: any) => {
      if (!channelList?.channels) return;
      console.log("Channel update", channel);
      setChannelList({
        channels:
          channelList?.channels.map((c) =>
            c.id === channel.id
              ? { ...c, participants: channel.participants }
              : c
          ) || [],
      });
    });
    socket.current?.on("message", (message: any) => {
      console.log("Received a message", message);
      if (!channelList?.channels) return;
      const updatedChannels = channelList.channels.map((c) =>
        c.id === message.channelId
          ? {
              ...c,
              messages: c.messages ? [...c.messages, message] : [message],
            }
          : c
      );
      console.log("Setting message", updatedChannels);
      setChannelList({
        channels: updatedChannels,
      });
    });
  }, [channelList, channelList?.channels]);

  useEffect(() => {
    let mounted = true;
    const fetchChannels = async () => {
      const data = await fetch(`${SERVER}/channels`, {
        credentials: "include",
      });
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

  const handleChannelSelect = (id: number) => {
    socket.current?.emit("channelJoin", id, (ack: any) => {
      console.log("ChannelJoin ack", ack);
    });
    setCurrentChannelIndex(id - 1);
  };

  const handleSendMessage = (channelId: number, text: string) => {
    if (!socket.current) return;
    const message = {
      channelId,
      text,
      senderName: socket.current.id,
      id: Date.now(),
    };
    console.log("Client is sending a message: ", message);
    socket.current.emit("sendMessage", message);
  };

  if (!channelList) return <Spinner />;

  return (
    <>
      <ChannelListView
        channels={channelList.channels}
        onChannelSelect={handleChannelSelect}
      />
      <MessageList
        channel={channelList.channels[currentChannelIndex]}
        onMessageSend={handleSendMessage}
        flex={1}
      />
    </>
  );
};
