const mongoose = require("mongoose");

const candidatesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter candidate's name"]
    },
    fatherName: {
        type: String,
        required: [true, "please enter candidate's father name"]
    },
    passportNo: {
        type: String,
        required: [true, "please enter candidate's passport number"]
    },
    dateOfBirth: {
        type: String,
        required: [true, "please enter candidate's date of birth"]
    },
    passportExpiryDate: {
        type: String,
        required: [true, "please enter candidate's passport expiry date"]
    },
    nationality: {
        type: String,
        required: [true, "please provide candidate's nationality"]
    },
    trade: {
        type: String,
        required: [true, "please enter candidate's trade"]
    },
    careOf: {
        type: String,
        required: [true, "please enter care of name"]
    },
    status: {
        type: String,
        required: [true, "please enter status"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    owner: {
        type: String,
        required: true
    },
    passportImage1: {
        type: String,
        required: true
    },  
    passportImage2: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    visaImageUrl: {
        type: String,
    },
    cvImageUrl: {
        type: String,
    },
    cnicImageUrl: {
        type: String,
        required: true
    },
    licenseImageUrl: {
        type: String,
    },
})

module.exports = mongoose.model("candidates", candidatesSchema);