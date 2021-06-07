// npm init -y & npm install express mysql cors body-parser jsonwebtoken csv-pasrer express-fileupload dotenv
require("dotenv").config()
const express=require("express")
const cors=require("cors")
const body=require("body-parser")
const port=process.env.port||8080

const index=require("./routes/index")
const user=require("./routes/user")
const admin=require("./routes/admin")
const login=require("./routes/login")
const signup=require("./routes/signup")

const services=require("./services/index")


const app=express()
function url(req,res,next)
{
	console.log(req.url)
	next()
}
function logger(req,res,next)
{
	console.log(req.method)
	next()
}
function request(req,res,next)
{
	console.log(req.url,req.params,req.body)
	next()
}
app.use(cors())
app.use(body.json())
app.use(body.urlencoded({extended:true}))
app.use(url)
app.use(logger)
app.use(request)




function userValidate(req,res,next)
{	
	let role="user"
	let token=services.getToken(req)
	services.decode(token,role)
	.then(d=>req.id=d.id)
	.then(d=>next())
	.catch(e=>res.json({status:false,data:"invalid token sipplied"}))
}
function adminValidate(req,res,next)
{	
	let role="admin"
	let token=services.getToken(req)
	services.decode(token,role)
	.then(d=>next())
	.catch(e=>res.json({status:false,data:"invalid token sipplied"}))
}



app.use("/api",index)
app.use("/api/login",login)
app.use("/api/signup",signup)
app.use("/api/user",userValidate,user)
app.use("/api/admin",adminValidate,admin)

app.listen(port,() =>console.log(`server started on ${port}`))