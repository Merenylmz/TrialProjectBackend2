const nodemailer = require("nodemailer");

let tranporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    secure: false,
    port: 587,
    tls: {
        ciphers: "SSLv3"
    },
    auth: {
        user: "myma_ilsender@hotmail.com",
        pass: "mailsender2828"
    }
});

module.exports = tranporter;