var bcrypt = require('bcryptjs');
  const mysql = require('mysql2');
const { v4 : uuidv4} = require("uuid")
  const connection = mysql.createConnection({
    /*
  host : "localhost",
  user     : "root",
  password : "",
  database : "bugatech"
  
   
host : "172.30.72.177"
*/

  host: "172.30.228.222",
  user     : "root",
  password : "123",
  database : "bugatech"

  })


 /* admin login */
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
  
  console.log("failed to query the database")
  console.log(err.message)
  }else{
  	console.log(rows.length)
if(rows.length !== 1){
  console.log("wrong passord or username")
res.render('adminlogin',{ message :' try again with a correct username or password'})
 }else{
 
  //Load hash from your password DB.
var compare = bcrypt.compare(password, rows[0].adminpassword)
    // res === true
   // console.log(rows[0].adminpassword)
    async function comparepassword (compare){
    var pcompare = await compare
   // console.log(pcompare)
	if(pcompare == true){ 
 req.session.adminuser = rows[0].adminid
var myrows = rows
 if(req.session.adminuser){
   
   var sql = "update admins set adminstatus ='online' where adminid = ?"
   connection.query(sql,[rows[0].adminid],(err,rows)=>{ 
     if(err){
       console.log("failed to update admin status")
       console.log(err.message)
     }else{
//console.log(" the session id is "+ req.session.adminuser )
 res.render('admin',{rows:myrows })
     } })
  
 }else{ 
    
sql = "update admins set adminstatus ='offline' where adminid = ?"
   
connection.query(sql,[rows[0].adminid],(err,rows)=>{ 
     if(err){
       console.log("failed to update admin status")
       console.log(err.messag) }
   })
    
  }
}else{ 
	res.render('adminlogin',{ message :' try again with a correct password'})
	
	//console.log('password missmatch')
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
   var sql="insert into admins(adminid,adminusername,adminpassword,datecreated) values(?,?,?,now())"
   
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
 
 
 
 
 
 /*admins create acc get */

exports.adminpagesacreateacc = (req,res)=>{ 
if(!req.session.adminuser){
res.status(500).send()
 }else{ 

	//console.log(rows)
res.render('adminpages/admincreateacc')
}}



/* admin accounts get */

exports.adminpagesadminaccounts = (req,res)=>{ 
if(!req.session.adminuser){
res.status(500).send()
 }else{ 
var sql="select * from admins"
	//console.log(rows)
	connection.query(sql,(err,rows)=>{
	  if(err){
	    console.log(err.message)
	    console.log("failed to query admins")
	  }else{
	    
res.render('adminpages/adminaccounts',{rows:rows})
	  }	})
}}
 
 
 
 
   // SUPERVISOR CREATE ACCOUNT
  
  exports.supervisorcacc =  async (req,res)=>{
  try{
 var firstname= req.body.firstname
 var lastname = req.body.lastname
var username = req.body.username
var password = req.body.password
var cpassword = req.body.cpassword
var id = uuidv4()
if(!firstname || !lastname || !username || !password || !cpassword){
	res.render('adminpages/supervisorcreateacc',{message:'please u shouldnt  leave any of the inputs empty' })
}else {
	if( password !== cpassword){ 
res.render('adminpages/supervisorcreateacc',{message:'please you dint confirm your password well' })
 }else{


var sql="select * from supervisor where supervisorusername = ?"
connection.query(sql, [username] , (err, rows)=>{
	//connection.end()
if(err){
  console.log(error.message)
  console.log("failed to query the database")
  }else{
if(rows.length === 0){

   var sql="insert into supervisor(supervisorid,supervisorfname,supervisorlname,supervisorusername,supervisorpassword,datecreated) values(?,?,?,?,?,now())"
   
connection.query(sql,[id,firstname,lastname,username,password] , (err, rows)=>{
if(err){
  console.log( err.message)
  console.log("failed to query the database")
  }else{ 
res.render('adminpages/supervisorcreateacc',{message:"supervisor "+username+" has been succesfully created" })

}}) 
}else{
res.render('adminpages/supervisorcreateacc',{message:"The username : "+username+" has already been taken" })

 } }
}) 

}} 
 
}catch(err){ console.log(err.message) }
 } 






 /*admin pages create token get*/
 exports.adminpagestctoken = (req,res)=>{ 
if(!req.session.adminuser){
res.status(500).send()
 }else{ 
 	
 var sql="select technicianentrycode.datecreated , technicianentrycode.entrycode , technicians.technicianfname, technicians.technicianlname, branches.branchname from technicianentrycode left join technicians on technicianentrycode.technicianid = technicians.technicianid left join branches on branches.branchid = technicians.branchid"
connection.query(sql, (err, rows)=>{
	//connection.end()
if(err){
  console.log(error.message)
  console.log("failed to query the database")
  }else{
  
  res.render('adminpages/technicianentrycode',{message:"TOKENS",rows:rows })
  
  } })

}
}




 /*technician create token */
 
 exports.tctoken =  async (req,res)=>{
  try{
 var token= req.body.token
 var id = uuidv4()
if(!token){
	res.render('adminpages/technicianentrycode',{message:'please u shouldnt  leave any of the inputs empty' })
 }else{
var sql="select * from technicianentrycode where entrycode = ?"
connection.query(sql, [token] , (err, rows)=>{
	//connection.end()
if(err){
  console.log(error.message)
  console.log("failed to query the database")
  }else{
if(rows.length === 0){

   var sql="insert into technicianentrycode(entrycodeid,entrycode,datecreated) values(?,?,now())"
   
connection.query(sql, [id,token] , (err, rows)=>{
if(err){
  console.log( err.message)
  console.log("failed to query the database")
  }else{ 
  	
  var sql="select technicianentrycode.datecreated , technicianentrycode.entrycode  ,  technicians.technicianfname, technicians.technicianlname from technicianentrycode left join technicians on technicianentrycode.technicianid = technicians.technicianid  "
connection.query(sql, (err, rows)=>{
	//connection.end()
if(err){
  console.log(error.message)
  console.log("failed to query the database")
  }else{
  
  res.render('adminpages/technicianentrycode',{message:" TOKEN "+token+" has been succesfully created",rows:rows })
  
  } })
  	
}}) 
}else{
res.render('adminpages/technicianentrycode',{message:"The token : "+token+" already exists" })

 } }
}) 
}}catch(err){ console.log(err.message) }
 } 


  /*upload spares */
  
  exports.uploadspare =  async (req,res)=>{
  try{
 var sparename= req.body.sparename
 var spareamount= req.body.spareamount
 var sparetax= req.body.sparetax
 var spareprice= req.body.spareprice
 var branchid = req.body.branchid
var spareid = uuidv4()
 
 
if(!sparename || !spareamount || !sparetax){
	res.render('adminpages/sparesupload',{message:'please u shouldnt  leave any of the inputs empty' })
 }else{
 	var sparetax = sparetax.replace(/\s+/g,"")
 if( ((/^[0-9.]+$/).test(sparetax)) == false){ 
console.log("use a decimal numbers or whole numbers  please ")
res.render('adminpages/sparesupload',{message:"use  decimal and whole numbers only for tax please eg (0 or 0.0 )" })
}else{
 var sparetax = parseFloat(sparetax)
 var spareprice = parseInt(spareprice)
 var spareamount = parseInt(spareamount)
 
 console.log("sparetotal down")
 var sparetotal = ((sparetax) * (spareprice)) + (spareprice)
 console.log(sparetotal)
 
var sql="select * from spares where sparename = ? and branchid = ?"
connection.query(sql, [sparename,branchid] , (err, rows)=>{
	//connection.end()
if(err){
  console.log(error.message)
  console.log("failed to query the database")
  }else{
if(rows.length === 0){

   var sql="insert into spares(spareid,sparename,spareamount,sparetax,spareprice,totalcharge,datecreated,branchid) values(?,?,?,?,?,?,now(),?)"
   
connection.query(sql, [spareid,sparename,spareamount,sparetax,spareprice,sparetotal,branchid] , (err, rows)=>{
if(err){
  console.log( err.message)
  console.log("failed to query the database")
  }else{ 
res.render('adminpages/sparesupload',{message:" spare: "+sparename+" has been succesfully created" })

}}) 
}else{
res.render('adminpages/sparesupload',{message:"The spare : "+sparename+" already exists" })

 } }
}) 

}
 }
}catch(err){ console.log(err.message) }
 } 
 
 
 /*admin spares table*/
 
 exports.adminsparestable = (req,res)=>{ 
if(!req.session.adminuser){
res.status(500).send()
 }else{ 
   var branchname;
var sql = "select * from spares inner join branches on spares.branchid = branches.branchid order by spares.sparename"
connection.query(sql,(err,rows)=>{
if(err){ console.log("failed to query database")}
else{
	//console.log(rows)
res.render('adminpages/spares',{rows : rows, branchname : branchname })
 }

 })
}}


/* out of stock spares get */

exports.outofstock = (req,res)=>{ 
if(!req.session.adminuser){
res.status(500).send()
 }else{ 
   var branchname;
var sql = "select * from spares inner join branches on spares.branchid = branches.branchid where spares.spareamount < 1 order by spares.sparename"
connection.query(sql,(err,rows)=>{
if(err){ console.log("failed to query database")}
else{
	//console.log(rows)
res.render('adminpages/outofstock',{rows : rows, branchname : branchname })
 }
})
}}





/* Admin pages spares sort*/

exports.adminsparessort = (req,res)=>{ 
if(!req.session.adminuser){
res.status(500).send()
 }else{ 
 var branchid = req.body.branchid
 var sql = "select * from branches where branchid = ?"
 connection.query(sql,[branchid],(err,rows)=>{
 	if(err){
 	console.log("failed to query database")
 console.log(err.message)
 }else{
 	var branchname = rows[0].branchname
var sql = "select * from spares inner join branches on spares.branchid = branches.branchid where branches.branchid = ?"
connection.query(sql,[branchid],(err,rows)=>{
if(err){ console.log("failed to query database")}
else{
	//console.log(rows)
res.render('adminpages/spares',{rows : rows , branchname:branchname })
 }

 })
 } })
}
}





 
 
/*     ADMIN SEARCH SPARE*/
 
 exports.adminsearchspare = (req,res)=>{ 
if(!req.session.adminuser){
res.status(500).send()
 }else{ 
var search = req.body.searchspare

var sql = "select * from spares where sparename like ?"
connection.query(sql,["%" + search + "%"],(err,rows)=>{
if(err){ console.log("failed to query database")}
else{
	//console.log(rows)
res.render('adminpages/search',{rows : rows })
 }
 })
}}
 
  /* Admin Used Spare */
  
  exports.adminusedspare = (req,res)=>{ 
if(!req.session.adminuser){
res.status(500).send()
 }else{ 
   var branchname;
var sql = "select spares.spareid, spares.sparename, devicetable.devicename, customertable.customerfname, customertable.customerlname, technicians.technicianfname, technicians.technicianlname, usedspares.datecreated, branches.branchname,usedspares.quantity from usedspares inner join spares on usedspares.spareid = spares.spareid inner join devicetable on usedspares.deviceid = devicetable.deviceid inner join customertable on usedspares.customerid = customertable.customerid inner join technicians on usedspares.technicianid = technicians.technicianid inner join branches on technicians.branchid = branches.branchid "
connection.query(sql,(err,rows)=>{
if(err){ console.log("failed to query database")}
else{
	//console.log(rows)
res.render("adminpages/usedspares",{ rows : rows , branchname:branchname })
 }

 })

}

}

/*admin sort used spares */
exports.sortusedspares = (req,res)=>{ 
if(!req.session.adminuser){
res.status(500).send()
 }else{ 
 var branchid = req.body.branchid
 var sql = "select * from branches where branchid = ?"
 connection.query(sql,[branchid],(err,rows)=>{
 	if(err){
 	console.log("failed to query database")
 console.log(err.message)
 }else{
 	var branchname = rows[0].branchname
// var sql ="select customertable.customerid,customertable.customerfname,customertable.customerlname,customertable.customercontact,customeremail.email,customertable.datecreated,devicetable.deviceid,devicetable.technicianid,devicetable.devicename,devicetable.warrant, technicians.branchid , branches.branchname from customertable inner join devicetable on customertable.customerid = devicetable.customerid left join customeremail on customeremail.customerid = customertable.customerid inner join technicians on customertable.technicianid = technicians.technicianid inner join branches on technicians.branchid = branches.branchid  where technicians.branchid = ? "
 var sql = "select spares.spareid,spares.sparename, devicetable.devicename, customertable.customerfname, customertable.customerlname, technicians.technicianfname, technicians.technicianlname, usedspares.datecreated, branches.branchname, usedspares.quantity from usedspares inner join spares on usedspares.spareid = spares.spareid inner join devicetable on usedspares.deviceid = devicetable.deviceid inner join customertable on usedspares.customerid = customertable.customerid inner join technicians on usedspares.technicianid = technicians.technicianid inner join branches on technicians.branchid = branches.branchid   where technicians.branchid = ?"

connection.query(sql,[branchid],(err,rows)=>{
if(err){ console.log("failed to query database")}
else{
	//console.log(rows)
res.render('adminpages/usedspares',{rows : rows, branchname:branchname  })
 }
 })
 } })
}
}




 
  
    /*admin home get */
 exports.adminhome= (req,res)=>{ 
if(!req.session.adminuser){
res.status(500).send()
 }else{
 	console.log("session")
 console.log(req.session.adminuser)
var sql = "select * from admins where adminid =  ?"
connection.query(sql,[req.session.adminuser],(err,rows)=>{
if(err){
 console.log("failed to query database")
console.log(err.message)}
else{
	//console.log(rows)
res.render('admin',{rows : rows })
 }
 })
}}
  
  
  
  
  /*admin pages technician table*/
 exports.adminpagestechnician= (req,res)=>{ 
if(!req.session.adminuser){
res.status(500).send()
 }else{ 
   var branchname;
var sql = "select * from technicians inner join branches on technicians.branchid = branches.branchid"
connection.query(sql,(err,rows)=>{
if(err){ console.log("failed to query database")}
else{
	//console.log(rows)
res.render('adminpages/technician',{rows : rows, branchname:branchname })
 }
 })
}}

/* admin technicians sort */
exports.admintechnicianssort = (req,res)=>{ 
if(!req.session.adminuser){
res.status(500).send()
 }else{ 
 var branchid = req.body.branchid
 var sql = "select * from branches where branchid = ?"
 connection.query(sql,[branchid],(err,rows)=>{
 	if(err){
 	console.log("failed to query database")
 console.log(err.message)
 }else{
 	var branchname = rows[0].branchname
 var sql = "select * from technicians inner join branches on technicians.branchid = branches.branchid  where technicians.branchid = ?"
connection.query(sql,[branchid],(err,rows)=>{
if(err){ console.log("failed to query database")}
else{
	//console.log(rows)
res.render('adminpages/technician',{rows : rows, branchname:branchname  })
 }

 })
 } })
}
}



  
/* admin pages customer tables */

exports.adminpagescustomer= (req,res)=>{ 
if(!req.session.adminuser){
res.status(500).send()
 }else{ 
   var branchname;
   
var sql = "select customertable.customerid,customertable.customerfname,customertable.customerlname,customertable.customercontact,customeremail.email,customertable.datecreated,devicetable.deviceid,devicetable.technicianid,devicetable.devicename,technicians.technicianfname,technicians.technicianlname,devicetable.warrant,devicestatus.devicestatus, customertable.customercomment, deviceimei.imei , deviceserialnumber.serialnumber,technicians.branchid , branches.branchname from customertable inner join devicetable on customertable.customerid = devicetable.customerid inner join devicestatus on devicetable.deviceid = devicestatus.deviceid left join customeremail on customeremail.customerid = customertable.customerid  left join deviceimei on devicetable.deviceid = deviceimei.deviceid left join deviceserialnumber on devicetable.deviceid = deviceserialnumber.deviceid inner join technicians on technicians.technicianid = customertable.technicianid inner join branches on technicians.branchid = branches.branchid  order by customertable.datecreated DESC"
   

connection.query(sql,(err,rows)=>{
if(err){ console.log("failed to query database")}
else{
	//console.log(rows)
res.render('adminpages/customer',{rows : rows, branchname:branchname })
 }
 })
}}
 
 /*admin sort customers */
exports.admincustomerssort = (req,res)=>{ 
if(!req.session.adminuser){
res.status(500).send()
 }else{ 
 var branchid = req.body.branchid
 var sql = "select * from branches where branchid = ?"
 connection.query(sql,[branchid],(err,rows)=>{
 	if(err){
 	console.log("failed to query database")
 console.log(err.message)
 }else{
 	var branchname = rows[0].branchname


var sql ="select customertable.customerid,customertable.customerfname,customertable.customerlname,customertable.customercontact,customeremail.email,customertable.datecreated,devicetable.deviceid,devicetable.technicianid,devicetable.devicename,technicians.technicianfname,technicians.technicianlname,devicetable.warrant,devicestatus.devicestatus, customertable.customercomment, deviceimei.imei , deviceserialnumber.serialnumber ,technicians.branchid , branches.branchname from customertable inner join devicetable on customertable.customerid = devicetable.customerid inner join devicestatus on devicetable.deviceid = devicestatus.deviceid left join customeremail on customeremail.customerid = customertable.customerid  left join deviceimei on devicetable.deviceid = deviceimei.deviceid left join deviceserialnumber on devicetable.deviceid = deviceserialnumber.deviceid inner join technicians on technicians.technicianid = customertable.technicianid inner join branches on technicians.branchid = branches.branchid          where technicians.branchid = ? order by customertable.datecreated DESC"
connection.query(sql,[branchid],(err,rows)=>{
if(err){ console.log("failed to query database")}
else{
	//console.log(rows)
res.render('adminpages/customer',{rows : rows, branchname:branchname  })
 }
 })
 } })
}
}



 
 /* admin pages supervisor tables */

exports.adminpagessupervisors= (req,res)=>{ 
if(!req.session.adminuser){
res.status(500).send()
 }else{ 
var sql = "select * from supervisor"
connection.query(sql,(err,rows)=>{
if(err){ console.log("failed to query database")}
else{
	//console.log(rows)
res.render('adminpages/supervisors',{rows : rows })
 }
 })
}}
 
 
 /* delete supervisor */
 
 exports.supervisorremove= (req,res)=>{ 
if(!req.session.adminuser){
res.status(500).send()
 }else{ 
 	var  username  = req.body.username
 	var supervisorid = req.body.supervisorid
 console.log(supervisorid)
var sql = "delete from supervisor where supervisorid = ?"
connection.query(sql,[supervisorid],(err,rows)=>{
if(err){ console.log("failed to query database")}
else{
	console.log("first query done")
var sql = "select * from supervisor"
connection.query(sql,(err,rows)=>{
if(err){ console.log("failed to query database")}
else{
	//console.log(rows)
res.render('adminpages/supervisors',{rows : rows, message:" supervisor "+username+" has been deleted"})
 }
 })

 }
 })
}}
 
 
 
 /*log out */
 
 
exports.logout = (req,res)=>{
  if(!req.session.technicianuser){
  res.redirect("/")
    //res.status(500).send("someone is trying tohack us")
    
  }else{
    
sql = "update admins set adminstatus ='offline' where adminid = ?"
   
connection.query(sql,[req.session.adminuser],(err,rows)=>{ 
     if(err){
       console.log("failed to update admin status")
       console.log(err.messag) }
       else{ 
req.session.destroy(
    function(err){
      if(err){
      console.log("failed to log out")
      res.send('error')
     }else{
      res.redirect("/")
       } })
      } })
    }}
   
   
   
   
   
   /* quantity update*/
   exports.adminupdatequantity = (req,res)=>{
  if(!req.session.adminuser){
res.status(500).send()
 }else{ 
   var quantity = req.body.quantity
   var spareid = req.body.spareid
   
var sql = "update spares set spareamount = ? where spareid = ?"
connection.query(sql,[quantity,spareid],(err,rows)=>{
if(err){ console.log("failed to query database quantity update")}
else{
	//console.log(rows)
	var branchname;
var sql = "select * from spares inner join branches on spares.branchid = branches.branchid order by spares.sparename"
connection.query(sql,(err,rows)=>{
if(err){ console.log("failed to query database")}
else{
	
res.render('adminpages/spares',{rows : rows,message:"quantity updated" , branchname : branchname })
 } })
  
}
})}
}
/* out of stock update */

exports.adminupdatequantityoutofstock = (req,res)=>{
  if(!req.session.adminuser){
res.status(500).send()
 }else{ 
   var quantity = req.body.quantity
   var spareid = req.body.spareid
   
var sql = "update spares set spareamount = ? where spareid = ?"
connection.query(sql,[quantity,spareid],(err,rows)=>{
if(err){ console.log("failed to query database quantity update")}
else{
	//console.log(rows)
	
var sql = "select * from spares inner join branches on spares.branchid = branches.branchid where spares.spareamount < 1 order by spares.sparename"
connection.query(sql,(err,rows)=>{
if(err){ console.log("failed to query database")}
else{
	
res.render('adminpages/outofstock',{rows : rows,message:"quantity updated" })
 } })
  
}
})}
}




/* delete spare */

exports.spareremove= (req,res)=>{ 
if(!req.session.adminuser){
res.status(500).send()
 }else{ 
 	var spareid = req.body.spareid
 	
var sql = "delete from spares where spareid = ?"
connection.query(sql,[spareid],(err,rows)=>{
if(err){ console.log("failed to query database delete spare")}
else{

var sql = "select * from spares inner join branches on spares.branchid = branches.branchid order by spares.sparename"
connection.query(sql,(err,rows)=>{
if(err){ console.log("failed to query database")}
else{
	
res.render('adminpages/spares',{rows : rows,message:"spare deleted succesfully" })
 } })
}
 })
}}
 
 
 
 /* out of stock delete */
 
exports.spareremoveoutofstock= (req,res)=>{ 
if(!req.session.adminuser){
res.status(500).send()
 }else{ 
 	var spareid = req.body.spareid
 	
var sql = "delete from spares where spareid = ?"
connection.query(sql,[spareid],(err,rows)=>{
if(err){ console.log("failed to query database delete spare")}
else{

var sql = "select * from spares inner join branches on spares.branchid = branches.branchid order by spares.sparename"
connection.query(sql,(err,rows)=>{
if(err){ console.log("failed to query database")}
else{
	
res.render('adminpages/outofstock',{rows : rows,message:"spare deleted succesfully" })
 } })
}
 })
}}
 
 
 
 
 
 
 /* delete technician */
 
exports.deletetechnician = (req,res)=>{ 
if(!req.session.adminuser){
res.status(500).send()
 }else{ 
var technicianid = req.body.technicianid
 	
var sql = "delete from technicians where technicianid = ?"
connection.query(sql,[technicianid],(err,rows)=>{
if(err){ console.log("failed to query database  technician")}
else{

var sql = "select * from technicians inner join branches on technicians.branchid = branches.branchid"
connection.query(sql,(err,rows)=>{
if(err){ console.log("failed to query database")}
else{
	//console.log(rows)
res.render('adminpages/technician',{rows : rows,message:"technician deleted" })
 }
 })
}
 })
}}
 