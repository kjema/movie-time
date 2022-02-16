import PusherJs from "pusher-js";
import { createContext, useContext, useEffect, useRef, useState } from "react";

type Context = PusherJs | null;

const pusherContext = createContext({} as Context);

const createPusherClient = (): PusherJs => {
  console.log("Create Pusher client");
  // PusherJs.logToConsole = true;
  const pusher = new PusherJs("393bf264f6f62cb16b4d", {
    cluster: "eu",
  });
  return pusher;
};

export const PusherProvider: React.FunctionComponent = ({ children }) => {
  const [pusherClient] = useState<PusherJs>(createPusherClient);
  // const [pusherClient, setPusherClient] = React.useState<PusherJs | null>(null);
  // const pusherRef = useRef<PusherJs>(createPusherClient());
  // const [, rerender] = React.useState<number>(0);

  // React.useEffect(() => {
  //   console.log("Create Pusher client");
  //   const pusher = new PusherJs("393bf264f6f62cb16b4d", {
  //     cluster: "eu",
  //   });
  //   // pusherRef.current = pusher;
  //   // rerender(Math.random());
  //   setPusherClient(pusher);

  //   return () => {
  //     pusher.disconnect();
  //     // pusherRef.current = null;
  //   };
  // }, []);

  return <pusherContext.Provider value={pusherClient}>{children}</pusherContext.Provider>;
};

export const usePusher = () => {
  return useContext(pusherContext);
};

export const usePusherMessages = () => {
  const pusherClient = usePusher();
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    if (!pusherClient) return;

    console.log("usePusherMessages subscribe");
    const channel = pusherClient.subscribe("my-channel");
    channel.bind("my-event", (data: any) => {
      console.log("data", data);
      setMessages((current) => [...current, data]);
    });

    return () => {
      console.log("usePusherMessages unsubscribe");
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [pusherClient]);

  return messages;
};
