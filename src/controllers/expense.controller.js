const Expense = require('../models/expense.model');

const createExpense = async (req,res)=>{
    try{
        const {title,amount,category,description} = req.body;

        const expense = await Expense.create({
            title,
            amount,
            category,
            description,
        });

        res.status(201).json({
            success: true,
            message: "Expense created",
            expense,
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

module.exports = {
    createExpense,
};