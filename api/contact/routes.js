
const { Router } = require('express');
const nodemailer  = require('nodemailer');
const router = Router();
require('dotenv').config();

const transport = {
    host: process.env.CONTACT_HOST,
    port: process.env.CONTACT_PORT,
    secure: true,
    auth: {
        user: process.env.CONTACT_EMAIL,
        password: process.env.CONTACT_PASSWORD
    }
}

const transporter = nodemailer.createTransport(transport)
transporter.verify((error, success) => {
    if(error) {
        console.log(error.message)
    } else {
        console.log('ready to send email')
    }
})

router.post('/contact/page', (req, res, next) => {
    //make mailable object
    const mail = {
    from: process.env.CONTACT_HOST,
    to: process.env.CONTACT_EMAIL,
    subject: 'New Contact Form Submission',
    text: `
      from:
      ${req.body.firstname}
      ${req.body.lastname}
      contact details
      email: ${req.body.email}
      subject: ${req.body.subject}

      message:
      ${req.body.message}`,
    }
    transporter.sendMail(mail, (err, data) => {
        if (err) {
            res.json({
                status: 'fail',
            })
        } else {
            res.json({
                status: 'success',
            })
        }
    })
})

module.exports = router;