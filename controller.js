 var bcrypt = require('bcryptjs');
  const mysql = require('mysql2');
const { v4 : uuidv4} = require("uuid")
 const connection = 
  mysql.createConnection({
    /*
  host : "localhost",
  user     : "root",
  password : "",
  database : "bugatech"
*/
  
host : "172.30.72.177",
  user     : "root",
  password : "1234",
  database : "bugatech"

  
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
//console.log(token)
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
  //console.log("wrong passord or username")
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
 if(req.session.technicianuser){
   
   var sql = "update technicians set status ='online' where technicianid= ?"
   connection.query(sql,[req.session.technicianuser],(err)=>{
     if(err){ 
       console.log("failed to update technician status")
       console.log(err.message)
     }else{ 
       
if(!req.session.technicianuser){
res.status(500).send()
 }else{ 
var sql = "select customertable.customerid,customertable.customerfname,customertable.customerlname,customertable.customercontact,customeremail.email,customertable.datecreated,devicetable.deviceid,devicetable.technicianid,devicetable.devicename,devicetable.warrant,devicestatus.devicestatus, customertable.customercomment, deviceimei.imei , deviceserialnumber.serialnumber from customertable inner join devicetable on customertable.customerid = devicetable.customerid inner join devicestatus on devicetable.deviceid = devicestatus.deviceid left join customeremail on customeremail.customerid = customertable.customerid  left join deviceimei on devicetable.deviceid = deviceimei.deviceid left join deviceserialnumber on devicetable.deviceid = deviceserialnumber.deviceid where customertable.technicianid = ? and devicestatus.devicestatus = ? order by customertable.datecreated DESC"
var technicianid = req.session.technicianuser
connection.query(sql,[technicianid,"virgindevice"],(err,rows)=>{
if(err){ console.log("failed to query database")}
else{
	//console.log(rows)
res.render('technicianpages/technicianhome',{rows : rows, sessionid:req.session.technicianuser})
 }
 })}
  } })}
 
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
 
 
 
 
/* customer create record*/


      
      exports.customercacc =  async (req,res)=>{
  try{
  var devicecomment = req.body.devicecomment
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
if(!fname || !lname || !phonenumber || !devicecomment){
  res.render('technicianpages/customerlogin',{message:'please u shouldnt  leave any of the inputs empty' })
}else { 
  try{
    
  
  const customerid = uuidv4()
   var sql="insert into customertable(customerid,customerfname, customerlname ,customercontact,datecreated,technicianid,customercomment) values(?,?,?,?,now(),?,?)"
   
connection.query(sql,[customerid,fname,lname,phonenumber,technicianid,devicecomment] , (err, rows)=>{
if(err){
  console.log( error.message)
  console.log("failed to query the database")
  }else{ 
    
    try{
  
  if(warranty =="TRUE"){warranty = true }
  else if( warranty == "FALSE"){warranty = false}
  var deviceid = uuidv4()
/*console.log("warranty and deviceid")
 console.log(warranty)
 console.log(deviceid)
  console.log("originalid")
  console.log(id)
  */
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

var sql = "select customertable.customercomment,customertable.datecreated, devicetable.devicename, technicians.technicianfname, technicians.technicianlname, technicians.technicianemail,technicians.techniciannumber from customertable inner join devicetable on customertable.customerid = devicetable.customerid inner join technicians on devicetable.technicianid = technicians.technicianid order by customertable.datecreated desc"

connection.query(sql,(err,rows)=>{
  if(err){
    console.log("failed to query for supervisors login render")
    console.log(err.message)
  }else{
res.render('supervisorpages/supervisor',{rows:rows,sessionid:req.session.supervisoruser ,message:"your welcome "+username+""
  }) }
  }) }
  } })
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
var sql = "select customertable.customerid,customertable.customerfname,customertable.customerlname,customertable.customercontact,customeremail.email,customertable.datecreated,devicetable.deviceid,devicetable.technicianid,devicetable.devicename,devicetable.warrant,devicestatus.devicestatus, customertable.customercomment, deviceimei.imei , deviceserialnumber.serialnumber from customertable inner join devicetable on customertable.customerid = devicetable.customerid inner join devicestatus on devicetable.deviceid = devicestatus.deviceid left join customeremail on customeremail.customerid = customertable.customerid  left join deviceimei on devicetable.deviceid = deviceimei.deviceid left join deviceserialnumber on devicetable.deviceid = deviceserialnumber.deviceid where customertable.technicianid = ? and devicestatus.devicestatus = ? order by customertable.datecreated DESC"
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
 var sql = "select spareid,sparename,spareamount,totalcharge from spares where branchid = ? order by spares.sparename"
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
    
   // console.log(sparesarray.length)
   
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
/*
console.log("sparesres[0]")
console.log(res[3], res[0])
console.log(res)
*/
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
       
var sql = "select * from usedspares where deviceid = ? and spareid = ? and technicianid = ?"
       
connection.query(sql,[deviceid,res[0],technicianid],(err,rows)=>{
  
  if(err){
    console.log("failed to query used spares")
    console.log(err.message)
  }else{ 
       
       
    if(rows.length == 1){ 
      
 var sql = "update usedspares set quantity = (quantity + ?) where deviceid = ? and spareid = ? and technicianid = ? "   
 
 connection.query(sql,[parseInt(res[2]),deviceid,res[0],technicianid],(err,rows)=>{
if(err){
  console.log("failed to update usedspares")
  console.log(err.message)
}else{
resolve( console.log("finished updating usedspares"))
} })
      
   }else if(rows.length == 0){
       

var sql = "insert into usedspares ( usedspareid, technicianid, deviceid, spareid, customerid, datecreated,quantity) values(?,?,?,?,?,now(),?)"
//console.log("usedsparesres[0]")
//console.log(res[0])
connection.query(sql,[usedspareid,technicianid,deviceid,res[0],customerid,parseInt(res[2])], (err)=>{ 
//connection.end()
if(err){reject(console.log(err.message))}
else{
resolve( console.log("finished inserting into used spares"))
} })  } else{console.log("failed to find a single unique row in used spares")}    
} })
       
}catch(err){console.log(err.message)}
 }
)}

/* NB  
res[0] spareid
res[1] sparename
res[2]  spare quantity selected
res[3] spare price fir a single spare
*/



 //var sparesarray = [spares(),usedspares()]
 
   var  loop = async()=>{
   return new Promise ( (resolve,reject)=>{
    
// for( x = 0; x<record.length; x++){
  var sparequery  = async()=>{
  
   for await (res of  sparesarray ){
     
  var myquantity = parseInt(res[2])
 var myamount = parseFloat(res[3])

totalspareprice = parseFloat(totalspareprice) + (myquantity * myamount )

var usedspareid = await uuidf()
//console.log("usedspareid")
//console.log(usedspareid)
 await spares()
// console.log("spares up")
  await usedspares(usedspareid)
 // console.log("usedspares up")


//console.log("first query loop")
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


var sql = "select * from devicetotalcharge where deviceid = ?"
connection.query(sql,[deviceid],(err,rows)=>{

if(err){
  console.log("failed to query devicetotal charge")
  console.log(err.message)
  
}else{
console.log("device total charge row.length down")
//console.log(rows.length)
if(rows.length == 1){

  var mytotalspareprice = parseFloat(rows[0].devicetotalcharge) + totalspareprice

  var sql = "update devicetotalcharge set devicetotalcharge = ? where deviceid = ?"
  connection.query(sql,[mytotalspareprice,deviceid],(err,rows)=>{
if(err){ 
  console.log("failed to update totalspare price")
  console.log(err.message)
}else{
res.json( {url:"/tpending"})
}
    
  })
  
}else if(rows.length == 0){
  




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
}}
})
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

var sql = "select customertable.customerid,customertable.customerfname,customertable.customerlname,customertable.customercontact,customeremail.email,customertable.datecreated,devicetable.deviceid,devicetable.technicianid,devicetable.devicename,devicetable.warrant,devicestatus.devicestatus, customertable.customercomment, deviceimei.imei , deviceserialnumber.serialnumber, devicetotalcharge.devicetotalcharge from customertable inner join devicetable on customertable.customerid = devicetable.customerid inner join devicestatus on devicetable.deviceid = devicestatus.deviceid left join customeremail on customeremail.customerid = customertable.customerid  left join deviceimei on devicetable.deviceid = deviceimei.deviceid left join deviceserialnumber on devicetable.deviceid = deviceserialnumber.deviceid inner join devicetotalcharge on devicetotalcharge.deviceid = devicetable.deviceid where customertable.technicianid = ? and devicestatus.devicestatus = ? order by customertable.datecreated DESC"
var technicianid = req.session.technicianuser
var devicestatus = "pendingdevice"
connection.query(sql,[technicianid,devicestatus],(err,rows)=>{
if(err){ console.log("failed to query database")
  
console.log(err.message)
}else{
 res.render('technicianpages/tpending',{rows : rows, sessionid:technicianid})
 } })


}}



/* TFAILED GET*/
 
 exports.tfailed = (req,res)=>{ 
 	
if(!req.session.technicianuser){
res.status(500).send()
 }else{ 
console.log("tfailed Get working")
var sql = "select customertable.customerid,customertable.customerfname,customertable.customerlname,customertable.customercontact,customeremail.email,customertable.datecreated,devicetable.deviceid,devicetable.technicianid,devicetable.devicename,devicetable.warrant,devicestatus.devicestatus, customertable.customercomment, deviceimei.imei , deviceserialnumber.serialnumber, devicetotalcharge.devicetotalcharge from customertable inner join devicetable on customertable.customerid = devicetable.customerid inner join devicestatus on devicetable.deviceid = devicestatus.deviceid left join customeremail on customeremail.customerid = customertable.customerid  left join deviceimei on devicetable.deviceid = deviceimei.deviceid left join deviceserialnumber on devicetable.deviceid = deviceserialnumber.deviceid inner join devicetotalcharge on devicetotalcharge.deviceid = devicetable.deviceid where customertable.technicianid = ? and devicestatus.devicestatus = ? order by customertable.datecreated DESC"
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

var sql = "select customertable.customerid,customertable.customerfname,customertable.customerlname,customertable.customercontact,customeremail.email,customertable.datecreated,devicetable.deviceid,devicetable.technicianid,devicetable.devicename,devicetable.warrant,devicestatus.devicestatus, customertable.customercomment, deviceimei.imei , deviceserialnumber.serialnumber, devicetotalcharge.devicetotalcharge from customertable inner join devicetable on customertable.customerid = devicetable.customerid inner join devicestatus on devicetable.deviceid = devicestatus.deviceid left join customeremail on customeremail.customerid = customertable.customerid  left join deviceimei on devicetable.deviceid = deviceimei.deviceid left join deviceserialnumber on devicetable.deviceid = deviceserialnumber.deviceid inner join devicetotalcharge on devicetotalcharge.deviceid = devicetable.deviceid where customertable.technicianid = ? and devicestatus.devicestatus = ? order by customertable.datecreated DESC"
var technicianid = req.session.technicianuser
var devicestatus = "readydevice"
connection.query(sql,[technicianid,devicestatus],(err,rows)=>{
if(err){ console.log("failed to query database")}
else{
 res.render('technicianpages/tready',{rows : rows, sessionid:technicianid})
 } })


}}
 
 
 /* Tpending post updating device fate */
 
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

var sql = "select customertable.customerid,customertable.customerfname,customertable.customerlname,customertable.customercontact,customeremail.email,customertable.datecreated,devicetable.deviceid,devicetable.technicianid,devicetable.devicename,devicetable.warrant,devicestatus.devicestatus, customertable.customercomment, deviceimei.imei , deviceserialnumber.serialnumber, devicetotalcharge.devicetotalcharge from customertable inner join devicetable on customertable.customerid = devicetable.customerid inner join devicestatus on devicetable.deviceid = devicestatus.deviceid left join customeremail on customeremail.customerid = customertable.customerid  left join deviceimei on devicetable.deviceid = deviceimei.deviceid left join deviceserialnumber on devicetable.deviceid = deviceserialnumber.deviceid inner join devicetotalcharge on devicetotalcharge.deviceid = devicetable.deviceid where customertable.technicianid = ? and devicestatus.devicestatus = ? order by customertable.datecreated DESC"
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

var sql = "select customertable.customerid,customertable.customerfname,customertable.customerlname,customertable.customercontact,customeremail.email,customertable.datecreated,devicetable.deviceid,devicetable.technicianid,devicetable.devicename,devicetable.warrant,devicestatus.devicestatus, customertable.customercomment, deviceimei.imei , deviceserialnumber.serialnumber, devicetotalcharge.devicetotalcharge from customertable inner join devicetable on customertable.customerid = devicetable.customerid inner join devicestatus on devicetable.deviceid = devicestatus.deviceid left join customeremail on customeremail.customerid = customertable.customerid  left join deviceimei on devicetable.deviceid = deviceimei.deviceid left join deviceserialnumber on devicetable.deviceid = deviceserialnumber.deviceid inner join devicetotalcharge on devicetotalcharge.deviceid = devicetable.deviceid where customertable.technicianid = ? and devicestatus.devicestatus = ? order by customertable.datecreated DESC"
var technicianid = req.session.technicianuser
var devicestatus = "pendingdevice"
connection.query(sql,[technicianid,devicestatus],(err,rows)=>{
if(err){ console.log("failed to query database")}
else{
 res.render('technicianpages/tpending',{rows : rows, sessionid:technicianid, message : "succesfully finished determining : "+devicename+" 's fate to failed"  })
 } })


 }
})

}}
  
