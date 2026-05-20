require("dotenv").config();
const app = require('./src/app')
const connectDB = require('./src/config/db.js')

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`port is running on ${PORT}`);
})