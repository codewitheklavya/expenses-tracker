const express = require("express");
const {createExpense, getAllExpense, getSingleExpense, updateExpense, deleteExpense} = require("../controllers/expense.controller")
const protect = require("../middlewares/auth.middleware")

const router = express.Router();

router.post("/",protect,createExpense);

router.get("/",getAllExpense);  

router.get("/:id",getSingleExpense)

router.put("/:id",protect,updateExpense)

router.delete("/:id",protect,deleteExpense)

module.exports = router;


