import { Schema, model } from "mongoose";

export const ErrorLogSchema = new Schema(
    {
        message: { type: String, required: true },
        stack: { type: String },
        route: { type: String, required: true },
        timestamp: { type: Date, default: Date.now }
    }
)

export const ErrorLogModel = model('ErrorLog', ErrorLogSchema);