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
        <div>
            
            <h1>Daskboard</h1>

            <button onClick={handleLogout} className="bg-red-500 px-2 py-1 ml-200 cursor-pointer hover:bg-red-800">Logout</button>
            {/* FORM */}
            <form onSubmit={createExpenses}>

                <input type="text" name="title" placeholder="title" value={formData.title} onChange={handleChange} />
                <br /><br />
                <input type="Number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} />
                <br /><br />
                <input type="text" name="category" placeholder="category" value={formData.category} onChange={handleChange} />
                <br /><br />
                <input type="text" name="description" placeholder="description" value={formData.description} onChange={handleChange} />
                <button type="submit">Add Expenses</button>
            </form>
            {/**Expenses List */}
            {expenses.map((expense) => {
            return (
                <div key={expense._id}>
                <h3>{expense.title}</h3>
                <p>Amount: {expense.amount}</p>
                <p>Category: {expense.category}</p>
                <p>Description: {expense.description}</p>
                <button className="bg-red-600 py-1 px-2 ml-0.5 cursor-pointer" onClick={()=>{deleteExpenses(expense._id)}}>Delete</button>
                <hr />
            </div>
        );
    })}
        </div>
    )
}

export default Dashboard        
