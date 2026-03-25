import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../server/models/User.js';

dotenv.config();

console.log("--- START DIAGNOSTIC ---");
console.log("SECRET_KEY:", process.env.SECRET_KEY || "NOT SET");

async function runTest() {
  try {
    // 1. Test Bcrypt
    const hash = await bcrypt.hash("test", 10);
    console.log("Bcrypt Hash Test: SUCCESS");

    // 2. Test JWT Sign
    const token = jwt.sign({ id: '123' }, 'test_secret');
    console.log("JWT Sign Test: SUCCESS");

    // 3. Test User Model (Mocking)
    const mockUser = new User({
        firstName: "Test",
        lastName: "User",
        email: "test@test.com",
        password: "hashed_password"
    });
    console.log("User Model Instantiation: SUCCESS");

    const userToken = mockUser.createJWT();
    console.log("User.createJWT(): SUCCESS");
    console.log("Generated Token:", userToken.substring(0, 20) + "...");

    console.log("--- ALL TESTS PASSED ---");
    process.exit(0);
  } catch (err) {
    console.error("--- TEST FAILED ---");
    console.error(err);
    process.exit(1);
  }
}

runTest();
