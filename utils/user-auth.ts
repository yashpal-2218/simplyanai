"use server";

import User from "@/database/model/User";
//@ts-ignore
import bcrypt from "bcryptjs";
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET_KEY;

export async function createToken(user: { _id: string; name: string }) {
  return jwt.sign(user, secret);
}

export async function verifyToken(token: string) {
  return jwt.verify(token, secret);
}

export async function getUser(data: Object) {
  return await User.findOne(
    data,
    { name: 1, email: 1 } // Only include `name` and `email`, exclude everything else
  );
}

export async function createPasswordHash(password: string) {
  // Generate a salt (with a cost factor of 10)
  const salt = await bcrypt.genSalt(10);

  // Hash the password with the salt
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}
