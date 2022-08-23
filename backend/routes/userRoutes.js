const express = require('express');
const { registerUser ,loginUser, logout, forgotPassword ,resetPassword, getUserDetails, updateUserPassword ,updateProfile ,getAllUser ,getSingleUser, deleteUser ,updateRole} = require('../controller/userController');
const router = express.Router();
const {authorizeRoles ,isAuthenticadtedUser} =require('../middleware/auth');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/logout').get(logout);
router.route('/me').get(isAuthenticadtedUser,getUserDetails);
router.route('/password/update').put(isAuthenticadtedUser,updateUserPassword);
router.route('/me/update').put(isAuthenticadtedUser,updateProfile);
router.route('/admin/users').get(isAuthenticadtedUser,authorizeRoles("admin"),getAllUser);
router.route('/admin/user/:id').get(isAuthenticadtedUser,authorizeRoles("admin"),getSingleUser);
router.route('/admin/user/:id').put(isAuthenticadtedUser,authorizeRoles("admin"),updateRole);
router.route('/admin/user/:id').delete(isAuthenticadtedUser,authorizeRoles("admin"),deleteUser);


module.exports=router;