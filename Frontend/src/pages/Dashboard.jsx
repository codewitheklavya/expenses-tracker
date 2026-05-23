import { useEffect, useState } from "react"
import API from "../services/api"
import { Navigate, useNavigate } from "react-router-dom";

function Dashboard(){

    const navigate = useNavigate();
    //states
    const [expenses, setExpenses] = useState([]);

    // form state
    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        category: "",
        description: "",
    });

    //functions
    const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    };

    //LogOut Function
    const handleLogout = ()=>{
        localStorage.removeItem("token");

        navigate("/login")
    }
  //fetch expenses
    const fetchExpenses = async ()=>{
        try{
            const token = localStorage.getItem("token");

            const response = await API.get("/expenses",{
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });
            setExpenses(response.data.expenses);
        }catch(err){
            console.log(err);
        }
    };

    //Create Expenses
    const createExpenses = async (e)=>{
        e.preventDefault();

        try{
            const token = localStorage.getItem("token");

            await API.post("/expenses",formData,{
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchExpenses();

            setFormData({
                title: "",
                amount: "",
                category: "",
                description: "",
            });
        }catch(err){
            console.log(err)
        }
    };

    //Delete Expenses
    const deleteExpenses = async(id)=>{
        try{
            const token = localStorage.getItem("token");

            await API.delete(`/expenses/${id}`,{
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });

            fetchExpenses();
        }catch(err){
            console.log(err);
        }
    };

    //useEffects
    useEffect(()=>{
        fetchExpenses();
    },[]);

    //return UI
    return (
        <div className="min-h-screen bg-gray-100 p-6">

    {/* Header */}
    <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
            Dashboard
        </h1>

        <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-5 py-2 rounded-lg cursor-pointer hover:bg-red-700 transition"
        >
            Logout
        </button>
    </div>

    {/* Main Layout */}
    <div className="flex flex-col lg:flex-row gap-8">

        {/* Left Side - Form */}
        <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-xl shadow-md sticky top-5">

                <h2 className="text-2xl font-semibold mb-5 text-gray-700">
                    Add Expense
                </h2>

                <form onSubmit={createExpenses} className="space-y-4">

                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                        type="number"
                        name="amount"
                        placeholder="Amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer w-full"
                    >
                        Add Expense
                    </button>
                </form>
            </div>
        </div>

        {/* Right Side - Expenses */}
        <div className="lg:w-2/3">

            <h2 className="text-2xl font-bold text-gray-700 mb-5">
                Your Expenses
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

                {expenses.map((expense) => {
                    return (
                        <div
                            key={expense._id}
                            className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition"
                        >
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">
                                {expense.title}
                            </h3>

                            <p className="text-gray-600 mb-1">
                                <span className="font-semibold">Amount:</span> ₹{expense.amount}
                            </p>

                            <p className="text-gray-600 mb-1">
                                <span className="font-semibold">Category:</span> {expense.category}
                            </p>

                            <p className="text-gray-600 mb-4">
                                <span className="font-semibold">Description:</span> {expense.description}
                            </p>

                            <button
                                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition cursor-pointer"
                                onClick={() => {
                                    deleteExpenses(expense._id);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    );
                })}

            </div>
        </div>

    </div>
</div>
    )
}

export default Dashboard        
