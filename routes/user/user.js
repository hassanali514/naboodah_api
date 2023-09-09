const express = require("express");
const router = express.Router();
const {userLogin,userLogout,userProfile,registerUser, getAllUser} = require("../../controllers/user/user")
const {isUserLogin} = require("../../middlewares/auth");

// COMMON ROUTES
router.route('/login').post(userLogin);
router.route('/user/profile').get(isUserLogin,userProfile);
router.route('/logout').get(isUserLogin,userLogout);

//ADMIN
router.route('/user/register').post(isUserLogin, registerUser);
router.route('/user/all/users').get(isUserLogin, getAllUser);


module.exports = router;

