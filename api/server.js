// general
const express = require('express');
const app = express();
const PORT = process.env.LCOAL_PORT || 3000;

require('dotenv').config();

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

// authentication
const accounts = require('./accounts/routes')
app.use(accounts)



export default {
    path: `/api/${process.env.ALL_API_TOKEN}`,
    handler: app
}