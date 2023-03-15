const bcrypt = require('bcrypt')
const Crypter = require('cryptr')
const getuserName = require('../helper/getuserName')
const User = require('../models/Usermodel')

const crypter = new Crypter(process.env.SECRETKEY, {
    pbkdf2Iterations: 50000,
    saltLength: 20
})

exports.resetPassword = async (req, res) => {
    try {
        const { password, newPassword, confirmNewPassword } = req.body

        // check if no fields are empty
        if (!password || !newPassword || !confirmNewPassword) {
            return res.json({
                success: false,
                message: "All the fields are required"
            })
        }

        // Check if the old password is correct or not
        const user = req.userDetail
        console.log("User Details : ", user);
        const resPassword = await bcrypt.compare(password, user.password)
        if (!resPassword) {
            return res.json({
                success: false,
                message: 'Enter the correct Password'
            })
        }

        // Old Password Must not be equal to the new Password
        if (password === newPassword) {
            return res.json({
                success: false,
                message: "New Password must be different than Old Password"
            })
        }

        //  Pass Validation check on the new password
        if (newPassword.length < 6) {
            return res.json({
                success: false,
                message: "Password is too short"
            })
        }


        // Checking newPassword confirmNewPassword are same or not
        if (newPassword !== confirmNewPassword) {
            return res.json({
                success: false,
                message: "New Password and Confirm Password are not same"
            })

        }


        // Encrypt the password
        const encryptedPassword = await bcrypt.hash(newPassword, 12)

        const updatePasswordDetails = await User.updateOne(
            { _id: user.id },
            {
                password: encryptedPassword
            }
        )

        return res.json({
            success: true,
            message: "Password Updated Successfully",
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

// User can update email mobilenumber and fullname
exports.updateUserDetails = async (req, res) => {
    try {
        const user = req.userDetail

        // Things you need to update
        const { fullName, email, mobileNumber } = req.body

        if (!fullName || !email || !mobileNumber) {
            return res.json({
                success: false,
                message: "Fields are empty"
            })
        }

        // Validation Check
        if (mobileNumber.toString().length < 10) {
            return res.json({
                success: false,
                message: "Enter a valid mobile number"
            })
        }

        //  Generating the username from the email
        const userName = getuserName(email)

        // Encrypting the new data
        const encryptedName = crypter.encrypt(fullName)
        const encryptedEmail = crypter.encrypt(email)
        const encryptedMobileNumber = crypter.encrypt(mobileNumber.toString())

        // Updating into the database
        const updateDetails = await User.updateOne(
            { _id: user.id },
            {
                userName : userName,
                fullName: encryptedName,
                email: encryptedEmail,
                mobileNumber: encryptedMobileNumber,
            }
        )
            console.log(updateDetails);

        return res.json({
            success : true,
            message : "Details Updated Successfully",
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}