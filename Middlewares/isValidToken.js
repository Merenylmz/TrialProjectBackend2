const VerifyToken = require("../Inspection/VerifyToken")

module.exports = async(req, res, next) => {
    const status = await VerifyToken(req.query.token);
    if (!status) {
        return res.send({status: false, msg: "Please give a valid token"});
    }

    next();
}