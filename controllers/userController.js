const bcrypt = require("bcrypt");
const User = require("../models/User.js");
const auth = require("../auth.js");
const Course = require("../models/Course.js");

module.exports.checkEmailExists = (reqBody) => {
    return User.find({email: reqBody.email}).then(result =>{
        if(result.length > 0) {
          return true;
        } else {
          return false;
        }
    })
}

module.exports.registerUser = (reqBody) => {
    
    let newUser = new User({
        firstName : reqBody.firstName,
        lastName : reqBody.firstName,
        email : reqBody.email,
        mobileNo : reqBody.mobileNo,
        password : bcrypt.hashSync(reqBody.password, 10) 
        // 10 = salt
    })

    return newUser.save().then((user, error) => {
        if(error){
          return false;
        }else {
          return true;
        }
    })
}

module.exports.loginUser = (reqBody) => {
  console.log("check login ouwtise");
    return User.findOne({email : reqBody.email}).then(result => {
      console.log("check login");
          if(result == null) {
              return false;
          } else {
              const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password);

              if(isPasswordCorrect){
                  return { access : auth.createAccessToken(result) }
              } 
          }
    })
}


module.exports.getProfile = (data) => {
    return User.findById(data.userId).then( result  => {
      return result;
    });
}


module.exports.enroll = async (data) => {
    
    let isUserUpdated = await User.findById(data.userId).then( user => {
        user.enrollments.push({courseId : data.courseId})

        return user.save().then((user, error) => {
            if(error) {
              return false
            } else {
              return true
            }
        })
    })

    let isCourseUpdated = await Course.findById(data.courseId).then( course => {
        course.enrollees.push({ userId : data.userId })

        return course.save().then((course, error) => {
            if(error) {
              return false
            } else {
              return true
            }
        })
    })

    if(isUserUpdated && isCourseUpdated) {
       // isUserUpdated = true
       // isCourseUpdated = true
       // final output = TRUE 
       return true
    } else {
       // If one of these: isUserUpdated or isCourseUpdated is false
       // Output will be false

       // If both isUserUpdated  and isCourseUpdated
       // Output will be a concrete false
       return false  
    }
}


