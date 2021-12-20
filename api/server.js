// general
const express = require('express');
const app = express();
const PORT = process.env.LCOAL_PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
const nodemailer = require("nodemailer");
require('dotenv').config();
//cors
var corsOptions = {
    origin: PORT
  };
  // Enable CORS
  // const corsOptions = {
  //   origin: (origin, cb) => {
  //     if ((origin === undefined && process.env.NODE_ENV === 'dev') || origin.includes('localhost') || origin.includes('fervent-raman-64e85a.netlify.app') || origin.includes('flibyrd.com')) {
  //       cb(null, true)
  //       return
  //     }
  //     cb(new Error('Not allowed'))
  //   },
  //   methods: ['GET', 'PUT'],
  //   credentials: true
  // }

  const host = {
    host: 'smtp.gmail.com',
    port: '587',
    auth: {
      user: process.env.CONTACT_EMAIL,
      pass: process.env.CONTACT_PASSWORD
    }
  }

app.post('/flibyrd/contact',  async(req, res) => {
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
})
  


const cors = require('cors');
app.use(cors(corsOptions));

// helmet
const helmet = require('helmet');
app.use(helmet());


// stocks
const stockRoutes = require('./equities/routes')
app.use(stockRoutes)

// crypto & econ routes
const cryptoRoutes = require('./crypto-econ/routes')
app.use(cryptoRoutes)

// contact page
const contact = require('./contact/routes')
app.use(contact)

export default {
    path: '/api',
    handler: app
}