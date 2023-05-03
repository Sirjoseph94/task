import User from "../model/userSchema";
import throwError from "../utils/throwError";
import { recordTx } from "./recordTx";

export const transfer = async (
  amount: number,
  accountNumber: string,
  userId: string
) => {
  const sender = await User.findById(userId).exec();

  if (!sender) {
    throw throwError(404, "User not found, create an account");
  }
  
  if (sender.accountBalance < amount) {
    throw throwError(403, "insufficient funds");
  }
  sender.accountBalance = sender.accountBalance - amount;
  await sender.save();
  const receiver = await User.findOne({ phone: accountNumber }).exec();
  if (!receiver) {
    throw throwError(404, "Account not available");
  }
  receiver.accountBalance = receiver.accountBalance + amount;
  await receiver.save();
  console.log(sender);

  //record transaction
  // const record = recordTx(String(sender._id), String(receiver._id), amount);

  return { statusCode: 200, message: sender };
};
