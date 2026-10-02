const jwt = require("jsonwebtoken")

async function generateJWT(payload){
    let token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1d"})
    return token
}

async function verifyJWT(token){
   const user = await verifyJWT(token);

console.log("Decoded user:", user);
console.log("User ID:", user?.id);

if (!user) {
    return res.status(401).json({
        success: false,
        message: "Please sign in"
    });
}

req.user = user.id;

console.log("REQ.USER:", req.user);

next();
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