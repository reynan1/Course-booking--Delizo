const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController.js");
const auth = require("../auth.js")

router.post("/create",  auth.verify , (req, res) => {
  const data = {
    course: req.body,
    isAdmin : auth.decode(req.headers.authorization).isAdmin
  }
    console.log("route data : " + data)
  courseController.addCourse(data).then(resultfromController => {
      res.send(resultfromController)
  })
})


 // Get all courses
 router.get("/all" , (req, res) => {
    courseController.getAllCourses().then(resultfromController => {
        res.send(resultfromController)
    })
 })

  // Get all active courses
  router.get("/active" , (req, res) => {
    courseController.getActiveCourses().then(resultfromController => {
        res.send(resultfromController)
    })
 })

 // Get single course
 router.get("/:courseId" , (req, res) => {
  courseController.getCourse(req.params.courseId).then(resultfromController => {
      res.send(resultfromController)
  })
})

// Updating a single course
router.patch("/:courseId/update", auth.verify, (req, res) => {
    courseController.updateCourse(req.params.courseId,req.body).then(resultfromController => {
      res.send(resultfromController)
  })
})

// Archiving a single course
router.patch("/:courseId/archive", auth.verify, (req, res) => {
    courseController.archiveCourse(req.params.courseId).then(resultfromController => {
      res.send(resultfromController)
  })
})


module.exports = router