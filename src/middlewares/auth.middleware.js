const jwt = require("jsonwebtoken");

const protect = async(req,res,next)=>{
    try{
        const authHeader = req.headers.authorization;

        //check token exists
        if(!authHeader || !authHeader.startsWith("Bearer")){
            return res.status(401).json({
                success: false,
                message: "Not Authorized"
            });
        }

        //get token
        const token = authHeader.split(" ")[1];

        //verify token
        const decode = jwt.verify(token,process.env.JWT_SECRET);

        //attach user info 
        req.user = decode;

        next();
    }catch(err){
        res.status(401).json({
            success: false,
            message: err.message,
        });
    }
};

module.exports = protect;