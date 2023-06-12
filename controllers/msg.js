const Message=require('../models/msg');
const {Op}=require('sequelize');
const Group=require('../models/group');


exports.postMsg= async(req,res,next)=>{
    const groupId=req.params.groupId;
    try {
       const group=await Group.findByPk(groupId);
     const message=await group.createMessage({
        message:req.body.msg,
        sender:req.body.name,
       });

       res.status(200).send(message);
    } catch (error) {
        console.log(err);
      res.status(500).send(err);
    }
  
}


exports.getMsg=async(req,res,next)=>{
    const lastMsg=+req.query.lastMsg;
    try {
        const msgs= await Message.findAll({
            where:{
                id:{
                    [Op.gt]:lastMsg
                },
            },
        });
        res.status(200).send({msgs:msgs,user:req.user.name});
    } catch (error) {
        console.log(err);
        res.status(500).send(err);
    }
 

}