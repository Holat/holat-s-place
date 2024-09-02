import { connect, set } from "mongoose";
import { FoodModel } from "../model/food.model.js";
import bcrypt from "bcryptjs";
import { sample_foods, sample_users } from "../data.js";
import { UserModel } from "../model/user.model.js";
import dotenv from "dotenv";

const PASSWORD_HASH_SALT_ROUNDS = 10;
set("strictQuery", true);

//: process.env.MONGO_URI;
dotenv.config();
export const dbconnect = async () => {
  const uri =
    process.env.NODE_ENV === "dev"
      ? "mongodb://127.0.0.1:27017/holatsPlace"
      : "mongodb+srv://Holat:mMDAPFzfEV5eoVzn@cluster1.x5ks8va.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";
  try {
    connect(uri);
    await seedFoods();
    await seedUsers();
    console.log("db connected");
  } catch (error) {
    console.log("Error connecting to the database", error);
  }
};

async function seedUsers() {
  const userCount = await UserModel.countDocuments();
  if (userCount > 0) {
    console.log("Users already seeded");
    return;
  }

  for (let user of sample_users) {
    user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
    await UserModel.create(user);
  }

  console.log("Users seed is Done!");
}

async function seedFoods() {
  const foods = await FoodModel.countDocuments();
  if (foods > 0) {
    console.log("Foods seed is already done");
    return;
  }

  for (const food of sample_foods) {
    food.imageUrl = `${food.imageUrl}`;
    await FoodModel.create(food);
  }

  console.log("Foods seed is Done!");
}
