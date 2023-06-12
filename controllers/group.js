const Group=require('../models/group');

const User=require('../models/user');

exports.postGroup=async(req,res,next)=>{
const groupName=req.body.group;
try {
    const group=await Group.create({name:groupName});
  const result= await req.user.addGroup(group,{through:{admin:true}});
  res.status(200).send({
    type:'success',
    message:`Group ${groupName} is created.`,
    groupId:result[0].groupId,
  })
} catch (error) {
    console.log(err);
      res.status(500).send(err);
}


}

exports.getGroup= async(req,res,next)=>{
    let allUsers, group;
    try {
      const groupId=req.params.groupId;
      group=await  Group.findByPk(groupId);
      allUsers= await group.getUsers();
     const  msgs= await group.getMessages();
     res.status(200).send({msgs:msgs,users:allUsers,user:req.user.name})
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  

}

exports.getAllGroup= async(req,res,next)=>{
    try {
      const groups=req.user.getGroups();
      res.status(200).send(groups);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
}

exports.addUser= async(req,res,next)=>{
  const groupId=req.params.groupId;
  const userEmail=req.body.userEmail;
  let userExist;
  try {
  const user=await  User.findOne({where:{email:userEmail}})
  if(!user){
    throw { type: "error", message: "User Not Found!" };
  }
  else{
    userExist=user;
    const group= await Group.findByPk(groupId);
    await group.addUser(userExist);
    res.status(200).send({
      type:'success',
      message:`User ${userExist.name} is added`,
      user:userExist.name
    });
  }
  } catch (error) { 
    if (error.type === "error") {
      res.status(404).send(error);
    } else {
      console.log(error);
      res.status(500).send(error);
    }
  }
}