/* technician logout */

exports.tlogout = (req,res)=>{
  if(!req.session.technicianuser){
res.redirect("/")
 // res.status(500).send("someone is trying to hack us")
   
  }else{
    
var sql = "update technicians set status ='offline' where technicianid= ?"
   connection.query(sql,[req.session.technicianuser],(err)=>{
     if(err){ 
       console.log("failed to update technician status logout")
       console.log(err.message)
     }else{ 
    
 req.session.destroy(
    function(err){
      if(err){
      console.log("failed to log out")
      res.send('error')
    }else{
      res.redirect("/")
       } })
   } })} }
      
      
      
      
/* supervisor search */

exports.supervisorsearch = (req,res)=>{ 
if(!req.session.supervisoruser){
res.status(500).send()
 }else{ 
var search = req.body.search
//console.log(search)
var sql = "select customertable.customercomment,customertable.datecreated, devicetable.devicename, technicians.technicianfname, technicians.technicianlname, technicians.technicianemail,technicians.techniciannumber from customertable inner join devicetable on customertable.customerid = devicetable.customerid inner join technicians on devicetable.technicianid = technicians.technicianid where devicetable.devicename like ? or customertable.customercomment like ? or technicians.technicianfname like ? or technicians.technicianlname like ? or technicians.technicianemail like ? order by customertable.datecreated desc"
connection.query(sql,["%" + search + "%","%" + search + "%","%" + search + "%","%" + search + "%","%" + search + "%"],(err,rows)=>{
if(err){ console.log("failed to query database supervisors")
  console.log(err.message)
}
else{
	//console.log(rows)
res.render('supervisorpages/supervisor',{rows : rows, message:"hear are you search result" })
 }
 })
}}


