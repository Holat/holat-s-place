import jwt from "jsonwebtoken";

const { verify } = jwt;
export default (req, res, next) => {
  const token = req.headers["access_token"] || req.headers["authorization"];
  if (!token) return res.status(401).send("Token required");

  try {
    const decoded = verify(token, "HOLATSPLACEWEBTOKEN3784");
    req.user = decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).send("Token expired");
    } else {
      return res.status(401).send("Invalid token");
    }
  }

  return next();
};
