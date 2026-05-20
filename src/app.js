const express = require("express");
const expenseRoutes = require("./routes/expense.route");

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("API is running");
})

app.use("/api/v1/expenses", expenseRoutes)


module.exports = app;