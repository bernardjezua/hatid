// import dotenv from "dotenv";
import { Schema, model, Types } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Load environment variables from .env file
// dotenv.config();

const UserSchema = new Schema({
  firstName: { 
    type: String, 
    required: true 
  },
  lastName: { 
    type: String,
    required: true 
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { 
    type: String,
    required: true 
  },
  role: { 
    type: String, 
    enum: ['admin', 'customer'], 
    default: 'customer' 
  },
  avatar: {
    type: String,
    default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
  },
  address: String,  // Include address for shipping purposes
  phoneNumber: String,  // Include phone number for contact
  walletBalance: { 
    type: Number, 
    default: 5000 
  },
  cart: [{ 
    product: { type: Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 }
  }],  // Inline cart for real-time synchronization
  orders: [{ 
    type: Types.ObjectId, 
    ref: 'Order' 
  }],  // Reference to the user's orders
});

UserSchema.pre("save", async function () {
  // Hash password during creation
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.correctPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.createJWT = function (secret) {
  return jwt.sign({ id: this._id, role: this.role }, secret, {
    expiresIn: "1w",
  });
};

export default model("User", UserSchema);
