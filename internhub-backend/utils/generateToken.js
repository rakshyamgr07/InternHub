const jwt = require("jsonwebtoken")

async function generateJWT(payload){
    let token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1d"})
    return token
}

async function verifyJWT(token){
    try{
        let data = jwt.verify(token,process.env.JWT_SECRET)
        return data
    }catch(error){
        return false
    }
}

async function decodeJWT(token) {
    try {
        let data = jwt.decode(token,process.env.JWT_SECRET)
        return data
    } catch (error) {
        return false
    }
}

module.exports = {generateJWT,verifyJWT,decodeJWT}