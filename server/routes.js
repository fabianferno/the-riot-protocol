const express = require('express');
const controllers = require('./controllers');

const router = express.Router();
router.post('/token', controllers.token);
router.post('/encrypt', controllers.encrypt);

module.exports = router;
