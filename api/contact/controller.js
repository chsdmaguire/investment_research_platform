const nodemailer  = require('nodemailer');
require('dotenv').config();


  const contactUs = async (req, res) => {

     const host = {
    host: 'smtp.gmail.com',
    port: '587',
    auth: {
      user: process.env.CONTACT_EMAIL,
      pass: process.env.CONTACT_PASSWORD
    }
  } 

    const mailOptions = {
        from: req.body.email,
        subject: req.body.subject, 
        text: req.body.text,
        to: process.env.CONTACT_EMAIL
    }
    const transporter = nodemailer.createTransport(host);

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        });

  }

  module.exports = {
      contactUs
  }