import { connect, set } from "mongoose";
import { FoodModel } from "../model/food.model.js";
import bcrypt from "bcryptjs";
import { sample_foods, sample_users } from "../data.js";
import { UserModel } from "../model/user.model.js";

const PASSWORD_HASH_SALT_ROUNDS = 10;
set("strictQuery", true);

export const dbconnect = async () => {
  try {
    connect("mongodb://127.0.0.1:27017/holatsPlace");
    await seedFoods();
    await seedUsers();
    console.log("connection successful");
  } catch (error) {
    console.log(error);
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
    food.imageUrl = `/foods/${food.imageUrl}`;
    await FoodModel.create(food);
  }

  console.log("Foods seed is Done!");
}
