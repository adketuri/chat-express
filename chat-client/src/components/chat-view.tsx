import { Spinner } from "@chakra-ui/react";
import { FC, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { SERVER } from "../App";
import { ChannelListState } from "../types/channel.types";
import { ChannelListView } from "./channel-list-view";
import { MessageList } from "./message-list";

export const ChatView: FC = () => {
  const [channelList, setChannelList] = useState<
    ChannelListState | undefined
  >();

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
      console.log("Channel list", JSON.stringify(channelList));
      if (!channelList?.channels) return;
      console.log("NEW CHANNEL", channel);
      setChannelList({
        channels:
          channelList?.channels.map((c) =>
            c.id === channel.id
              ? { ...c, participants: channel.participants }
              : c
          ) || [],
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
        console.log("!AK set channel list", json);
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
      console.log("channel-join ack", ack);
    });
  };

  if (!channelList) return <Spinner />;

  return (
    <>
      <ChannelListView
        channels={channelList.channels}
        onChannelSelect={handleChannelSelect}
      />
      <MessageList channel={channelList.channels[0]} flex={1} />
    </>
  );
};
