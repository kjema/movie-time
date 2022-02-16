import Pusher from "pusher-js";
import React from "react";

let pusherClient: Pusher | null = null;

export const usePusher = () => {
  const [, forceRerender] = React.useState<Record<string, unknown>>();

  React.useEffect(() => {
    if (pusherClient) return;

    Pusher.logToConsole = true;

    const pusher = new Pusher("393bf264f6f62cb16b4d", {
      cluster: "eu",
    });

    pusherClient = pusher;
    forceRerender({});
  }, []);

  return pusherClient;
};

export const usePusherMessages = () => {
  const [messages, setMessages] = React.useState<string[]>([]);
  const pusherClient = usePusher();

  React.useEffect(() => {
    if (!pusherClient) return;

    const channel = pusherClient.subscribe("my-channel");
    channel.bind("my-event", (data: any) => {
      console.log("data", data);
      setMessages((current) => [...current, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [pusherClient]);

  return messages;
};
