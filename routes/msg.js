const express=require('express');
const msgController=require('../controllers/msg');
const middlewareController=require('../middlewares/auth');

const router=express.Router();

router.post('/send/:groupId',middlewareController.authenticate,msgController.postMsg);
router.get('/get',middlewareController.authenticate,msgController.getMsg);


module.exports=router;