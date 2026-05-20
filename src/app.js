const express = require("express");
const expenseRoutes = require("./routes/expense.route");
const authRoutes = require("./routes/auth.route")

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("API is running");
})

app.use("/api/expenses", expenseRoutes)

app.use("/api/auth",authRoutes);


module.exports = app;