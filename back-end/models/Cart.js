import { Schema, model, Types } from "mongoose";

const CartSchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      product: { 
        type: Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: { 
        type: Number, 
        required: true 
      },
    },
  ],
});

export default model('Cart', CartSchema);
