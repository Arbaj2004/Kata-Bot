const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const visitorController = require('../controllers/visitorController');
const router = express.Router();

router.post('/contactUs', userController.sendContactUsMessage);

router.post('/register', authController.signup);
router.post('/verifySignupEmailOTP', authController.verifyOtp);
router.patch('/reset-password/:token', authController.resetPassword);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.get('/logout', authController.logout);
router.get('/visitorCntinc', visitorController.visitorCountInc)
router.get('/getvisitorCnt', visitorController.getVisitorCount)


module.exports = router;