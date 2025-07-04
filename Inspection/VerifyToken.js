const jwt = require("jsonwebtoken");
const User = require("../Models/Auth.models");

const VerifyToken = async (token) => {
    const decodedToken = await jwt.verify(token, process.env.PRIVATETOKENKEY);
    console.log(decodedToken);
    
    const user = await User.findOne({_id: decodedToken.userId});
    if(!user){return {status: false}}

    if (decodedToken.exp && decodedToken.exp < Math.floor(Date.now() / 1000)) {
        return {status: false, msg: "Token's Expired"}
    }

    return {user, status: "OK"};
}

module.exports = VerifyToken;