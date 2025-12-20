import express from 'express';
import { getFullTransactions, 
        getTransactionsByTypeController,
         getTransactionsSorted } from '../controllers/historyController.js';

const router = express.Router();

router.get('/full/:userId', getFullTransactions);
router.get('/type/:userId/:type', getTransactionsByTypeController);
router.get('/sorted/:userId', getTransactionsSorted);

export default router;