/* supervisor logout */

exports.slogout = (req,res)=>{
  if(!req.session.supervisoruser){
res.redirect("/")
 // res.status(500).send("someone is trying to hack us")
   
  }else{
    
var sql = "update supervisor set supervisorstatus ='offline' where supervisorid= ?"
   connection.query(sql,[req.session.supervisoruser],(err)=>{
     if(err){ 
  console.log("failed to update supervisor status logout")
       console.log(err.message)
     }else{ 
    
 req.session.destroy(
    function(err){
      if(err){
      console.log("failed to log out")
      res.send('error')
    }else{
      res.redirect("/")
       } })
   } })} }
      
      
      /* supervisor home get */
      
exports.supervisorhome= (req,res)=>{ 
 	
if(!req.session.supervisoruser){
res.status(500).send()
 }else{ 

var sql = "select customertable.customercomment,customertable.datecreated, devicetable.devicename, technicians.technicianfname, technicians.technicianlname, technicians.technicianemail,technicians.techniciannumber from customertable inner join devicetable on customertable.customerid = devicetable.customerid inner join technicians on devicetable.technicianid = technicians.technicianid  order by customertable.datecreated desc"

connection.query(sql,(err,rows)=>{
if(err){ console.log("failed to query database supervisor home")}
else{
 res.render('supervisorpages/supervisor',{rows : rows, message:"supervisor home" })
  } })
;}}



