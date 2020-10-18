const express=require('express');
const router=express.Router();


const commentController=require('../controllers/comment_controller');

router.post('/create',commentController.create);
router.get('/delete',commentController.delete);
module.exports=router;