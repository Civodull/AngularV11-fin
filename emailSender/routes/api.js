const express = require("express");
var nodemailer = require('nodemailer');
const router = express.Router();

router.post("/sendMail", (req, res)=>{
    let userData = req.body;
    let password=userData.password;
    let email = userData.email;
    sendMail(email,password);
  })
sendMail=(mail,pwd)=>{
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'toutachatsn@gmail.com',
        pass: 'toutachatsn.com@12'
      }
    });
    
    var mailOptions = {
      from: 'toutachatsn@gmail.com',
      to: mail,
      subject: 'Création de compte',
      text: `Votre pseudo de connexion est :${mail} 
            et votre mot de passe est:${pwd}`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email envoyé: ' + info.response);
      }
    });
  }
  module.exports = router;