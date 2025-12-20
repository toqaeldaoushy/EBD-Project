import { 
  getFullTransactionDetails, 
  getTransactionsByType, 
  getTransactionSortedByDate 
} from '../helpers/TransactionHelper.js';
import mongoose from 'mongoose';

// GET FULL TRANSACTIONS
export const getFullTransactions = async (req, res) => {
  const { userId } = req.params;

  try {
    const transactions = await getFullTransactionDetails(userId);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// GET TRANSACTIONS BY TYPE
export const getTransactionsByTypeController = async (req, res) => {
  const { userId, type } = req.params;

  try {
    const transactions = await getTransactionsByType(userId, type);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// GET TRANSACTIONS SORTED BY DATE
export const getTransactionsSorted = async (req, res) => {
  const { userId } = req.params;
  const sortOrder = req.query.order || "desc";

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid userId format' });
  }

  try {
    const transactions = await getTransactionSortedByDate(userId, sortOrder);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};