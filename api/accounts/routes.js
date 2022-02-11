require('dotenv').config();
const { Router } = require('express');
const router = Router();
const controller = require('./controller');


router.post('/auth/login', controller.loginUser);


router.post('/auth/register', controller.registerNewUser);


router.get('/auth/me', controller.meRoute);

router.post('/auth/deleteuser', controller.deleteUser);


module.exports = router;
