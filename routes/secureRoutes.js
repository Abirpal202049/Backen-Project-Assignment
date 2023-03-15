const express = require('express');
const router = express.Router()
const { resetPassword, updateUserDetails } = require('../controllers/userUpdateController');
const { isLoggedin } = require('../middleware/isLoggedIn')


router.post('/resetpassword', isLoggedin, resetPassword)
router.post('/updateDetails', isLoggedin, updateUserDetails)


module.exports = router;