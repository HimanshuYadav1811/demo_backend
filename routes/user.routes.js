import express from 'express';
import {  deleteUser, getAllUsers, userLogin, userRegister } from '../controllers/user.controllers.js';
import { isAuthenticated } from '../middlewares/auth.js';
const router = express.Router();



router.post("/user/register", userRegister);
router.post("/user/login", userLogin);
router.get("/user/all",isAuthenticated,getAllUsers)
router.delete("/user/delete/:id",isAuthenticated,deleteUser)



export default router;