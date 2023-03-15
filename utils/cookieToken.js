const getjwtToken = require('../helper/getjwttoken')


const cookieToken = (user, res) => {
    try {
        const token = getjwtToken(user._id, user.email, user.mobileNumber)
        const options = {
            expires: new Date(
                Date.now() + 3 * 24 * 60 * 60 * 1000
            ),
            httpOnly: true // This means that this cookie can now only manipulated by the server
        }
        user.password  = undefined
        user.userName = undefined
        res.status(200).cookie('token' , token, options).json({
            success : true,
            message : "User Created Successfully",
            token,
            user
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

module.exports = cookieToken;