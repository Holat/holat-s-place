import handler from "express-async-handler";
import { UserModel } from "../model/user.model.js";

const handleSocketConnection = handler(async (socket) => {
  try {
    const userId = socket.handshake.auth.userId;
    const user = await UserModel.findById(userId);

    if (user && user.isAdmin) {
      socket.join("admins");
      console.log(`Admin connected to room`);
    }
  } catch (error) {
    console.error(error);
  }

  socket.on("customerOrder", () => {
    socket.broadcast.to("admins").emit("orderReceived", "order was received");
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

export default handleSocketConnection;
