import { Router } from "express";
import auth from "../middleware/authMiddleware.js";
import jwt from "jsonwebtoken";
import handler from "express-async-handler";
import { UserModel } from "../model/user.model.js";
import bcrypt from "bcryptjs";

const PASSWORD_HASH_SALT_ROUNDS = 10;
const router = Router();

router.post(
  "/login",
  handler(async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const clientType = req.headers['X-Client-Type'] === 'app';
    
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
    const user = await UserModel.findOne({ email });

    if (user) {
      res.send({ success: true });
      return;
    }
    res.status(400).send({ success: false });
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
    const clientType = req.headers['X-Client-Type'] === 'app';

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
    res.send(clientType ? 
             generateTokenResponse(result, {isApp: clientType}) : 
             generateTokenResponse(result));
  })
);

router.put(
  "/updateProfile",
  auth,
  handler(async (req, res) => {
    const { name, address, email, mobileNumber: phone } = req.body;
    const clientType = req.headers['X-Client-Type'] === 'app';
    try {
      const user = await UserModel.findByIdAndUpdate(
        req.user.id,
        { name, address, email, phone },
        { new: true }
      );
      res.send(clientType ? 
             generateTokenResponse(result, {isApp: clientType}) : 
             generateTokenResponse(result));
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
    token,
  };
};
export default router;
