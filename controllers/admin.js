const services=require("../services/index")

const ob={}

ob._get=function(req,res,next){
	services.sql(`select * from users`)
	.then(d=>res.json({status:true,data:d}))
	.catch(e=>res.json({status:false,data:e}))

}
ob._post=function(req,res,next){
	let {name,email,phone,password,country,city,state,pincode,address}=req.body
	let sql1=`select * from users where email='${email}'`
	let sql2=`insert into users(name,email,phone,password,country,city,state,pincode,address)values('${name}','${email}','${phone}','${password}','${country}','${city}','${state}','${pincode}','${address}')`

	services.sql(sql1)
	.then(d=>d.length==0?Promise.resolve(""):Promise.reject("user already exists"))
	.then(d=>services.sql(sql2))
	.then(d=>res.json({status:true,data:d}))
	.catch(e=>res.json({status:false,data:e}))
}
ob._patch=function(req,res,next){
	let {id}=req.params
	let {name,email,phone,password,country,city,state,pincode,address}=req.body
	let sql=`update users set
		name='${name}',
		email='${email}',
		phone='${phone}',
		password='${password}',
		country='${country}',
		city='${city}',
		state='${state}',
		pincode='${pincode}',
		address='${address}'
		where id=${id}
	`
	services.sql(sql)
	.then(d=>res.json({status:true,data:d}))
	.catch(e=>res.json({status:false,data:e}))	

}
ob._delete=function(req,res,next){
	let {id}=req.params
	let sql=`delete from users where id='${id}'`
	services.sql(sql)
	.then(d=>res.json({status:true,data:d}))
	.catch(e=>res.json({status:false,data:e}))
}

module.exports=ob