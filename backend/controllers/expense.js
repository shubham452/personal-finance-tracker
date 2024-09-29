const ExpenseSchema = require("../models/ExpenseModel");

exports.addExpense = async(req,res)=>{
    const {title, description, amount, category, date} = req.body;

    try {
        //validation
        if(!title || !description || !category || !date ||!amount)
        {
            return res.status(400).json({message:"All fields are required"})
        }
        if(amount<=0)
        {
            return res.status(400).json({message:"amount should be positive"})
        }
        const expense = new ExpenseSchema({
            title,
            amount,
            description,
            category, 
            date
        })

        await expense.save();
        return res.status(200).json({message:"Expense added"})
    } catch (error) {
        console.error("Error while adding income:", error);
        return res.status(500).json({message:"server Error"})
    }
} 

exports.getExpenses = async (req,res)=>{
    try {
        const expenses = await ExpenseSchema.find().sort({createdAt:-1})
        return res.status(200).json(expenses)
    } catch (error) {
        return res.status(500).json({message:"Server error"})
    }
}

exports.deleteExpense = async(req,res)=>{
    const {id} = req.params;
    try {
       const deletedexpense= await ExpenseSchema.findByIdAndDelete(id);
       if(!deletedexpense)
       {
        return res.status(404).json({message:"Expense not found"})
       }
        return res.status(200).json({message:"deletion successful"})
    } catch (error) {
        return res.status(500).json({message:"server error"})
    }
}