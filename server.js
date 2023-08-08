const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const { app } = require('./app');
const port = 3700;
const { router } = require('./src/routes/index');


app.listen(port, () => {
    console.log('server is running on port:', port);

})
app.use(cors({
    origin: ['http://localhost:3001', 'http://madeit.cloud:3700'],
    credentials: true,

}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './src/public')))
app.use('/', router);

