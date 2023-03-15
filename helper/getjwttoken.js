const jwt = require('jsonwebtoken')


const getjwtToken = (userId, email, mobileNumber) => {
    try {
        return jwt.sign({ 
            id: userId ,
            email : email,
            mobileNumber : mobileNumber
        }, process.env.JWT_SECRET, {
            expiresIn: '1 day'
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

module.exports = getjwtToken