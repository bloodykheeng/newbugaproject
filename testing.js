/*const bcrypt = require('bcryptjs')
async()=>{
	 const salt = await bcrypt.genSalt(10)
	const pwd = "heii man"
  const hashedpassword = await bcrypt.hash(pwd,salt)
console.log(hashedpassword)
}*/
var bcrypt = require('bcryptjs');

//var hashedpassword

//bcrypt.genSalt(10, async function(err, salt) {
	/* 
	var car = 1
	if(car==1){
  const hashedpassword = bcrypt.hash("B4c0/\/", 10);

const hello = "hei bro const hello"
const hash = async (hashedpassword)=>{
  
  const hashed= await hashedpassword
 
 console.log(hashed)
 console.log(hello)
  }
  hash(hashedpassword)
 console.log("hello last one")
 }else{
console.log("car is not equal to car")
 }
 */
  //})

// verifying the password 

// Load hash from your password DB.

 /*bcrypt.compare("B4c0/\/", "$2a$10$nP7W3grootJMqu7pTlcwcej8H0RiTSYp9tbikCz3DMW2oR/QKA20K", function(err, res) {
    // res === true
    if(res){ console.log("password match")}
    else{console.log("password mismatched")}
});

*/


/*
bcrypt.compare("not_bacon", hash, function(err, res) {
    // res === false
});
 
// As of bcryptjs 2.4.0, compare returns a promise if callback is omitted:
bcrypt.compare("B4c0/\/", hash).then((res) => {
    // res === true
});
*/







// easy bcrypting

//var bcrypt = require('bcryptjs');
//req.body.password="password"
/*
async function hashedpassword(){ 
	const password = 'bloody'
 const hashedpassword = await new promise( 
(resolve,reject)=>{
bcrypt.hash('bloody',10,function(err,hashedpassword){
	if(err){reject(err)}
	else{
		resolve(hashedpassword)
console.log(hashedpassword)
}
 }) } )
}
*/

/*
async function hashPassword (user) {

  const password = user
  const saltRounds = 10;

  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function(err, hash) {
      if (err) reject(err)
      resolve(hash)
    });
  })

  return hashedPassword
}

hashPassword ('bloody')
*/


//console.log("the real hashed password"+ hashedpassword)


//decrpy compare
/*
try{ 
if(await bcrypt.compare(password,"password")){
console.log("password match")
 }else{ console.log("password missmatch")}

}catch(err){ }}

hello()
*/
/*
const cryptr = require('cryptr')
const password = "bloody"
const cryptedpassword = cryptr.encrypt(password)
console.log(cryptedassword)

*/


/*
//hassh
const passwordHash = bcrypt.hashSync('Pa$$w0rd', 10);

//verify
const verified = bcrypt.compareSync('Pa$$w0rd', passwordHash);


async function register(params) {
    // create account object
    const account = new db.Account(params);

    // hash password
    account.passwordHash = bcrypt.hashSync(params.password, 10);

    // save account
    await account.save();
}



if (!account || !bcrypt.compareSync(password, account.passwordHash)) {
        // authentication failed
        return false;
    } else {
        // authentication successful
        return true;
    }
    */
    
    /*
    
    bcrypt.compare(, hash, function(err, res) {
    // res === false
});
 */
    
    
    const hashedpassword = bcrypt.hash("bloody",10)
    
    const hashedfunction = async (hash)=>{ 
const newhash = await hash
console.log(newhash)
console.log("thats the new password")
return newhash
}
    hashedfunction(hashedpassword)
   
    
    
    
    
    var id = "$2a$10$FxenzMmZZNF1X6JzzQxxruin8vlwagpr2hDqXNZl7uOmBFY6gn7RW"
const compare = bcrypt.compare("bloody", id)


 const comparepassword = async(compare)=>{
    var pcompare = await compare
    console.log(pcompare)
    console.log("am done comparimg")
    }
    comparepassword (compare)