/* thome search */






var searchf = (res,sql,technicianid,devicestatus,search,renderpage)=>{ 
  
  if(!technicianid){
res.status(500).send()
 }else{ 
console.log("started my query")


connection.query(sql,[technicianid,devicestatus, "%"+search+"%", "%"+search+"%", "%"+search+"%", "%"+search+"%", "%"+search+"%"
,"%"+search+"%", "%"+search+"%"],(err,rows)=>{
if(err){ console.log("failed to query database")}
else{
 // console.log('succesfully queried database below are my rows')
  
res.render(renderpage, {rows : rows,sessionid:technicianid, message:"here are your search results" })
 }
 })
}}
 
/*sessionid:technicianid, message:"here are your search results*/
  

/* thome search */
exports.thomesearch= (req,res)=>{ 

var renderpage = "technicianpages/technicianhome"


var search = req.body.search
var devicestatus = "virgindevice"
var technicianid = req.session.technicianuser



var sql = "select customertable.customerid,customertable.customerfname,customertable.customerlname,customertable.customercontact,customeremail.email,customertable.datecreated,devicetable.deviceid,devicetable.technicianid,devicetable.devicename,devicetable.warrant,devicestatus.devicestatus, customertable.customercomment ,deviceimei.imei , deviceserialnumber.serialnumber from customertable inner join devicetable on customertable.customerid = devicetable.customerid inner join devicestatus on devicetable.deviceid = devicestatus.deviceid left join customeremail on customeremail.customerid = customertable.customerid left join deviceimei on devicetable.deviceid = deviceimei.deviceid left join deviceserialnumber on devicetable.deviceid = deviceserialnumber.deviceid where customertable.technicianid = ? and devicestatus.devicestatus = ?  and (customertable.customerfname like ? or customertable.customerlname like ? or customertable.customercontact like ? or customeremail.email like ? or devicetable.devicename like ? or deviceimei.imei like ? or deviceserialnumber.serialnumber like ?) order by customertable.datecreated desc"

searchf(res,sql,technicianid,devicestatus,search,renderpage)
  
}








