const express=require('express');
const router=express.Router();

const userController=require('../controllers/users_controller');

router.get('/profile',userController.profile);

router.post('/create',userController.create);

module.exports=router;