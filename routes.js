const express= require('express')
const router = express.Router()
const controller = require('./controller.js')


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

router.get("/adminspares", (req,res)=>{ 
res.render('adminpages/spares')
})
router.get("/admintechnicians", (req,res)=>{ 
res.render('adminpages/technician')
})
router.get("/admincustomers", (req,res)=>{ 
res.render('adminpages/customer')
})
router.get("/adminsupervisors", (req,res)=>{ 
res.render("adminpages/supervisors")
})
router.get("/adminhome", (req,res)=>{ 
res.render("admin")
})






/* adminpages folder */
router.get("/adminpagesspares", (req,res)=>{ 
res.render('adminpages/spares')
})
router.get("/adminpagestechnicians", (req,res)=>{ 
res.render('adminpages/technician')

router.get("/adminpagestcreateacc", (req,res)=>{ 
res.render('adminpages/techniciancreateacc')
})

})
router.get("/adminpagescustomers", (req,res)=>{ 
res.render('adminpages/customer')
})
router.get("/adminpagessupervisors", (req,res)=>{ 
res.render("adminpages/supervisors")
})
router.get("/adminpageshome", (req,res)=>{ 
res.render("admin")
})

router.get("/adminpagesacreateacc", (req,res)=>{ 
res.render('adminpages/admincreateacc')
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
res.render("supervisor")
})

/* supervisor login page end */

/*technician login page */
router.get("/technician", (req,res)=>{ 
res.render("technician")
})
/* technician login page end */




/*admin login */
router.post("/adminloginpost",controller.adminlogin )

 /*admin create account */

router.post("/admincacc",controller.admincacc )


router.post("/admintcacc", controller.admintcacc)

/*
router.get("/", (req,res)=>{ 
res.render('index')
})
router.get("/", (req,res)=>{ 
res.render('index')
})
  */





module.exports= router