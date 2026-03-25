import { Schema, model, Types } from "mongoose";

const ReviewSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: Types.ObjectId,
    ref: 'Product',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default model('Review', ReviewSchema);
