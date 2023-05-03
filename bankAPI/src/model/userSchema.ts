import generateBankAccountNumber from "../utils/generateAccountNumber";
import mongoose from "mongoose";
const { Schema, SchemaTypes } = mongoose;

const userSchema = new Schema(
  {
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      otherName: { type: String, required: false },
    },
    phone: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    BVN: { type: Number, required: true, unique:true },
    accountBalance: { type: Number, default: 0 },
    createdAt: { type: Date, default: () => Date.now(), immutable: true },
    updatedAt: Date,
  },
);
const User = mongoose.model("User", userSchema);

export default User;
