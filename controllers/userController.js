const User = require('../models/Usermodel')
const Crypter = require('cryptr')
const bcrypt = require('bcrypt')
const cookieToken = require('../utils/cookieToken')
const getuserName = require('../helper/getuserName')

const crypter = new Crypter(process.env.SECRETKEY, {
    pbkdf2Iterations: 50000,
    saltLength: 20
})

exports.signUp = async (req, res) => {
    try {
        const { fullName, email, mobileNumber, password, confirmPassword } = req.body

        // Checking all the fields are present or not
        if (!fullName || !email || !mobileNumber || !password || !confirmPassword) {
            return res.json({
                success: false,
                message: "All the fields are required"
            })
        }

        // Checking both the password and confirmPassword are same or not
        if (password !== confirmPassword) {
            return res.json({
                success: false,
                message: "Password and Confirm Password are not same"
            })

        }

        // Checking mobile number is of length 10
        if (mobileNumber.toString().length < 10) {
            return res.json({
                success: false,
                message: "Enter a valid mobile number"
            })
        }

        // Generating a unique username
        const userName = getuserName(email)

        // Check the details in the database using the `userName`
        const existingUser = await User.findOne({
            userName
        })
        if (existingUser) {
            return res.json({
                success: false,
                message: "User already exist"
            })
        }

        // Encrypting the details of the user
        const encryptedName = crypter.encrypt(fullName)
        const encryptedEmail = crypter.encrypt(email)
        const encryptedMobileNumber = crypter.encrypt(mobileNumber.toString())

        // Hashing the password
        const saltRounds = 12;
        const encryptedPassword = await bcrypt.hash(password, saltRounds)


        // Storing it in the database
        const user = await User.create({
            userName: userName,
            fullName: encryptedName,
            email: encryptedEmail,
            mobileNumber: encryptedMobileNumber,
            password: encryptedPassword
        })


        // Returning the JWT token
        cookieToken(user, res)


    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

exports.logIn = async (req, res) => {
    try {
        const { email, password } = req.body

        // Checking all the fields are present or not
        if (!email || !password) {
            return res.json({
                success: false,
                message: "All the fields are required"
            })
        }

        //  Generating the username from the email
        const userName = getuserName(email)


        // Find the user details 
        const user = await User.findOne({ userName })
        if (!user) {
            return res.json({
                success: false,
                message: "No User Found"
            })
        }

        // Password check 
        const resPassword = await bcrypt.compare(password, user.password)
        if (!resPassword) {
            return res.json({
                success: false,
                message: 'Password is incorrect'
            })
        }

        cookieToken(user, res)


    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

