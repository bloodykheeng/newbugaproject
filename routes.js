
  const express= require('express')
const router = express.Router()
const controller = require('./controller.js')
const admincontroller = require('./admincontroller.js')

 /* index page */
router.get("/", (req,res)=>{ 
res.render('index')
})
router.get("/adminlogin", (req,res)=>{ 
res.render('adminlogin')
})
router.get("/technicianlogin", (req,res)=>{ 
res.render('technicianlogin')
})
router.get("supervisorlogin", (req,res)=>{ 
res.render('supervisorlogin')
})
/* index page end */
/*admin page */

router.get("/adminpagesspares", admincontroller.adminsparestable)

router.post("/adminsortspares", admincontroller.adminsparessort)

router.get("/outofstock", admincontroller.outofstock)

router.post("/adminupdatequantity", admincontroller.adminupdatequantity)

router.post("/adminupdatequantityoutofstock", admincontroller.adminupdatequantityoutofstock)

router.post("/adminsorttechnicians", admincontroller.admintechnicianssort)

router.post("/removesupervisor", admincontroller.supervisorremove)

router.post("/removespare", admincontroller.spareremove)

router.post("/removespareoutofstock", admincontroller.spareremoveoutofstock)

router.post("/deletetechnician", admincontroller.deletetechnician)

router.post("/adminsortusedspares", admincontroller.sortusedspares)

router.post("/adminsortcustomers", admincontroller.admincustomerssort)
router.get("/admintechnicians", admincontroller.adminpagestechnician)
router.get("/admincustomers", admincontroller.adminpagescustomer)
router.get("/adminsupervisors", admincontroller.adminpagessupervisors)

router.get("/adminhome", admincontroller.adminhome)

router.get("/logout", admincontroller.logout)




/* adminpages folder */


router.get("/adminpagesusedspare", admincontroller.adminusedspare)

router.get("/adminpagestechnicians", admincontroller.adminpagestechnician)

router.get("/adminpagestcreateacc", (req,res)=>{ 
res.render('adminpages/techniciancreateacc')
})


router.get("/adminpagescustomers", admincontroller.adminpagescustomer )
router.get("/adminpagessupervisors", admincontroller.adminpagessupervisors)


router.get("/adminpagesacreateacc",admincontroller.adminpagesacreateacc)

router.get("/adminpagesadminaccounts",admincontroller.adminpagesadminaccounts)

router.get("/adminpagestctoken", admincontroller.adminpagestctoken)

router.get("/uploadspare", (req,res)=>{ 
res.render('adminpages/sparesupload')
})

/*adminpages folder end */


/* admin login page end  */

/* supervisor loginvpagev*/
router.get("/supervisorlogin", (req,res)=>{ 
res.render("supervisorlogin")
})


/* supervisor login page end */

/*technician login page */
router.get("/tlogout", controller.tlogout)

router.get("/technicianhome", controller.technicianhome)

router.get("/tpending", controller.tpending)

router.post("/tpending", controller.tpendingpost)

router.get("/tfailed", controller.tfailed)

router.get("/tready", controller.tready)

router.post("/thomesearch" ,controller.thomesearch)
router.post("/tpendingsearch" ,controller.tpendingsearch)
router.post("/treadysearch" ,controller.treadysearch)
router.post("/tfailedsearch" ,controller.tfailedsearch)

router.get("/technicianbranchscope" ,controller.tbranchscope)

router.post("/tbranchsearch" ,controller.tbranchsearch)

router.post("/technicianviewspares" ,controller.tviewspares)



/* technician login page end */




/*admin login */
router.post("/adminloginpost",admincontroller.adminlogin )

 /*admin create account */

router.post("/admincacc",admincontroller.admincacc )


router.post("/tcacc", controller.tcacc)

router.get("/techniciancreateacc", (req,res)=>{ 
res.render('technicianpages/techniciancreateacc')
})


router.post("/technicianlogin", controller.technicianlogin)

router.post("/customercacc", controller.customercacc)
  
router.get("/customercreateacc", (req,res)=>{ 
res.render('technicianpages/customerlogin')
})

router.post("/supervisor", controller.supervisorlogin)

router.get("/adminpagessupervisorcacc", (req,res)=>{ 
res.render('adminpages/supervisorcreateacc')
})

router.post("/supervisorcacc", admincontroller.supervisorcacc)

router.post("/techniciancreatetoken",admincontroller.tctoken)

router.post("/uploadspare",admincontroller.uploadspare)

router.post("/adminpagessearchspare",admincontroller.adminsearchspare)

router.post("/technicianaddspare",controller.technicianaddspare)

router.post("/technicianspares",controller.technicianspares)



/* supervisor routes */

router.post("/supervisorsearch",controller.supervisorsearch)

router.get("/supervisorlogout",controller.slogout)

router.get("/supervisorhome",controller.supervisorhome )



module.exports= router
      