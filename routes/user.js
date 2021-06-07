const express=require("express")
const router=express.Router()
const user=require("../controllers/user")
router.get("/",user._get)
router.post("/",user._post)
router.patch("/",user._patch)
router.delete("/",user._delete)

module.exports=router