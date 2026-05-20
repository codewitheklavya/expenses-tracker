const express = require("express");
const {createExpense, getAllExpense, getSingleExpense, updateExpense, deleteExpense} = require("../controllers/expense.controller")

const router = express.Router();

router.post("/",createExpense);

router.get("/",getAllExpense);  

router.get("/:id",getSingleExpense)

router.put("/:id",updateExpense)

router.delete("/:id",deleteExpense)

module.exports = router;


