

const getuserName = (email) => {
    return (email.split('@')[0]) + process.env.UID + (email.split('@')[1])
}
module.exports = getuserName