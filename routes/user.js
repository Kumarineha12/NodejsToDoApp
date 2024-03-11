import express from "express";
import {getAllUsers, getMyProfile, login, logout, register } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router=express.Router();

router.get("/all", getAllUsers);

router.post("/new", register );
router.post("/login", login );
router.get("/logout", logout);

// router.get("/userid/special", specialFunc );
//SINCE ALL ROUTES ALL SIMILAR THEN WE CAN USE LIKE THIS
router.get("/me",isAuthenticated,getMyProfile);
// .put(updateUser)
// .delete(deleteUser);
// router.get("/userid/:id", getUserDetails );

// router.put("/userid/:id", updateUser );

// router.delete("/userid/:id", deleteUser );

export default router;