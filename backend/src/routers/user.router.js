import { Router } from "express";
import auth from "../middleware/authMiddleware.js";
import jwt from "jsonwebtoken";
import handler from "express-async-handler";
import { UserModel } from "../model/user.model.js";
import { VerifModel } from "../model/verif.model.js";
import bcrypt from "bcryptjs";

const PASSWORD_HASH_SALT_ROUNDS = 10;
const router = Router();

router.post(
  "/login",
  handler(async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const clientType = req.headers["X-Client-Type"] === "app";

    if (user && (await bcrypt.compare(password, user.password))) {
      clientType
        ? res.send(generateTokenResponse(user, { isApp: clientType }))
        : res.send(generateTokenResponse(user));
      return;
    }
    res.status(400).send("Username Or Password Is Incorrect");
  })
);

router.post(
  "/authenticate",
  auth,
  handler(async (req, res) => {
    const { email } = req.body;
    if (req.user.email === email) {
      res.send({ success: true });
      return;
    }
    res.status(400).send({ success: false });
  })
);

router.get(
  "/verif/:apitoken",
  handler(async (req, res) => {
    const apitoken = req.params.apitoken;
    const MS_PER_MINUTE = 60000;
    const exprDate = new Date(Date.now() - 15 * MS_PER_MINUTE);
    if (!apitoken) res.status(400).send("Verification Failed");

    const verif = await VerifModel.findOne({
      token: apitoken,
      date: { $lt: exprDate },
    });

    if (verif?.token) {
      await UserModel.findByIdAndUpdate(verif.userId, { isVerif: true });
      await VerifModel.find({ token: apitoken }).remove();
      res.redirect(200, "https://fwrs2k-5173.csb.app/");
      res.send(200);
    } else {
      res.status(400).send(exprDate);
    }
  })
);

router.post(
  "/register",
  handler(async (req, res) => {
    const {
      firstName,
      lastName,
      name,
      email,
      password,
      address,
      mobileNumber,
    } = req.body;
    const user = await UserModel.findOne({ email });
    const clientType = req.headers["X-Client-Type"] === "app";

    if (user) {
      res.status(400).send("User already exists, please login!");
      return;
    }

    const hashedPass = await bcrypt.hash(password, PASSWORD_HASH_SALT_ROUNDS);
    const uName = name ? name : `${firstName} ${lastName}`;
    const newUser = {
      name: uName,
      email: email.toLowerCase(),
      password: hashedPass,
      address,
      phone: mobileNumber,
    };

    const result = await UserModel.create(newUser);
    res.send(
      clientType
        ? generateTokenResponse(result, { isApp: clientType })
        : generateTokenResponse(result)
    );
  })
);

router.put(
  "/updateProfile",
  auth,
  handler(async (req, res) => {
    const { name, address, email, mobileNumber: phone } = req.body;
    const clientType = req.headers["X-Client-Type"] === "app";
    try {
      const user = await UserModel.findByIdAndUpdate(
        req.user.id,
        { name, address, email, phone },
        { new: true }
      );
      res.send(
        clientType
          ? generateTokenResponse(user, { isApp: clientType })
          : generateTokenResponse(user)
      );
    } catch (error) {
      if (error.code === 11000) {
        if (error.keyValue.email)
          return res.status(409).send("Email already exists.");
        if (error.keyValue.phone)
          return res.status(409).send("Phone number already exists.");
      }
      res.status(500).send("Internal server error.");
    }
  })
);

router.put(
  "/changePassword",
  auth,
  handler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const user = await UserModel.findById(req.user.id);

    if (!user) {
      res.status(400).send("Change Password Failed!");
      return;
    }

    const equal = await bcrypt.compare(currentPassword, user.password);
    if (!equal) {
      res.status(400).send("Current Password is Not Correct");
      return;
    }

    user.password = await bcrypt.hash(newPassword, PASSWORD_HASH_SALT_ROUNDS);
    await user.save();

    res.send();
  })
);

const generateTokenResponse = (user, options = {}) => {
  const isApp = options.isApp || false;
  const expiresIn = isApp ? "1y" : "2d";
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    "HOLATSPLACEWEBTOKEN3784",
    {
      expiresIn,
    }
  );

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    address: user.address,
    phone: user.phone,
    isAdmin: user.isAdmin,
    isVerif: user.isVerif,
    token,
  };
};
export default router;
