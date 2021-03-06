var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");
var bcrypt = require('bcrypt');
var flash = require('req-flash');


var users = db.get("users");
router.post('/', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    var email = req.body.email;
    var name = req.body.name;
    users.find({ email: email }).then(function (data1) {
        users.find({ username: username }).then(function (data2) {
            if (data1.length > 0) {
                res.render("registration", { messageEmailTaken: "This email is already taken." });
            }
            if (data2.length > 0) {
                res.render("registration", { messageUsernameTaken: "This username is already taken." });
            }
            if (data1.length == 0 && data2.length == 0) {
                users.insert({ name: name, username: username, email: email, password: hash, avatarURL: "https://rockymountainradar.com/landing/images/blank-avatar.png", kills: 0, deaths: 0, score: 0 });

                res.render("login", { message: 'Your registration was successful!' });
                var smtpTransport = nodemailer.createTransport({
                    service: "Gmail",
                    auth: {
                        user: "mplulev@gmail.com",
                        pass: "rastafare321"
                    }
                });
                var mailOptions = {
                    from: "Phinal Phase  <PhinalPhaseTheGame@gmail.com>",
                    to: email,
                    subject: "Welcome to PhinalPhase! ",
                    html: "<img src='http://i.imgur.com/iuzDfkx.png' style='margin-bottom:30px; display:block;margin:0 auto;'></br><h1 style='font-family:impact; text-align:center; text-shadow:1px 2px 21px #FF0000'>Greetings  " + username + "! Welcome to the PHINAL PHASE!</h1>"
                }
                smtpTransport.sendMail(mailOptions, function (error, response) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("Message sent: " + response.message);
                    }
                });
            }
        });
    })
});
module.exports = router;