const bycrpt = require ("bcrypt")
// const { bgCyan } = require("colors")
const colors = require("colors")

exports.hashedPassword = async (password) => {
    try {
        const hashedPassword = await bycrpt.hash(password,10);
        return hashedPassword;
    } catch (error) {
        console.log(error.message.bgRed.white)
    }
}

exports.comparedPassword = async (password,hashedPassword) => {
    try {
        return bycrpt.compare(password,hashedPassword)
    } catch (error) {
        console.log(error.message.bgRed.white)
    }
}