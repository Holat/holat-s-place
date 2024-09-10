import { Schema, model } from "mongoose";

const VerifSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true }
  token: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export const VerifModel = model("Verif", VerifSchema);
