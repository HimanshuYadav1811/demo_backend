import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { deleteCourse, editCourse, handleCreateCourse, handleGetAllCourses, updateFeaturedCourse } from '../controllers/course.controllers.js';
const router = express.Router();



router.post("/create-course",isAuthenticated, handleCreateCourse);
router.get("/all-courses", handleGetAllCourses);
router.post("/update-featured-course/:id", updateFeaturedCourse);
router.post("/edit-course/:id", editCourse);   
router.post("/delete-course/:id", deleteCourse);   

export default router;