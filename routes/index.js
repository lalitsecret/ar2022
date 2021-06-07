const express=require("express")
const router=express.Router()
router.get("/",(req,res) =>{
	res.json(req.query)
})
router.post("/",(req,res) =>{
	res.json(req.body)
})
router.patch("/:id",(req,res) =>{
	res.json({...req.body,...req.params})
	// {id:1,password:"lalit@123"}
})
router.delete("/:id",(req,res) =>{
	res.json(req.params)
})

module.exports=router