/* tpending search */

exports.tpendingsearch= (req,res)=>{ 

var renderpage = "technicianpages/tpending"


var search = req.body.search
var devicestatus = "pendingdevice"
var technicianid = req.session.technicianuser


var sql = "select customertable.customerid,customertable.customerfname,customertable.customerlname,customertable.customercontact,customeremail.email,customertable.datecreated,devicetable.deviceid,devicetable.technicianid,devicetable.devicename,devicetable.warrant,devicestatus.devicestatus, customertable.customercomment ,deviceimei.imei , deviceserialnumber.serialnumber from customertable inner join devicetable on customertable.customerid = devicetable.customerid inner join devicestatus on devicetable.deviceid = devicestatus.deviceid left join customeremail on customeremail.customerid = customertable.customerid left join deviceimei on devicetable.deviceid = deviceimei.deviceid left join deviceserialnumber on devicetable.deviceid = deviceserialnumber.deviceid where customertable.technicianid = ? and devicestatus.devicestatus = ?  and (customertable.customerfname like ? or customertable.customerlname like ? or customertable.customercontact like ? or customeremail.email like ? or devicetable.devicename like ? or deviceimei.imei like ? or deviceserialnumber.serialnumber like ?) order by customertable.datecreated desc"

searchf(res,sql,technicianid,devicestatus,search,renderpage)
  
}
  
  
  /* tready search */

