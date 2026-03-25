import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  icon: String,
  description: String,
  productCount: {
    type: Number,
    default: 0
  }
});

export default model('Category', CategorySchema);
