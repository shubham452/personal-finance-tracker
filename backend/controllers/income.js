const IncomeSchema = require("../models/incomeModel");

exports.addIncome = async(req,res)=>{
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
        const income = new IncomeSchema({
            title,
            amount,
            description,
            category, 
            date
        })

        await income.save();
        return res.status(200).json({message:"Income added"})
    } catch (error) {
        console.error("Error while adding income:", error);
        return res.status(500).json({message:"server Error"})
    }
} 

exports.getIncomes = async (req,res)=>{
    try {
        const incomes = await IncomeSchema.find().sort({createdAt:-1})
        return res.status(200).json(incomes)
    } catch (error) {
        return res.status(500).json({message:"Server error"})
    }
}

exports.deleteIncome = async(req,res)=>{
    const {id} = req.params;
    try {
       const deletedIncome= await IncomeSchema.findByIdAndDelete(id);
       if(!deletedIncome)
       {
        return res.status(404).json({message:"income not found"})
       }
        return res.status(200).json({message:"deletion successful"})
    } catch (error) {
        return res.status(500).json({message:"server error"})
    }
}