exports.treadysearch= (req,res)=>{ 

var renderpage = "technicianpages/tready"


var search = req.body.search
var devicestatus = "readydevice"
var technicianid = req.session.technicianuser


var sql = "select customertable.customerid,customertable.customerfname,customertable.customerlname,customertable.customercontact,customeremail.email,customertable.datecreated,devicetable.deviceid,devicetable.technicianid,devicetable.devicename,devicetable.warrant,devicestatus.devicestatus, customertable.customercomment ,deviceimei.imei , deviceserialnumber.serialnumber from customertable inner join devicetable on customertable.customerid = devicetable.customerid inner join devicestatus on devicetable.deviceid = devicestatus.deviceid left join customeremail on customeremail.customerid = customertable.customerid left join deviceimei on devicetable.deviceid = deviceimei.deviceid left join deviceserialnumber on devicetable.deviceid = deviceserialnumber.deviceid where customertable.technicianid = ? and devicestatus.devicestatus = ?  and (customertable.customerfname like ? or customertable.customerlname like ? or customertable.customercontact like ? or customeremail.email like ? or devicetable.devicename like ? or deviceimei.imei like ? or deviceserialnumber.serialnumber like ?) order by customertable.datecreated desc"

searchf(res,sql,technicianid,devicestatus,search,renderpage)
  
}


     /* tfailed search */

exports.tfailedsearch= (req,res)=>{ 

var renderpage = "technicianpages/tfailed"


var search = req.body.search
var devicestatus = "faileddevice"
var technicianid = req.session.technicianuser


var sql = "select customertable.customerid,customertable.customerfname,customertable.customerlname,customertable.customercontact,customeremail.email,customertable.datecreated,devicetable.deviceid,devicetable.technicianid,devicetable.devicename,devicetable.warrant,devicestatus.devicestatus, customertable.customercomment ,deviceimei.imei , deviceserialnumber.serialnumber from customertable inner join devicetable on customertable.customerid = devicetable.customerid inner join devicestatus on devicetable.deviceid = devicestatus.deviceid left join customeremail on customeremail.customerid = customertable.customerid left join deviceimei on devicetable.deviceid = deviceimei.deviceid left join deviceserialnumber on devicetable.deviceid = deviceserialnumber.deviceid where customertable.technicianid = ? and devicestatus.devicestatus = ?  and (customertable.customerfname like ? or customertable.customerlname like ? or customertable.customercontact like ? or customeremail.email like ? or devicetable.devicename like ? or deviceimei.imei like ? or deviceserialnumber.serialnumber like ?) order by customertable.datecreated desc"

searchf(res,sql,technicianid,devicestatus,search,renderpage)
  
}



/* tbranch scope get */

