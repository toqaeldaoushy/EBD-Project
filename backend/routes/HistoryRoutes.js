import express from 'express';
import { getFullTransactionDetails, 
    getTransactionsByType, 
    getTransactionSortedByDate } 
from '../helpers/TransactionHelper.js';
import mongoose from 'mongoose';



const router = express.Router();

router.get('/full/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const transactions = await getFullTransactionDetails(userId);
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }   
});

router.get('/type/:userId/:type', async (req, res) => {
    const { userId, type } = req.params;

    try {
        const transactions = await getTransactionsByType(userId, type);
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }   
});


router.get('/sorted/:userId', async (req, res) => {
    const { userId } = req.params;
    const sortOrder = req.query.order || "desc";

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid userId format' });
    }

    try {
        const transactions = await getTransactionSortedByDate(userId, sortOrder);
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: `Failed to get sorted transactions: ${error.message}` });
    }
});

export default router;