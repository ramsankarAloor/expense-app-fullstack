const Expenses = require("../models/expenses");

exports.getExpenses = async (req, res) => {
  const expenses = await Expenses.findAll();
  res.json(expenses);
};

exports.postNewExpense = async (req, res) => {
  try {
    if (!req.body.amount) {
      throw new Error("Amount field is mandatory..!");
    }
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;

    const newEntry = await Expenses.create({
      amount: amount,
      description: description,
      category: category,
    });

    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.deleteExpense = async (req, res) => {
    const expenseId = req.params.id;
    const expense = await Expenses.findByPk(expenseId);
    const result = await expense.destroy();
    res.json(result);
}

