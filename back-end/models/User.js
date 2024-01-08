// import dotenv from "dotenv";
import { Schema, model, Types } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Load environment variables from .env file
// dotenv.config();

// Assign the secret key with fallback value
export const secretKey = process.env.SALT || "DEFAULT_SECRET_KEY";

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
    enum: ['admin', 'shopper'], 
    default: 'shopper' 
  },
  address: String,  // Include address for shipping purposes
  phoneNumber: String,  // Include phone number for contact
  cart: [{ 
    type: Types.ObjectId, 
    ref: 'Cart' 
  }],  // Reference to the user's shopping cart
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

UserSchema.methods.createJWT = function () {
  return jwt.sign({ id: this._id, role: this.role }, secretKey, {
    expiresIn: "1w",
  });
};

export default model("User", UserSchema);
