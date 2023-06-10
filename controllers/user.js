const User=require('../models/user');
const bcrypt=require('bcrypt');
const {Op}=require('sequelize');


function isNotValid(str){
    if(str.length==0 || str==undefined){
        return true;
    }
    return false;
}

exports.signUp= async (req,res,next)=>{
          const {name,email,mobilenumber,password} =req.body;

          if(isNotValid(name) || isNotValid(email) || isNotValid(mobilenumber) || isNotValid(password)){
            return res.status(400).send({type:'error',message:'Invalid form data!'});
          }
          try {

            const users=await User.findAll({
                where:{
              [ Op.or]:[ {email:email,},{mobilenumber:mobilenumber}]
                }
          })
            
          } catch (error) {
            console.log(error);
            if(error.type=='error'){
                res.status(404).send(error);
            }
            else{
                res.status(500).send(error); 
            }
          }
}

