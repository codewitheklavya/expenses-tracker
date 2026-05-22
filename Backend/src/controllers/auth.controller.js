const user = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signupUser = async (req,res)=>{
    try{
        const {name,email,password} = req.body;

        //check existing user
        const existingUser = await user.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password,10);

        //create user
        const newUser = await user.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            newUser, //this is short form of user:newUser
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const loginUser = async (req,res)=>{
    try{
        const {email,password} = req.body;

        //check user exists
        const User = await user.findOne({email});

        if(!User){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        console.log("hello")

       
        //compare password
        const isMatch = await bcrypt.compare(password,User.password);
        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        //create token
        const token = jwt.sign(
            {
                id: User._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        )

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

module.exports = {
    signupUser,
    loginUser
}