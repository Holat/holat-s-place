import jwt from "jsonwebtoken";

const { verify } = jwt;
export default (req, res, next) => {
  const token = req.headers.access_token;
  if (!token) return res.status(401).send();

  try {
    const decoded = verify(token, process.env.JWT_TOKEN);
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
