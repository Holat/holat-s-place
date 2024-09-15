// import { Server } from "socket.io";
// import socketMiddleware from "../middleware/socketMiddleware.js";

// export default function socketInit(httpServer) {
//   const io = new Server(httpServer, {
//     cors: {
//       credentials: true,
//       origin: ["http://localhost:5173"],
//     },
//   });

//   io.use(socketMiddleware);
//   io.on("connection", (socket) => {
//     const isAdmin = socket.user.isAdmin;

//     if (isAdmin) {
//       socket.join("adminRoom");
//       socket.emit("adminEvent", "Welcome Admin");
//     }

//     socket.on("click", () => {
//       io.to("adminRoom").emit("orderUpdate", "updated");
//     });
//   });
// }
