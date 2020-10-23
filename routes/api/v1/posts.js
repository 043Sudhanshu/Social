const express=require('express');

const router=express.Router();

const postsapicontrollerv1=require('../../../controllers/api/v1/posts');

router.get('/',postsapicontrollerv1.dislayposts);

router.get('/delete',postsapicontrollerv1.deletepost);

module.exports=router;
