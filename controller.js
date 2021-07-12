   
    var bcrypt = require('bcryptjs');
  const mysql = require('mysql')
const { v4 : uuidv4} = require("uuid")
  const connection= mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"bugatech"
})

 
 /* technitians   create account   */
 
 
 exports.tcacc =  async (req,res)=>{
  try{
  	var branchid = req.body.branchid
 var token = req.body.token
 var fname = req.body.firstname
 var lname = req.body.secondname
 var email = req.body.email
 var phonenumber =  req.body.phonenumber
var username = req.body.username
var password = req.body.password
var cpassword = req.body.cpassword
var id = uuidv4()
if(!username || !password || !cpassword){
  res.render('technicianpages/techniciancreateacc',{message:'please u shouldnt  leave any of the inputs empty' })
}else {
  if( password !== cpassword){ 
res.render('technicianpages/techniciancreateacc',{message:'please you dint confirm your password well' })
 }else{
console.log(token)
var sql = "select * from technicianentrycode where entrycode = ?"
connection.query(sql,[token],(err,rows)=>{ 
if(err){
console.log(err.message)
console.log("failed to query database")
 }else{
if(rows.length !== 1){
	
res.render('technicianpages/techniciancreateacc',{message:"token: "+token+" doesnot exist, please contact admin to get a token" })
 }else{
 	 if( rows[0].technicianid !== null){ 
console.log("token already in use")
res.render('technicianpages/techniciancreateacc',{message:"token: "+token+" is already in use, please contact admin" })
 
}else{
 
   var sql = "update technicianentrycode set technicianid = ? where entrycode = ?"
 connection.query(sql,[id,token],(err,rows)=>{  
   if(err){ 
console.log(err.message)
console.log("failed to query database")
}else{
 
var sql="select * from technicians where technicianusername = ?"
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
   var sql="insert into technicians(technicianid,technicianfname,technicianlname,technicianemail,techniciannumber,technicianusername,technicianpassword,datecreated,branchid) values(?,?,?,?,?,?,?,now(),?)"
   
connection.query(sql,[id,fname,lname,email,phonenumber,username,hashpassword,branchid] , (err, rows)=>{
if(err){
  throw error.message
  console.log("failed to query the database")
  }else{ 
res.render('technicianpages/techniciancreateacc',{message:"TECHNICIAN "+fname+" has been succesfully created" })

}}) 
}catch(err){console.log(err.message)}
}
hashedfunction(hashedpassword)
 
}else{
res.render('technicianpages/techniciancreateacc',{message:"The username : "+username+" has already been taken" })

 } }}) 
}})
  } } 
  
  
  }}) }
}} catch(err){ console.log(err.message) }
 } 
 
 
 
 
 
 //technicians login
 
 exports.technicianlogin=  (req,res)=>{
  try{
var username = req.body.username
var password = req.body.password

if(!username || !password){
res.render('technicianlogin',{message:'please u dont leave any of the inputs empty' })
}else{
	

var sql="select * from technicians where technicianusername = ?" 
connection.query(sql, [username] , (err, rows)=>{
if(err){
  throw error
  console.log("failed to query the database")
  }else{
  	//console.log(rows.length)
if(rows.length !== 1){
  console.log("wrong passord or username")
res.render('technicianlogin',{ message :' try again with a correct username or password not one row'})
 }else{
 
  //Load hash from your password DB.
var compare = bcrypt.compare(password,rows[0].technicianpassword)
    // res === true
   // console.log(password)
    async function comparepassword (compare){
    var pcompare = await compare
   // console.log(pcompare)
	if(pcompare == true){ 
 req.session.technicianuser = rows[0].technicianid
 //console.log(" the session id is "+ req.session.technicianuser )
 
 if(!req.session.technicianuser){
res.status(500).send()
 }else{ 
var sql = "select customertable.customerid,customertable.customerfname,customertable.customerlname,customertable.customercontact,customeremail.email,customertable.datecreated,devicetable.deviceid,devicetable.technicianid,devicetable.devicename,devicetable.warrant,devicestatus.devicestatus from customertable inner join devicetable on customertable.customerid = devicetable.customerid inner join devicestatus on devicetable.deviceid = devicestatus.deviceid left join customeremail on customeremail.email = customertable.customerid where customertable.technicianid = ? and devicestatus.devicestatus = ?"
var technicianid = req.session.technicianuser
connection.query(sql,[technicianid,"virgindevice"],(err,rows)=>{
if(err){ console.log("failed to query database")}
else{
	//console.log(rows)
res.render('technicianpages/technicianhome',{rows : rows, sessionid:req.session.technicianuser})
 }
 })
}
 
//res.render('technicianpages/technicianhome',{sessionid:req.session.technicianuser })
}else{ 
	res.render('technicianlogin',{ message :' try again with a correct password'})
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
 
 
 
 
/* customer create account */


      
      exports.customercacc =  async (req,res)=>{
  try{
 var fname = req.body.firstname
 var lname = req.body.lastname
 var email = req.body.email
 var phonenumber =  req.body.phonenumber
 var devicename = req.body.devicename
 var warranty = req.body.warranty
 var deviceimei = req.body.deviceimei
 var deviceserial = req.body.deviceserial
 var technicianid = req.session.technicianuser
 
var id = uuidv4()
if(!fname || !lname || !phonenumber){
  res.render('technicianpages/customerlogin',{message:'please u shouldnt  leave any of the inputs empty' })
}else { 
  try{
    
  
  const customerid = uuidv4()
   var sql="insert into customertable(customerid,customerfname, customerlname ,customercontact,datecreated,technicianid) values(?,?,?,?,now(),?)"
   
connection.query(sql,[customerid,fname,lname,phonenumber,technicianid] , (err, rows)=>{
if(err){
  console.log( error.message)
  console.log("failed to query the database")
  }else{ 
    
    try{
  
  if(warranty =="TRUE"){warranty = true }
  else if( warranty == "FALSE"){warranty = false}
  var deviceid = uuidv4()
console.log("warranty and deviceid")
 console.log(warranty)
 console.log(deviceid)
  console.log("originalid")
  console.log(id)
  var sql="insert into devicetable(deviceid,customerid, devicename ,warrant,datecreated,technicianid) values(?,?,?,?,now(),?)"
   
connection.query(sql,[deviceid,customerid,devicename,warranty,technicianid] , (err, rows)=>{
  try{
if(err){
  throw error.message
  console.log("failed to query the database")
  }else{ 
  	var statusid = uuidv4()
      var devicestatus = "virgindevice"
  sql = "insert into devicestatus (statusid,deviceid,devicestatus) values(?,?,?)"
  
  connection.query(sql,[statusid,deviceid,devicestatus],(err,rows)=>{ 
  if(err){ 
console.log("failed to insert into device status")
console.log(err.message)}
  else{
    
    
    
    if(email){
    console.log("i have an email")
  emailid = uuidv4()
  sql = "insert into customeremail (emailid,customerid,email) values(?,?,?)"
  connection.query(sql,[emailid,customerid,email],(err)=>{
    if(err){
      console.log("failed to insert into customer email table")
      console.log(err.message)
    } else{
    
 if(!deviceimei && !deviceserial){
res.render('technicianpages/customerlogin',{message:"please fill in either a serialnumber or an imei number" })
 }
  
     else if(deviceimei &&  deviceserial){console.log("imei and serial are set")
 
    var imeiid = uuidv4()
  var sql="insert into deviceimei(imeiid,deviceid, imei) values(?,?,?)"
   
connection.query(sql,[imeiid,deviceid,deviceimei] , (err, rows)=>{
if(err){
  throw error.message
  console.log("failed to query the database")
  }else{ 
 // res.render('technicianpages/customerlogin',{message:"customer record: "+fname+" has been succesfully created" })
var serialid = uuidv4()
  var sql="insert into deviceserialnumber(serialid,deviceid, serialnumber) values(?,?,?)"
   
connection.query(sql,[serialid,deviceid,deviceserial] , (err, rows)=>{
if(err){
  throw error.message
  console.log("failed to query the database")
  }else{ 
  res.render('technicianpages/customerlogin',{message:"customer record: "+fname+" has been succesfully created" })


}})
  
  } })
  }
  
  else if(deviceimei){console.log("imei only set")
  
    var imeiid = uuidv4()
  var sql="insert into deviceimei(imeiid,deviceid, imei) values(?,?,?)"
   
connection.query(sql,[imeiid,deviceid,deviceimei] , (err, rows)=>{
if(err){
  throw error.message
  console.log("failed to query the database")
  }else{ 
  res.render('technicianpages/customerlogin',{message:"customer record: "+fname+" has been succesfully created" })

  
  } })
  }
  
  else if(deviceserial){console.log("device serial is set only")
 
    var serialid = uuidv4()
  var sql="insert into deviceserialnumber(serialid,deviceid, serialnumber) values(?,?,?)"
   
connection.query(sql,[serialid,deviceid,deviceserial] , (err, rows)=>{
if(err){
  throw error.message
  console.log("failed to query the database")
  }else{ 
  res.render('technicianpages/customerlogin',{message:"customer record: "+fname+" has been succesfully created" })
}})
}
} //else mini
    
  })

}else{ 
  
  console.log("i have no email")
 if(!deviceimei && !deviceserial){
res.render('technicianpages/customerlogin',{message:"please fill in either a serialnumber or an imei number" })
 }
  
     else if(deviceimei &&  deviceserial){console.log("imei and serial are set")
 
    var imeiid = uuidv4()
  var sql="insert into deviceimei(imeiid,deviceid, imei) values(?,?,?)"
   
connection.query(sql,[imeiid,deviceid,deviceimei] , (err, rows)=>{
if(err){
  throw error.message
  console.log("failed to query the database")
  }else{ 
 // res.render('technicianpages/customerlogin',{message:"customer record: "+fname+" has been succesfully created" })
var serialid = uuidv4()
  var sql="insert into deviceserialnumber(serialid,deviceid, serialnumber) values(?,?,?)"
   
connection.query(sql,[serialid,deviceid,deviceserial] , (err, rows)=>{
if(err){
  throw error.message
  console.log("failed to query the database")
  }else{ 
  res.render('technicianpages/customerlogin',{message:"customer record: "+fname+" has been succesfully created" })
}})
    } })
  }
  
  else if(deviceimei){console.log("imei only set")
  
    var imeiid = uuidv4()
  var sql="insert into deviceimei(imeiid,deviceid, imei) values(?,?,?)"
   
connection.query(sql,[imeiid,deviceid,deviceimei] , (err, rows)=>{
if(err){
  throw error.message
  console.log("failed to query the database")
  }else{ 
  res.render('technicianpages/customerlogin',{message:"customer record: "+fname+" has been succesfully created" })

  
  } })
  }
  
  else if(deviceserial){console.log("device serial is set only")
 
    var serialid = uuidv4()
  var sql="insert into deviceserialnumber(serialid,deviceid, serialnumber) values(?,?,?)"
   
connection.query(sql,[serialid,deviceid,deviceserial] , (err, rows)=>{
if(err){
  throw error.message
  console.log("failed to query the database")
  }else{ 
  res.render('technicianpages/customerlogin',{message:"customer record: "+fname+" has been succesfully created" })


}})
}
}
//email else
}
})
}}catch(err){console.log(err.message)}
})
}catch(err){console.log(err.message)} 
}
})
}catch(err){console.log(err.message)}
}
}catch(err){console.log(err.message)}

}








/* supervisor login */

exports.supervisorlogin =  (req,res)=>{
  try{
var username = req.body.username
var password = req.body.password

if(!username || !password){
res.render('supervisorlogin',{message:'please u dont leave any of the inputs empty' })
}else{
	

var sql="select * from supervisor where supervisorusername = ? AND supervisorpassword = ?" 
connection.query(sql, [username,password] , (err, rows)=>{
if(err){
  throw error
  console.log("failed to query the database")
  }else{
if(rows.length !== 1){
  console.log("wrong passord or username")
res.render('supervisorlogin',{ message :' try again with a correct username or password'})
 }else{
 
 req.session.supervisoruser = rows[0].supervisorid
 console.log(" the session id is "+ req.session.supervisoruser)
 res.render('supervisorpages/supervisor',{sessionid:req.session.supervisoruser })
}
 

 }
})
}}
catch(err){ 
console.log(err)
res.status(500).send()
 }
 } 
 
  







 /*   RETREIVE */
 
 /*DISPLAYING TABLES */


 
 /* TECHNICIAN GET HOME */
 
 exports.technicianhome= (req,res)=>{ 
 	technicianid = req.body.technicianuser
if(!req.session.technicianuser){
res.status(500).send()
 }else{ 
var sql = "select customertable.customerid,customertable.customerfname,customertable.customerlname,customertable.customercontact,customeremail.email,customertable.datecreated,devicetable.deviceid,devicetable.technicianid,devicetable.devicename,devicetable.warrant,devicestatus.devicestatus from customertable inner join devicetable on customertable.customerid = devicetable.customerid inner join devicestatus on devicetable.deviceid = devicestatus.deviceid left join customeremail on customeremail.email = customertable.customerid where customertable.technicianid = ? and devicestatus.devicestatus = ? "
var technicianid = req.session.technicianuser
connection.query(sql,[technicianid,"virgindevice"],(err,rows)=>{
if(err){ console.log("failed to query database")}
else{
res.render('technicianpages/technicianhome',{rows : rows, sessionid:req.session.technicianuser})
 }
 })
}}
 
 
 
 /* SELECT DEVICE  SPARE */
 
 exports.technicianaddspare =  async (req,res)=>{
  if(!req.session.technicianuser){
    console.log("someone it trying to hack us ,: technician add spare post")
    res.status(500).send()
  }else{
  	console.log("technician session set well")
  try{
  	var customerid = req.body.customerid
 var deviceid= req.body.deviceid
 var technicianid = req.session.technicianuser
 
 var sql = "select branches.branchid, branches.branchname from technicians inner join branches on technicians.branchid = branches.branchid where technicianid = ?"
 
 connection.query(sql,[technicianid],(err,rows)=>{
   if(err){ 
     console.log("failed to query technicianaddspare")
     console.log(err.message)
   }else{
  // console.log("finished my first query")
   var branchname = rows[0].branchname
   //console.log(branchname)
   var branchid = rows[0].branchid
console.log(rows)
 var sql = "select spareid,sparename,spareamount,totalcharge from spares where branchid = ?"
	connection.query(sql,[branchid],(err,rows)=>{
	if(err){ console.log(err.message)}
	else{
res.render('technicianpages/technicianspares',{message:"Choose spares" ,deviceid:deviceid,rows:rows,customerid :customerid, branchname : branchname})

 }
} )

}
 })

}catch(err){ console.log(err.message) }
 
}
} 
 






                        /* technician spares choose  start*/


exports.technicianspares =  async (req,res)=>{
  try{
  
     console.log("pending device status")
   var sparesarray = req.body.sparesarray
   var selectlevel = req.body.selectlevel
   var deviceid = req.body.deviceid
   var customerid = req.body.customerid
    var technicianid = req.session.technicianuser
    var totalspareprice= 0
    var res;
    
    console.log(sparesarray.length)
   
 if(sparesarray.length==0){
  console.log("am selecting")


res.json({message:"Atleast Choose one Spare"})

console.log("i have finished redirecting you back")
 
      
    }else{ 
      // main else start
      
      
  
  var uuidf = ()=>{ 
return new Promise( (resolve,reject)=>{ 
  var usedspareid= uuidv4()
return resolve(usedspareid)
})
}
  
  var spares =  ()=>{ return new Promise((resolve,reject)=>{

  var sql= "update spares set spareamount = (spareamount - ?) where spareid = ?"
console.log("sparesres[0]")
console.log(res[3], res[0])
console.log(res)
connection.query(sql,[parseInt(res[2]),res[0]], (err)=>{
//connection.end()
if(err){reject(console.log(err.message))}
else{
resolve (console.log("finished updating spares"))
}
 })
 }) }
 
 
  var usedspares =  (usedspareid)=>{
     return new Promise((resolve,reject)=>{
     try{
// console.log("inserting into used spares")
var sql = "insert into usedspares ( usedspareid, technicianid, deviceid, spareid, customerid, datecreated) values(?,?,?,?,?,now())"
console.log("usedsparesres[0]")
console.log(res[0])
connection.query(sql,[usedspareid,technicianid,deviceid,res[0],customerid], (err)=>{ 
//connection.end()
if(err){reject(console.log(err.message))}
else{
resolve( console.log("finished inserting into used spares"))
}
} )
}catch(err){console.log(err.message)}
 }
)}

 //var sparesarray = [spares(),usedspares()]
 
   var  loop = async()=>{
   return new Promise ( (resolve,reject)=>{
    
// for( x = 0; x<record.length; x++){
  var sparequery  = async()=>{
  
   for await (res of  sparesarray ){
     
   

totalspareprice =parseFloat(totalspareprice) + parseFloat(res[3])

var usedspareid = await uuidf()
console.log("usedspareid")
console.log(usedspareid)
 await spares()
 console.log("spares up")
  await usedspares(usedspareid)
  console.log("usedspares up")


console.log("first query loop")
}}
resolve(sparequery())
})

} 


var loopawait = async(req,res)=>{
await loop()
//await  totalcf()
console.log("succesfuly finished looping")
console.log(totalspareprice)
var chargeid = uuidv4()
console.log("charge id")
console.log(chargeid)

console.log("second last select query")
var sql ="insert into devicetotalcharge(chargeid,deviceid,devicetotalcharge,datecreated) values (?,?,?,now())"
connection.query(sql,[chargeid,deviceid,totalspareprice],(err,rows)=>{
try{
if(err){console.log(err.message)}
else{
console.log("finished inserting into device total charge")


var statusid = uuidv4()
      var devicestatus = "pendingdevice"
  //sql = "insert into devicestatus (statusid,deviceid,devicestatus) values(?,?,?)"
  sql = "update devicestatus set devicestatus = ? where deviceid = ?"
  connection.query(sql,[devicestatus,deviceid],(err,rows)=>{ 
  if(err){ 
console.log("tpending post failed to update spares")
console.log(err.message) 
}else { 
// final route
res.json( {url:"/tpending"})

} })

}
}catch(err){console.log(err.message) }
})
//console.log("hello world")
//console.log("THE End")

 }

loopawait(req,res)

//main else bracket
    }
    
}catch(err){ console.log(err.message) }
 } 
 
 
     /*technicianspares end*/
    
    
    
    
    
     /* TPENDING GET*/
 
 exports.tpending = (req,res)=>{ 
 	
if(!req.session.technicianuser){
res.status(500).send()
 }else{ 
console.log("tpending Get working")
var sql = "select customertable.customerid,customertable.customerfname,customertable.customerlname,customertable.customercontact,customeremail.email,customertable.datecreated,devicetable.deviceid,devicetable.technicianid,devicetable.devicename,devicetable.warrant,devicestatus.devicestatus from customertable inner join devicetable on customertable.customerid = devicetable.customerid inner join devicestatus on devicetable.deviceid = devicestatus.deviceid left join customeremail on customeremail.email = customertable.customerid where customertable.technicianid = ? and devicestatus.devicestatus = ?"
var technicianid = req.session.technicianuser
var devicestatus = "pendingdevice"
connection.query(sql,[technicianid,devicestatus],(err,rows)=>{
if(err){ console.log("failed to query database")}
else{
 res.render('technicianpages/tpending',{rows : rows, sessionid:technicianid})
 } })


}}



/* TFAILED GET*/
 
 exports.tfailed = (req,res)=>{ 
 	
if(!req.session.technicianuser){
res.status(500).send()
 }else{ 
console.log("tfailed Get working")
var sql = "select customertable.customerid,customertable.customerfname,customertable.customerlname,customertable.customercontact,customeremail.email,customertable.datecreated,devicetable.deviceid,devicetable.technicianid,devicetable.devicename,devicetable.warrant,devicestatus.devicestatus from customertable inner join devicetable on customertable.customerid = devicetable.customerid inner join devicestatus on devicetable.deviceid = devicestatus.deviceid left join customeremail on customeremail.email = customertable.customerid where customertable.technicianid = ? and devicestatus.devicestatus = ?"
var technicianid = req.session.technicianuser
var devicestatus = "faileddevice"
connection.query(sql,[technicianid,devicestatus],(err,rows)=>{
if(err){ console.log("failed to query database")}
else{
 res.render('technicianpages/tfailed',{rows : rows, sessionid:technicianid})
 } })


}}
 
 
 
 /* TREADY GET*/
 
 exports.tready = (req,res)=>{ 
 	
if(!req.session.technicianuser){
res.status(500).send()
 }else{ 
console.log("tready Get working")
var sql = "select customertable.customerid,customertable.customerfname,customertable.customerlname,customertable.customercontact,customeremail.email,customertable.datecreated,devicetable.deviceid,devicetable.technicianid,devicetable.devicename,devicetable.warrant,devicestatus.devicestatus from customertable inner join devicetable on customertable.customerid = devicetable.customerid inner join devicestatus on devicetable.deviceid = devicestatus.deviceid left join customeremail on customeremail.email = customertable.customerid where customertable.technicianid = ? and devicestatus.devicestatus = ?"
var technicianid = req.session.technicianuser
var devicestatus = "readydevice"
connection.query(sql,[technicianid,devicestatus],(err,rows)=>{
if(err){ console.log("failed to query database")}
else{
 res.render('technicianpages/tready',{rows : rows, sessionid:technicianid})
 } })


}}
 
 
 /* Tpending post */
 
 exports.tpendingpost= (req,res)=>{ 
 	var devicename = req.body.devicename
 	var deviceid = req.body.deviceid
  var customerid = req.body.customerid
  var fate = req.body.fate
  
  if(fate == "ready"){ 

  sql = "update devicestatus set devicestatus = ? where deviceid = ?"
  connection.query(sql,["readydevice",deviceid],(err,rows)=>{ 
  if(err){ 
console.log("tpending post failed to update spares")
console.log(err.message) 
}else { 
//route back

var sql = "select customertable.customerid,customertable.customerfname,customertable.customerlname,customertable.customercontact,customeremail.email,customertable.datecreated,devicetable.deviceid,devicetable.technicianid,devicetable.devicename,devicetable.warrant,devicestatus.devicestatus from customertable inner join devicetable on customertable.customerid = devicetable.customerid inner join devicestatus on devicetable.deviceid = devicestatus.deviceid left join customeremail on customeremail.email = customertable.customerid where customertable.technicianid = ? and devicestatus.devicestatus = ?"
var technicianid = req.session.technicianuser
var devicestatus = "pendingdevice"
connection.query(sql,[technicianid,devicestatus],(err,rows)=>{
if(err){ console.log("failed to query database")}
else{
 res.render('technicianpages/tpending',{rows : rows, sessionid:technicianid, message : "succesfully finished determining : "+devicename+" 's fate to ready"  })
 } })





}   })
}

else if( fate == "failed"){
  	
  sql = "update devicestatus set devicestatus = ? where deviceid = ?"
  connection.query(sql,["faileddevice",deviceid],(err,rows)=>{ 
  if(err){ 
console.log("tpending post failed to update spares")
console.log(err.message)
  	}else{
//route back

var sql = "select customertable.customerid,customertable.customerfname,customertable.customerlname,customertable.customercontact,customeremail.email,customertable.datecreated,devicetable.deviceid,devicetable.technicianid,devicetable.devicename,devicetable.warrant,devicestatus.devicestatus from customertable inner join devicetable on customertable.customerid = devicetable.customerid inner join devicestatus on devicetable.deviceid = devicestatus.deviceid left join customeremail on customeremail.email = customertable.customerid where customertable.technicianid = ? and devicestatus.devicestatus = ?"
var technicianid = req.session.technicianuser
var devicestatus = "pendingdevice"
connection.query(sql,[technicianid,devicestatus],(err,rows)=>{
if(err){ console.log("failed to query database")}
else{
 res.render('technicianpages/tpending',{rows : rows, sessionid:technicianid, message : "succesfully finished determining : "+devicename+" 's fate to failed"  })
 } })


 }
})

}

  }
  

      