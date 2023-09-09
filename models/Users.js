const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Please Enter User Name"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Password"],
        select: false
    },
    name: {
        type: String,
        required: true
    },
    origin:{
        type:String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    active: {
        type: Boolean,
        default: true
    }
})

// userSchema.methods.encryptPasswordDemo = async function () {
//     this.password = await bcrypt.hash(this.password, 10);
// }

// userSchema.methods.generateUniqueIdDemo = async function (password) {
//     this.userId = uuidv4();
// }


userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET)
}


// userSchema.methods.getResetPasswordToken = function () {
//     const resetToken = crypto.randomBytes(20).toString("hex");
//     // console.log(resetToken);
//     this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
//     this.resetPasswordExpire = Date.now() + 5 * 60 * 1000; // 2 minutes
//     return resetToken;
// }

module.exports = mongoose.model("User", userSchema);