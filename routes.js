
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

router.get("/adminspares", admincontroller.adminsparestable)
router.post("/adminsortspares", admincontroller.adminsparessort)
router.post("/adminsorttechnicians", admincontroller.admintechnicianssort)
router.post("/removesupervisor", admincontroller.supervisorremove)
router.post("/adminsortusedspares", admincontroller.sortusedspares)

router.post("/adminsortcustomers", admincontroller.admincustomerssort)
router.get("/admintechnicians", admincontroller.adminpagestechnician)
router.get("/admincustomers", admincontroller.adminpagescustomer)
router.get("/adminsupervisors", admincontroller.adminpagessupervisors)

router.get("/adminhome", admincontroller.adminhome)






/* adminpages folder */

router.get("/adminpagesspares", admincontroller.adminsparestable)
router.get("/adminpagesusedspare", admincontroller.adminusedspare)

router.get("/adminpagestechnicians", admincontroller.adminpagestechnician)

router.get("/adminpagestcreateacc", (req,res)=>{ 
res.render('adminpages/techniciancreateacc')
})


router.get("/adminpagescustomers", admincontroller.adminpagescustomer )
router.get("/adminpagessupervisors", admincontroller.adminpagessupervisors)


router.get("/adminpagesacreateacc", (req,res)=>{ 
res.render('adminpages/admincreateacc')
})

router.get("/adminpagestctoken", admincontroller.adminpagestctoken)

router.get("/uploadspare", (req,res)=>{ 
res.render('adminpages/sparesupload')
})

/*adminpages folder end */

/* admin login page */
router.get("/admin", (req,res)=>{ 
res.render("admin")
})
/* admin login page end  */

/* supervisor loginvpagev*/
router.get("/supervisorlogin", (req,res)=>{ 
res.render("supervisorlogin")
})
router.get("/supervisor", (req,res)=>{ 
res.render("supervisorpages/supervisor")
})

/* supervisor login page end */

/*technician login page */
router.get("/technicianhome", controller.technicianhome)

router.get("/tpending", controller.tpending)

router.post("/tpending", controller.tpendingpost)

router.get("/tfailed", controller.tfailed)

router.get("/tready", controller.tready)

router.get("/tfailed", (req,res)=>{ 
res.render("technicianpages/tfailed")
})

router.get("/tready", (req,res)=>{ 
res.render("technicianpages/tready")
})

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

module.exports= router
      