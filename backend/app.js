const express = require("express");
const sequelize = require("./util/database");
const cors = require("cors");
const Expenses = require("./models/expenses");
const errorController = require('./controllers/error')

const app = express();
app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/user');

app.use("/user", userRoutes);

app.use(errorController.get404);

sequelize
  .sync()
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));
