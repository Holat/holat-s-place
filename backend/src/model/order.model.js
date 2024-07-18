import { Schema, model } from "mongoose";

export const FoodSubSchema = new Schema(
  {
    id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stars: { type: Number, default: 1 },
    imageUrl: { type: String, required: true },
  },
  { _id: false }
);

export const OrderItemSchema = new Schema(
  {
    food: { type: FoodSubSchema.schema, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

OrderItemSchema.pre("validate", function (next) {
  this.price = this.food.price * this.quantity;
  next();
});

const OrderSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    lat: { type: String, required: true },
    lng: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    totalCount: { type: Number, required: true },
    paymentId: { type: String || Number },
    items: { type: [OrderItemSchema], required: true },
    status: { type: String, default: "NEW" },
    user: { type: Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

export const OrderModel = model("order", OrderSchema);
