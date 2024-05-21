const express=require('express');
const User=require('../model/user')


const router=express.Router();

router.post('/',async(req,res)=>{
    try {
        const user=await User.create(req.body);
        res.status(200).json({
            status:'Success',
            user
        })
    } catch (error) {
        res.status(200).json({
            status:'Failed',
            error
        })
    }
})
//find or read
router.get('/',async(req,res)=>{
    try {
        const user=await User.find(req.body);
        res.status(200).json({
            status:'Success',
            user
        })
    } catch (error) {
        res.status(200).json({
            status:'Failed',
            error
        })
    }
})



//update


router.put('/',async(req,res)=>{
    const {name}=req.query;
    console.log(name);
    try {
        const user=await User.updateOne({name:name},req.body)
        res.status(200).json({
            status:'Success',
            user
        })
    } catch (error) {
        res.status(200).json({
            status:'Failed',
            error
        })
    }
})
// delete 
router.delete('/',async(req,res)=>{
    const {name}=req.query;
    console.log(name);
    try {
        const user=await User.deleteOne({name:name})
        res.status(200).json({
            status:'Success',
            user
        })
    } catch (error) {
        res.status(200).json({
            status:'Failed',
            error
        })
    }
})
module.exports=router;