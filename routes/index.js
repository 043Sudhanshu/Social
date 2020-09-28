const express=require('express');
const router=express.Router();

const homeController=require('../controllers/home_controller');

router.get('/',homeController.home);
router.use('/users',require('./users'));

const loginController=require('../controllers/login');
const signupController=require('../controllers/signup');
router.get('/login',loginController.login);
router.get('/signup',signupController.signup);

module.exports=router;