const jwt = require('jsonwebtoken');
const User = require('../models/Usermodel')

exports.isLoggedin = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.json({ success: false, message: "Please Login to access" })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET)

        console.log("Decodes JWT : ", decode);


        // Putting it in the user
        req.userDetail = await User.findOne({
            _id: decode.id
        })
        next()

    } catch (error) {
        return res.json({
            success: false,
            message: "Some Error occured",
            errorMsg: error.message
        })
    }
}