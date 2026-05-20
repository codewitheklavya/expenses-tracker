const express = require("express");
const {createExpense, getAllExpense} = require("../controllers/expense.controller")

const router = express.Router();

router.post("/",createExpense);

router.get("/",getAllExpense);  

module.exports = router;


