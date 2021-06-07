const express=require("express")
const router=express.Router()
const login=require("../controllers/login")
router.post("/admin",login.admin)
router.post("/user",login.user)

module.exports=router