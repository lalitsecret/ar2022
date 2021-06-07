const services=require("../services/index")

const ob={}
ob._get=function(req,res,next){
	let id=req.id
	let sql=`select * from users where id='${id}'`
	services.sql(sql)
	.then(d=>res.json({status:true,data:d}))
	.catch(e=>res.json({status:false,data:e}))

}
ob._post=function(req,res,next){
	let id=req.id
	let phone=req.body.phone
	let sql=`update users set phone='${phone}' where id='${id}'`
	services.sql(sql)
	.then(d=>res.json({status:true,data:d}))
	.catch(e=>res.json({status:false,data:e}))
}
ob._patch=function(req,res,next){
	let id=req.id
	let {country,city,state,pincode,address}=req.body
	let sql=`update users set 
		country='${country}',
		city='${city}',
		state='${state}',
		pincode='${pincode}',
		address='${address}'
		where
		id='${id}'
	`
	services.sql(sql)
	.then(d=>res.json({status:true,data:d}))
	.catch(e=>res.json({status:false,data:e}))	
}
ob._delete=function(req,res,next){
	let id=req.id
	res.json({status:true,data:"not allowed but for demo response is true"})
}


module.exports=ob