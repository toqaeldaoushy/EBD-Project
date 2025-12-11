import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import mongoose from "mongoose";


const loadUsersMap = async (transactions) => {
    const userIds = new Set();

    transactions.forEach(tx => {
        if (tx.senderId) userIds.add(tx.senderId.toString());
        if (tx.receiverId) userIds.add(tx.receiverId.toString());
    });

    const users = await User.find({ 
        _id: { $in: [...userIds] } 
    }).select("fullName").lean();
    
    const usersMap = {};
    users.forEach(user => {
        usersMap[user._id.toString()] = user;
    });
    
    return usersMap;
};

const formatTransaction =  (tx, usersMap) => {
    const senderId = tx.senderId ? tx.senderId.toString() : null;
    const receiverId = tx.receiverId ? tx.receiverId.toString() : null;

    const sender = (senderId && usersMap[senderId]) || { fullName: "Unknown Sender" };
    const receiver = (receiverId && usersMap[receiverId]) || { fullName: "Unknown Receiver" };

    return {
        id: tx._id.toString(),

        senderId,
        senderName: sender.fullName,

        receiverId,
        receiverName: receiver.fullName,

        amount: tx.amount,
        type: tx.type,
        description: tx.description || "",
        date: tx.date,
        createdAt: tx.createdAt,
        updatedAt: tx.updatedAt,
    };
};

export const getFullTransactionDetails = async (userId) => {
    try { 
        const transactions = await Transaction.find({
            $or: [{ senderId: userId }, { receiverId: userId }],
        }).sort({ date: -1 });
        
        const userMap = await loadUsersMap(transactions);
        return await Promise.all(
            transactions.map(tx => formatTransaction(tx, userMap))
        );
    
    } catch (error) {
        console.error("Error fetching full transaction details:", error);
        throw new Error("Could not fetch full transaction details");    
        }
};

export const getTransactionsByType = async (userId, type) => {
    if (!["send","receive"].includes(type)) { 
        throw new Error("Invalid transaction type");
    }
    
    try {
        const filter = type === "send" 
        ? { senderId: userId } 
        : { receiverId: userId };
        
        const transactions = await Transaction.find(filter);
        const userMap = await loadUsersMap(transactions);
        
        return await Promise.all(
            transactions.map(tx => formatTransaction(tx, userMap))
        );
    
    } catch (error) {
        console.error("Error fetching transactions by type:", error);
        throw new Error("Could not fetch transactions by type");
    
    }
};

export const getTransactionSortedByDate = async (userId, sortOrder = "desc") => {
    try {
        // Validate userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error("Invalid userId format. Must be a 24-character hex string.");
        }

        // Validate sort order
        if (!["asc", "desc"].includes(sortOrder)) {
            throw new Error("Invalid sort order. Must be 'asc' or 'desc'.");
        }

        // Convert userId to ObjectId
        const objectId = new mongoose.Types.ObjectId(userId);

        // Fetch transactions
        const transactions = await Transaction.find({
            $or: [{ senderId: objectId }, { receiverId: objectId }],
        }).sort({ date: sortOrder === "asc" ? 1 : -1 });

        // Load users map
        const userMap = await loadUsersMap(transactions);

        // Format transactions
        return await Promise.all(
            transactions.map(tx => formatTransaction(tx, userMap))
        );

    } catch (error) {
        // Return clear error for the frontend
        throw new Error(`Failed to get sorted transactions: ${error.message}`);
    }
};


