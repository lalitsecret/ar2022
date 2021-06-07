const express=require("express")
const admin=require("../controllers/admin")
const router=express.Router()

router.get("/",admin._get)
router.post("/",admin._post)
router.patch("/:id",admin._patch)
router.delete("/:id",admin._delete)

module.exports=router