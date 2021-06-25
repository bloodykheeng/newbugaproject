   
    var bcrypt = require('bcryptjs');
  const mysql = require('mysql')
const { v4 : uuidv4} = require("uuid")
  const connection= mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"bugatech"
})

exports.adminlogin =  (req,res)=>{
  try{
var username = req.body.username
var password = req.body.password

if(!username || !password){
res.render('adminlogin',{message:'please u dont leave any of the inputs empty' })
}else{
	

var sql="select * from admins where adminusername = ?" 
connection.query(sql, [username] , (err, rows)=>{
if(err){
  throw error
  console.log("failed to query the database")
  }else{
  	console.log(rows.length)
if(rows.length !== 1){
  console.log("wrong passord or username")
res.render('adminlogin',{ message :' try again with a correct username or password'})
 }else{
 
  //Load hash from your password DB.
const compare = bcrypt.compare(password, rows[0].adminpassword)
    // res === true
    console.log(rows[0].adminpassword)
    async function comparepassword (compare){
    var pcompare = await compare
    console.log(pcompare)
	if(pcompare == true){ 
 req.session.user = rows[0].adminid
 console.log(" the session id is "+ req.session.user )
 res.render('admin',{sessionid:req.session.user })
}else{ 
	res.render('adminlogin',{ message :' try again with a correct password'})
	console.log('password missmatch')
	}
 }
 comparepassword (compare)
 
}
}
}) }
}catch(err){ 
console.log(err)
res.status(500).send()
 }
 } 
 
 

 
 
 /* admins create admins */
 
 
 exports.admincacc =  async (req,res)=>{
  try{
var username = req.body.username
var password = req.body.password
var cpassword = req.body.cpassword
var id = uuidv4()
if(!username || !password || !cpassword){
	res.render('adminpages/admincreateacc',{message:'please u shouldnt  leave any of the inputs empty' })
}else {
	if( password !== cpassword){ 
res.render('adminpages/admincreateacc',{message:'please you dint confirm your password well' })
 }else{


var sql="select * from admins where adminusername = ?"
connection.query(sql, [username] , (err, rows)=>{
	//connection.end()
if(err){
  throw error.message
  console.log("failed to query the database")
  }else{
if(rows.length === 0){
	
	const hashedpassword =  bcrypt.hash(password,10)
	
        // Store hash in your password DB.
     const hashedfunction = async (hash)=>{
  	try{
   const hashpassword = await  hash
   var sql="insert into admins(adminid,adminusername,adminpassword) values(?,?,?)"
   
connection.query(sql,[id,username,hashpassword] , (err, rows)=>{
if(err){
  throw error.message
  console.log("failed to query the database")
  }else{ 
res.render('adminpages/admincreateacc',{message:"adminer "+username+" has been succesfully created" })

}}) 
}catch(err){console.log(err.message)}
}
hashedfunction(hashedpassword)
 
}else{
res.render('adminpages/admincreateacc',{message:"The username : "+username+" has already been taken" })

 } }
}) 

}} 
 
}catch(err){ console.log(err.message) }
 } 
 
 
 
 /* Admin create technitians      */
 
 
 exports.admintcacc =  async (req,res)=>{
  try{
 var fname = req.body.firstname
 var lname = req.body.secondname
 var email = req.body.email
 var phonenumber =  req.body.phonenumber
var username = req.body.username
var password = req.body.password
var cpassword = req.body.cpassword
var id = uuidv4()
if(!username || !password || !cpassword){
	res.render('adminpages/techniciancreateacc',{message:'please u shouldnt  leave any of the inputs empty' })
}else {
	if( password !== cpassword){ 
res.render('adminpages/techniciancreateacc',{message:'please you dint confirm your password well' })
 }else{


var sql="select * from technicians where technicianusername = ?"
connection.query(sql, [username] , (err, rows)=>{
	//connection.end()
if(err){
  throw error.message
  console.log("failed to query the database")
  }else{
if(rows.length === 0){
	
	const hashedpassword =  bcrypt.hash("password",10)
	
        // Store hash in your password DB.
     const hashedfunction = async (hash)=>{
  	try{
   const hashpassword = await  hash
   var sql="insert into technicians(technicianid,technicianfname,technicianlname,technicianemail,techniciannumber,technicianusername,technicianpassword) values(?,?,?,?,?,?,?)"
   
connection.query(sql,[id,fname,lname,email,phonenumber,username,hashpassword] , (err, rows)=>{
if(err){
  throw error.message
  console.log("failed to query the database")
  }else{ 
res.render('adminpages/techniciancreateacc',{message:"adminer "+username+" has been succesfully created" })

}}) 
}catch(err){console.log(err.message)}
}
hashedfunction(hashedpassword)
 
}else{
res.render('adminpages/techniciancreateacc',{message:"The username : "+username+" has already been taken" })

 } }
}) 

}} 
 
}catch(err){ console.log(err.message) }
 } 
 
 