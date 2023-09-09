const User = require("../../models/Users");
const ErrorHandler = require("../../utils/errorHandler");
const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");

exports.dataFetch = catchAsyncErrors(async (req, res, next) => {

    const data = await User.find();

    res.status(200).json({
        data
    })
})

// LOGIN - ADMIN USER
exports.userLogin = catchAsyncErrors(async (req, res, next) => {

    const { userName, password } = req.body;

    if (!userName || !password) {
        return next(new ErrorHandler('Incomplete data', 400));
    }

    const user = await User.findOne({ userName }).select("+password");

    if (!user) {
        return next(new ErrorHandler('incorrect username or password', 400));
    }

    // @define: password encrypt demo code
    // await user.encryptPasswordDemo();
    // await user.generateUniqueIdDemo();
    // await user.save();

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorHandler('incorrect username or password', 400));
    }

    if (!user.active) {
        return next(new ErrorHandler('user is blocked', 400));
    }

    const token = await user.generateToken();

    res.status(200).json({
        success: true,
        user,
        token,
        message: "login successfully"
    })

});

// PROFILE - ADMIN USER
exports.userProfile = catchAsyncErrors(async (req, res) => {

    const user = await User.findById(req.user._id);

    res.status(200).json({
        success: true,
        user
    })

});


// REGISTER - ADMIN
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const { userName, origin, name, password } = req.body;

    if (!userName || !origin || !name || !password) {
        return next(new ErrorHandler('Incomplete data', 400));
    }

    let user = await User.findOne({ userName });

    if (user) {
        return next(new ErrorHandler('user already exist', 400));
    }

    user = await User.create({
        userName,
        origin,
        name,
        password
    })

    res.status(201).json({
        success: true,
        user: req.user,
        message: 'Register Successfully'
    })
});

// GET ALL USERS - ADMIN
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {

    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    });
});

// GET SINGLE USER - ADMIN
// exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {

//     const user = await User.findById(req.params.id);

//     if (!user) {
//         return next(
//             new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
//         );
//     }

//     res.status(200).json({
//         success: true,
//         user,
//     });
// });

// LOGOUT - ADMIN USER
exports.userLogout = catchAsyncErrors(async (req, res) => {

    res.status(200).json({
        success: true,
        message: "logged out successfully"
    })
});