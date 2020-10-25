const express=require('express');

const router=express.Router();

router.post('/create-session',require('../../../controllers/api/v1/users').createsessionbyjwt);


module.exports=router;
