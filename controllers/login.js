const services=require("../services/index")
const controller={}
controller.admin=function(req,res,next){
	let {email,password}=req.body
	if(email=="admin" && password=="admin")
	{
		services.encode(0,"admin")
		.then(d=>res.json({status:true,data:d}))
		.catch(e=>res.json({status:false,data:"invalid credentaials"}))
	}
	else
	{	
		res.json({status:false,data:"invalid credentaials"})
	}
}
controller.user=function(req,res,next){
	let {email,password}=req.body
	let sql=`select * from users where email='${email}' and password='${password}'`
	services.sql(sql)
	.then(d=>d.length>0?Promise.resolve(d[0]):Promise.reject("invalid username password"))
	.then(d=>services.encode(d.id,"user"))
	.then(d=>res.json({status:true,data:d}))
	.catch(e=>res.json({status:false,data:"invalid credentaials"}))

}


module.exports=controller