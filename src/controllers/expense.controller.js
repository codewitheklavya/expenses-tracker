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

const getAllExpense = async (req,res)=>{
    try{
        const expenses = await Expense.find();

        res.status(200).json({
            success: true,
            count: expenses.length,
            expenses,
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getSingleExpense = async (req,res)=>{
    try{
        const expense = await Expense.findById(req.params.id);

        if(!expense){
            return res.status(404).json({
                success: false,
                message: "Expenses not found"
            });
        }

        res.status(200).json({
            success: true,
            expense,
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateExpense = async (req,res)=>{
    try{
        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
        {
            new: true,
        }
        );
        
        if(!updatedExpense){
            return res.status(404).json({
                success: false,
                mesage: "Expense not found",
            });    
        }

        res.status(200).json({
            success: false,
            updatedExpense,
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteExpense = async (req,res)=>{
    try{
        const deletedExpense = await Expense.findByIdAndDelete(req.params.id);

        if(!deletedExpense){
            return res.status(404).json({
                success: false,
                message: "Expense not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Expense Deleted",
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

module.exports = {
    createExpense,
    getAllExpense,
    getSingleExpense,
    updateExpense,
    deleteExpense,
};