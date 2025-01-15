const express = require('express');
const PredictController = require('../controllers/predictControllers')
const router = express.Router();


router.post('/news', PredictController.predictnews);

module.exports = router;
