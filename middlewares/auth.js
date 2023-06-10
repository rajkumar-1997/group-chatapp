const jwt=require('jwt');
const User=require('../models/user');

require('dotenv').config();

exports.authenticate=async(req,res,next)=>{
    const token=req.headers("Authorization");
    try {
        const {userId}=jwt.verify(token,process.env.JWT_SECRET_KEY);
        User.findByPk(userId).then((user)=>{
            req.user=user;
            next();
        })
    } catch (error) {
        res.status(401).send({ type: "error", message: "Authorized Failed!" });
    }

}