const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required : [true, "Firstname is Required!"]
    },
    
    lastName: {
      type: String,
      required: [true, "Lastname is Required!"]
    }, 

    email: {
      type: String,
      required: [true, "Email is Required!"]
    },

    password: {
      type: String,
      required: [true, "Password is Required!"]
    },

    isAdmin: {
      type: Boolean, 
      default: false
    },

    mobileNo: {
      type: String,
      required: [true, "Mobile number is Required!"]
    },

    enrollments: [{
       courseId: {
           type: String,
           required: [true, "Course ID is Required!"]
       },

       enrolledOn: {
        type: Date,
        default: new Date()
       },

       status: {
           type: String,
           default: "Enrolled"
       }
    }]
})


module.exports = mongoose.model("User", userSchema);