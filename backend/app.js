const express = require("express");
const sequelize = require("./util/database");
const cors = require("cors");
const Expenses = require("./models/expenses");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/expenses", async (req, res) => {
  const expenses = await Expenses.findAll();
  res.json(expenses);
});

app.post("/new-expense", async (req, res) => {
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
});

app.delete("/expenses/:id", async (req, res)=>{
    const expenseId = req.params.id;
    const expense = await Expenses.findByPk(expenseId);
    const result = await expense.destroy();
    res.json(result);
})

app.use("/", (req, res) => {
  res.status(404).send("<h2>Page Not Found!!</h2>");
});

sequelize
  .sync()
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));
