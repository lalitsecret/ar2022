const services=require("../services/index")
const controller={}
controller.user=function(req,res,next){
	let {name,email,password,phone}=req.body
	let sql1=`select * from users where email='${email}'`
	let sql2=`insert into users(name,email,phone,password)values('${name}','${email}','${phone}','${password}')`
	services.sql(sql1)
	.then(d=>d.length==0?services.sql(sql2):Promise.reject("email already registered"))
	.then(d=>res.json({status:true,data:"signup sucecss"}))
	.catch(e=>res.json({status:false,data:e}))

}


module.exports=controller