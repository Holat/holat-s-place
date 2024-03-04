import jwt from "jsonwebtoken";
const { verify } = jwt;

export default (socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error("Authentication error"));

  try {
    const decoded = verify(token, process.env.JWT_TOKEN);
    socket.user = decoded;
    next();
  } catch (error) {
    return next(new Error("Authentication error"));
  }
};
