const User = require("../Models/Auth.models");
const Bcyrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = require("../Redis/redisClient");
const emailQueue = require("../Job/sendMailJob");

const login = async(req, res) =>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        if (user === null) {
            throw console.log("HATA");
        }

        const status = Bcyrpt.compare(password, user.password);
        if(!status){console.log("Wrong Pass");}

        const token = await jwt.sign({userId: user.id}, process.env.PRIVATETOKENKEY, {expiresIn: "2h"});
        
        client.setEx(`lastLoginToken:${user.id}`, 60*60*2, token);
        user.lastLoginToken = token;
        await user.save();

        await emailQueue.add({to: email, subject: "Deneme", text: `
            <h1>Denemeeeeeeeeeeeeeeeee</h1>    
            asdasdasdasdasdasd
        `});
        
        res.send({status: true, name: user.name, token});
    } catch (error) {
        console.log(error);
    }
}

const register = async (req, res) => {
    try {
        const {email, password, name} = req.body;
        const user = await User.findOne({email: email});
        if (user != null) {return res.send({status: false, msg: "This email is already used"})} 

        const hashedPass = await Bcyrpt.hash(password, 11);

        const newUser = new User({
            name,
            email,
            password: hashedPass
        });

        await newUser.save();

        res.send({status: true, msg: "User Registered"});
    } catch (error) {
        console.log(error);
    }
}

module.exports = {login, register};