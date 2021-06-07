const express=require("express")
const router=express.Router()
const signup=require("../controllers/signup")
router.post("/user",signup.user)

module.exports=router