const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/nft', require('./routes/nftRoutes'));

app.listen(port, ()=> console.log(`Server started: port ${port}`));