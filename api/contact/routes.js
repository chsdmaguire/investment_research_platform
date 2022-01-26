
const { Router } = require('express');
const controller = require('./controller');
const router = Router();

router.post('/flibyrd/contact', controller.contactUs);


module.exports = router;