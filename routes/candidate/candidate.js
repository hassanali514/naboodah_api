const express = require("express");
const router = express.Router();
const fileManager = require('../../actions/fileUpload');
const {
    createCandidate,
    getCandidatesOfUser,
    downloadFile,
    getCandidateDetails,
    viewFile
} = require("../../controllers/candidate/candidate");
const { isUserLogin } = require("../../middlewares/auth");

//ADMIN
router.route('/user/new/candidate').post(isUserLogin,
    fileManager.uploadDocument.fields([
        {
            name: "passportImage1",
            maxCount: process.env.MAX_NO_OF_IMAGES,
        },
        {
            name: "passportImage2",
            maxCount: process.env.MAX_NO_OF_IMAGES,
        },
        {
            name: "imageUrl",
            maxCount: process.env.MAX_NO_OF_IMAGES,
        },
        {
            name: "visaImageUrl",
            maxCount: process.env.MAX_NO_OF_IMAGES,
        },
        {
            name: "cvImageUrl",
            maxCount: process.env.MAX_NO_OF_IMAGES,
        },
        {
            name: "cnicImageUrl",
            maxCount: process.env.MAX_NO_OF_IMAGES,
        },
        {
            name: "licenseImageUrl",
            maxCount: process.env.MAX_NO_OF_IMAGES,
        },
    ]),
    createCandidate);

router.route('/user/candidates').get(isUserLogin,getCandidatesOfUser);
router.route('/user/download/:filename').get(isUserLogin,downloadFile);
router.route("/user/candidate/:id").get(isUserLogin,getCandidateDetails);
router.route('/user/view/:filename').get(isUserLogin,viewFile);


module.exports = router;

