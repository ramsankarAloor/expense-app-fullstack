const express = require('express');

const router = express.Router();
const userController = require('../controllers/expense');

router.get('/expenses', userController.getExpenses);

router.post('/new-expense', userController.postNewExpense);

router.delete('/expenses/:id', userController.deleteExpense);

router.put('/expenses/:id', userController.editExpense);

module.exports = router;