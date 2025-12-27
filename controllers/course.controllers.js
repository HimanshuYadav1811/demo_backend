import ErrorHandler from "../middlewares/error.js";
import { Course } from "../models/course.modal.js";



export const handleCreateCourse = async(req, res,next) => {
    try {
        const { title, description, duration, ageLimit, certificate, requirements, courseFeatures, isFeature } = req.body;
        if (!title) return next(new ErrorHandler("Title is required", 400));
        if (!description) return next(new ErrorHandler("Description is required", 400));
        if (!duration) return next(new ErrorHandler("Duration is required", 400));
        if (!ageLimit) return next(new ErrorHandler("Age Limit is required", 400));
        if (!certificate) return next(new ErrorHandler("Certificate is required", 400));
        if (typeof certificate !== "boolean")
            return next(new ErrorHandler("Certificate must be boolean", 400)); 
        if (!requirements || !Array.isArray(requirements))
            return next(new ErrorHandler("Requirements must be an array", 400));
        if (!courseFeatures || !Array.isArray(courseFeatures))
            return next(new ErrorHandler("Course Features must be an array", 400));
        if (typeof isFeature !== "boolean")
            return next(new ErrorHandler("Is Feature must be boolean", 400));  
        const course = new Course({ title, description, duration, ageLimit, certificate, requirements, courseFeatures, isFeature });
        await course.save();
        res.status(201).json({ message: 'Course created successfully', success: true });    
    } catch (error) {
         console.log("CREATE COURSE ERROR 👉", error);
        next(new ErrorHandler(error.message, 500));        
    }
}

export const handleGetAllCourses = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;   // current page
        const limit = parseInt(req.query.limit) || 10; // records per page
        const skip = (page - 1) * limit;

        const totalCourses = await Course.countDocuments();

        const courses = await Course.find({}).skip(skip).limit(limit).sort({ createdAt: -1 }); // latest first (optional)

        res.status(200).json({
            success: true,
            courses,
            pagination: {
                totalRecords: totalCourses,
                currentPage: page,
                totalPages: Math.ceil(totalCourses / limit),
                limit
            }
        });

    } catch (error) {
        console.log("GET ALL COURSES ERROR 👉", error);
        next(new ErrorHandler(error.message, 500));
    }
};

export const updateFeaturedCourse = async(req, res, next) => {
    try {
        const { id } = req.params;  
        const course = await Course.findById(id);
        if (!course) return next(new ErrorHandler("Course not found", 404));
        course.isFeature = !course.isFeature;
        await course.save();
        res.status(200).json({ message: 'Course feature status updated', success: true });
    } catch (error) {
        console.log("UPDATE FEATURED COURSE ERROR 👉", error);
        next(new ErrorHandler(error.message, 500));
    }
}

export const editCourse = async(req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const course = await Course.findByIdAndUpdate(id, updates, { new: true });
        if (!course) return next(new ErrorHandler("Course not found", 404));
        res.status(200).json({ message: 'Course updated successfully', course, success: true });
    } catch (error) {
        console.log("EDIT COURSE ERROR 👉", error);
        next(new ErrorHandler(error.message, 500));
    }
}

export const deleteCourse = async(req, res, next) => {
    try {
        const { id } = req.params;  
        const course = await Course.findByIdAndDelete(id);
        if (!course) return next(new ErrorHandler("Course not found", 404));
        res.status(200).json({ message: 'Course deleted successfully', success: true });
    } catch (error) {
        console.log("DELETE COURSE ERROR 👉", error);
        next(new ErrorHandler(error.message, 500));
    }   
}

