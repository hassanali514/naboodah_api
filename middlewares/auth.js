const User = require('../models/Users');
const jwt = require("jsonwebtoken");

exports.isUserLogin = async (req, res, next) => {
    try {        
        
        if (!req.headers.authorization) {
            return res.status(401).json({
                message: "please login first"
            })
        }

        const decoded = await jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        // console.log(decoded)

        req.user = await User.findById(decoded._id);
        // console.log(req.user);

        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}