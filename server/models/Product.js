import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    default: '',
  },
  stockQuantity: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    default: 'General'
  },
  vendor: {
    type: String,
    default: 'Dept. of Agriculture'
  }
}, { timestamps: true });

export default model("Product", ProductSchema);