exports.tbranchscope = (req,res)=>{ 
 	
if(!req.session.technicianuser){
//res.status(500).send()
res.redirect("/");
 }else{ 
   
   var technicianid = req.session.technicianuser
   
   var sql ="select branchid from technicians where technicianid = ?"
   
connection.query(sql,[technicianid],(err,rows)=>{
  if(err){
    console.log("failed to query database branchscope")
    console.log(err.message)
  }else{

   var branchid = rows[0].branchid

var sql =  "select customertable.customerid,customertable.customerfname,customertable.customerlname,customertable.customercontact,customeremail.email,customertable.datecreated,devicetable.deviceid,devicetable.technicianid,devicetable.devicename,devicetable.warrant,devicestatus.devicestatus, customertable.customercomment, devicetotalcharge.devicetotalcharge , branches.branchname, technicians.technicianfname, technicians.technicianlname, technicians.techniciannumber, technicians.technicianemail, branches.branchid, deviceimei.imei , deviceserialnumber.serialnumber from customertable inner join devicetable on customertable.customerid = devicetable.customerid inner join devicestatus on devicetable.deviceid = devicestatus.deviceid left join customeremail on customeremail.customerid = customertable.customerid left join devicetotalcharge on devicetotalcharge.deviceid = devicetable.deviceid inner join technicians on technicians.technicianid = devicetable.technicianid inner join branches on branches.branchid = technicians.branchid left join deviceimei on devicetable.deviceid = deviceimei.deviceid left join deviceserialnumber on devicetable.deviceid = deviceserialnumber.deviceid where technicians.branchid = ? order by customertable.datecreated desc"

connection.query(sql,[branchid],(err,rows)=>{
if(err){ console.log("failed to query database supervisor home")}
else{
 res.render('technicianpages/branch',{rows : rows, message:"welcome: ", branchid : branchid })
  } })
}   })
}}

/* branch search */

exports.tbranchsearch= (req,res)=>{ 
  
if(!req.session.technicianuser){
res.status(500).send()
 }else{ 
   
var renderpage = "technicianpages/branch"
var search = req.body.search
var branchid = req.body.branchid

   
var sql = "select customertable.customerid,customertable.customerfname,customertable.customerlname,customertable.customercontact,customeremail.email,customertable.datecreated,devicetable.deviceid,devicetable.technicianid,devicetable.devicename,devicetable.warrant,devicestatus.devicestatus, customertable.customercomment, devicetotalcharge.devicetotalcharge , branches.branchname, technicians.technicianfname, technicians.technicianlname, technicians.techniciannumber, technicians.technicianemail, branches.branchid ,deviceimei.imei , deviceserialnumber.serialnumber from customertable inner join devicetable on customertable.customerid = devicetable.customerid inner join devicestatus on devicetable.deviceid = devicestatus.deviceid left join customeremail on customeremail.customerid = customertable.customerid left join devicetotalcharge on devicetotalcharge.deviceid = devicetable.deviceid inner join technicians on technicians.technicianid = devicetable.technicianid inner join branches on branches.branchid = technicians.branchid left join deviceimei on devicetable.deviceid = deviceimei.deviceid left join deviceserialnumber on devicetable.deviceid = deviceserialnumber.deviceid where technicians.branchid = ? and (customertable.customerfname like ? or customertable.customerlname like ? or customertable.customercontact like ? or customeremail.email like ? or  technicians.technicianfname like ? or technicians.technicianlname like ? or technicians.technicianemail like ? or deviceimei.imei like ? or  deviceserialnumber.serialnumber like ? ) order by customertable.datecreated desc"

   
console.log("started my query")
connection.query(sql,[branchid,"%"+search+"%", "%"+search+"%", "%"+search+"%", "%"+search+"%", "%"+search+"%","%"+search+"%","%"+search+"%","%"+search+"%","%"+search+"%"],(err,rows)=>{
if(err){ console.log("failed to query database tbranchessearch")
  console.log(err.message)
}else{
 // console.log('succesfully queried database below are my rows')
res.render(renderpage, {rows : rows, branchid : branchid,message:"here are your search results" })
 }
 })
} }
 


