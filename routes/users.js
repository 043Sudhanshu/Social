const express=require('express');
const router=express.Router();

const userController=require('../controllers/users_controller');
const passport=require('passport');

router.get('/profile',passport.checkAuthentication,userController.profile);
router.get('/signup',userController.signup);
router.get('/login',userController.login);
router.get('/logout',userController.logout);
router.post('/update',userController.update);

//passport local routes
router.post('/create',userController.create);
router.post('/create-session',passport.authenticate('local', {failureRedirect:'/users/login'} 
),userController.createSession);

// passport oauth2 routes
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));  // req sent to google
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'users/login'}),userController.createSession);


module.exports=router;