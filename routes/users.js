const express=require('express');
const router=express.Router();

const userController=require('../controllers/users_controller');
const passport=require('passport');

router.get('/profile',userController.profile);
router.get('/signup',userController.signup);
router.get('/login',userController.login);


router.post('/create',userController.create);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/login'}
),userController.createSession);

module.exports=router;