const express = require('express')
const bodyparser = require('body-parser')
const mysql = require('mysql2');
const router = require('./routes')
const {v4:uuidv4} = require("uuid")
const session = require('express-session')
const bcryptjs = require('bcryptjs')
const app = express()
const path = require("path")


//const port = process.env.PORT || 8080;
const port = process.env.PORT || 3000;

app.use(bodyparser.urlencoded( { extended: false  }))
app.use(bodyparser.json())

app.set('view engine','ejs')

app.use(session({
	secret:uuidv4(),
	resave:false,
	saveUninitialized : true
	}))
	
app.use('/images',express.static(path.join(__dirname,'public/images')))

app.use('/',router)
app.listen(port,()=>{ 
console.log(`server started on port ${port}`)
} )

