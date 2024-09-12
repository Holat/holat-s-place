import { Schema, model } from "mongoose";

const VerifSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  tokenT: { type: Number, required: true },
  token: { type: String, required: true },
  expr: { type: Date, default: Date.now },
});

VerifSchema.index({ expr: 1 }, { expireAfterSeconds: 0 });

export const VerifModel = model("Verif", VerifSchema);
