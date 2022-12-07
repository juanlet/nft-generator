const express = require('express');
const { generateNFTs } = require('../controllers/openaiController');
const router = express.Router();

router.post('/generate',generateNFTs );


module.exports = router;