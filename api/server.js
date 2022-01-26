// general
const express = require('express');
const app = express();
const PORT = process.env.LCOAL_PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
//cors
var corsOptions = {
    origin: PORT,
  };
const cors = require('cors');
app.use(cors(corsOptions));
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, x-access-token')
//   if (req.method === 'OPTIONS') {
//     res.sendStatus(200)
//   }
//   else {
//     next()
//   }
// })

//helmet
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

// Google authentication
const accounts = require('./accounts/routes')
app.use(accounts)


export default {
    path: '/api',
    handler: app
}