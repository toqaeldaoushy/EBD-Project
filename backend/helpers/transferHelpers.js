import mongoose from "mongoose";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

export const transferMoney = async (senderId, receiverPhone, amount, description) => {
  
  // Start MongoDB Session and Transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find Sender and Receiver
    const sender = await User.findById(senderId).session(session);
    const receiver = await User.findOne({ phone: receiverPhone }).session(session);

    // Validation Checks
    if (!sender) {
      await session.abortTransaction();
      session.endSession();
      return { success: false, message: "Sender not found." };
    }
    
    if (!receiver) {
      await session.abortTransaction();
      session.endSession();
      return { success: false, message: "Receiver with this phone number not found." };
    }
    
    if (sender._id.equals(receiver._id)) {
      await session.abortTransaction();
      session.endSession();
      return { success: false, message: "oops! Cannot send money to yourself!" };
    }

    // Balance Validation
    if (sender.balance < amount) {
      await session.abortTransaction();
      session.endSession();
      return { success: false, message: "Insufficient balance." };
    }


    // Update Balances

    await User.findByIdAndUpdate(senderId, { $inc: { balance: -amount } }, { session });
    
    await User.findByIdAndUpdate(receiver._id, { $inc: { balance: amount } }, { session });


    
    // Sender's Record 
    const senderTransaction = new Transaction({
      senderId: sender._id,
      receiverId: receiver._id,
      amount,
      type: "send",
      description,
    });
    await senderTransaction.save({ session });

    // Receiver's Record
    const receiverTransaction = new Transaction({
      senderId: sender._id,
      receiverId: receiver._id,
      amount,
      type: "receive",
      description,
    });
    await receiverTransaction.save({ session });


    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return { success: true, message: "Transfer completed successfully." }; 
    
  } catch (error) {
    console.error("Transfer Error: ", error);

    // If any unexpected error occurs, abort the transaction
    await session.abortTransaction();
    session.endSession();
    return { success: false, message: "An unexpected error occurred during the transfer." };
  }
};
