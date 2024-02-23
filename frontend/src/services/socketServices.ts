import { io } from "socket.io-client";

type EventHandlers = {
  [event: string]: (...args: string[]) => void;
};

const createSocket = (userId: string | number | undefined) => {
  const socket = io("http://localhost:3001", {
    auth: { userId },
  });

  const eventHandlers: EventHandlers = {};

  const on = (event: string, handler: EventHandlers[string]) => {
    eventHandlers[event] = handler;
    socket.on(event, handler);
  };

  const off = (event: string) => {
    if (eventHandlers[event]) {
      socket.off(event, eventHandlers[event]);
      delete eventHandlers[event];
    }
  };

  const emit = (event: string, data: string) => {
    socket.emit(event, data);
  };

  return { socket, on, off, emit };
};

export default createSocket;
