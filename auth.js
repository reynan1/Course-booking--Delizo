const jwt = require("jsonwebtoken");

const secret = "CourseBookingAPI";

// To create a token using the json webtoken package from NPM
module.exports.createAccessToken = (user) => {
  console.log("working acess")
    const data = {
        id : user._id,
        email : user.email,
        isAdmin : user.isAdmin
    }

    return jwt.sign(data, secret, {})
}

// To verify a token from the request/from postman
module.exports.verify = (req, res, next) => {
   let token = req.headers.authorization 

   if(typeof token !== "undefined") {
      console.log(token)

      token = token.slice(7, token.length)

      // To veryfy the token using jwt, it requires the actual token and the secret key that was used to create it
      return jwt.verify(token, secret, (error, data) => {
        if(error) {
          return res.send({
            auth: "Failed."
          })
        } else {
           next()
        }
      })
   } else {
    return null
   }
}

// To decode the user details from the token
module.exports.decode = (token) => {
  if(typeof token !== "undefined"){
    token = token.slice(7, token.length)

    return jwt.verify(token, secret, (error, data) => {
        if(error) {
          return null
        } else {
          return jwt.decode(token, {complete: true}).payload 
        }
    })
  } else {
    return null
  }
}
