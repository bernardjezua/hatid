import { Schema, model, Types } from "mongoose";

const OrderSchema = new Schema({
  user: { 
    type: Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
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
  totalAmount: { 
    type: Number, 
    required: true 
  },
  orderDate: { 
    type: Date, 
    default: Date.now 
  },
  isShipped: { 
    type: Boolean, 
    default: false 
  },
});

export default model('Order', OrderSchema);
