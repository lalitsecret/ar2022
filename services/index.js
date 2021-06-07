require("dotenv").config()

const mysql=require("mysql")
const con=mysql.createConnection({
	host:process.env.host,
	user:process.env.user,
	password:process.env.password,
	database:process.env.database,
	multitpleStatements:true
})

const jwt=require("jsonwebtoken")
const secret=process.env.secret
const ob={}

ob.sql=function(statement){
	return new Promise((resolve,reject) =>{
		con.query(statement,(err,data) =>{
			if(err){
				reject(err)
			}
			else
			{
				resolve(data)
			}
		})
		
	})
}
ob.encode=function(id,role){
	return new Promise((resolve,reject) =>{
		jwt.sign({id:id,role:role},secret,(err,data) =>{
			if(err){
				reject(err)
			}
			else
			{
				resolve(data)
			}
		})
	})	
}
ob.decode=function(token,role){
	return new Promise((resolve,reject) =>{
		jwt.verify(token,secret,(err,data) =>{
			if(err)	{reject(err)}
			else{
				if(data)
				{
					if(data.role==role)
					{
						resolve(data)
					}
					else
					{
						reject("invalid token for provided "+role)
					}
				}
				else{
					reject("invalid token")
				}
			}	
		})
	})
}

ob.getToken=function(req){
	let token=''
	if(req.headers)
	{
		if(req.headers["authorization"])
		{
			if(req.headers["authorization"].split(" ")[1])	
			{
				token=req.headers["authorization"].split(" ")[1]
			}
		}
		
	}
	return token
}

module.exports=ob