/* view spares */



exports.tviewspares= (req,res)=>{ 
  
console.log("views query start")
  
if(!req.session.technicianuser){
//res.status(500).send()
res.redirect("/")
 }else{ 
console.log("views query start")
var deviceid = req.body.deviceid
var technicianid = req.session.technicianuser
console.log("deviceid and technicianid")
//console.log(deviceid)
//console.log(technicianid)
var sql = "select spares.sparename, usedspares.quantity, usedspares.spareid from usedspares inner join spares on usedspares.spareid = spares.spareid where deviceid = ? and  technicianid = ?"
connection.query(sql,[deviceid,technicianid],(err,rows)=>{
  if(err){
    console.log("failed to query view spares")
    console.log(err.message)
  }else{
    //console.log(rows)
    console.log("finished quering view spares")
    //console.log(rows)
    res.json({rows:rows})
  }
  }) }}
  
  
  
  /* supervisor spares */
  
  exports.supervisorspares = (req,res)=>{ 
if(!req.session.supervisoruser){
res.status(500).send()
 }else{ 
   console.log("supervisor spares working")
   var branchname;
var sql = "select spares.spareid, spares.sparename,sum(usedspares.quantity) as spare_quantity from usedspares inner join spares on usedspares.spareid = spares.spareid group by spares.spareid, spares.sparename order by spare_quantity desc"

connection.query(sql,(err,rows)=>{
if(err){ console.log("failed to query database")}
else{
	//console.log(rows)
	let  sparename = new Array()
	let sparequantity = new Array()
	console.log("finished quering graph db")
	const loop = ()=>{ 
	  return new Promise((resolve,reject)=>{
let x = 0; 
	rows.every(row =>{
	  //console.log(x)
	  if(x==15){
	   return false;
	      }else{
	    resolve(sparename.push(row.sparename) , 
	     sparequantity.push(row.spare_quantity) )
 x++;
  return true;
	      }

	}) }	)}
	
	
	const myrender = async ()=>{
	  await loop()
res.render("supervisorpages/spares",{ rows : rows , branchname:branchname, sparename: JSON.stringify(sparename), sparequantity:JSON.stringify(sparequantity) })
}

myrender()	
	
} })

}}





/* supervisor rank technician */

  exports.ranktechnician = (req,res)=>{ 
if(!req.session.supervisoruser){
res.status(500).send()
 }else{ 
   console.log("supervisor rank technician working")
   var branchname;



var sql = 'select concat(technicians.technicianfname," ",technicians.technicianlname," from ",branches.branchname," branch") as technician , sum(devicetotalcharge.devicetotalcharge) as total_sales from technicians inner join branches on technicians.branchid = branches.branchid inner join devicetable  on devicetable.technicianid = technicians.technicianid inner join devicetotalcharge on devicetotalcharge.deviceid = devicetable.deviceid group by technician order by total_sales desc'

connection.query(sql,(err,rows)=>{
if(err){ console.log("failed to query database")}
else{
	//console.log(rows)
	let  technician = new Array()
	let technician_total_sales = new Array()
	console.log("finished quering rank db")
	const loop = ()=>{ 
	  return new Promise((resolve,reject)=>{
let x = 0; 
	rows.every(row =>{
	  if(x==10){
	    return false;
	      }else{
	    resolve(technician.push(row.technician) , 
	     technician_total_sales.push(row.total_sales) )
        x++;
	        return true;
	      }
	  
	}) }	)}
	
	
	const myrender = async ()=>{
	  await loop()
	 // console.log(technician)
	 // console.log(technician_total_sales)
res.render("supervisorpages/technician",{ rows : rows , branchname:branchname, technician : JSON.stringify(technician), sales:JSON.stringify(technician_total_sales) })
}

myrender()	
	
} })

}}
