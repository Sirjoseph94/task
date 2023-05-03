import { Schema, model } from "mongoose";

const txRecord = new Schema({
  senderId: String,
  receiverId: Number,
  amount: Number,
  createdAt: { type: Date, default: () => Date.now() },
  updatedAt: Date,
});

const TxRecord = model("TxRecord", txRecord);
export default TxRecord;
