import { io } from "socket.io-client";

const connectSocket = (token: string | undefined) => {
  const socket = io("http://localhost:5000", {
    auth: {
      token,
    },
  });

  return socket;
};

export default connectSocket;
