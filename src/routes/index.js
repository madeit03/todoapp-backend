const express = require('express');
const router = express.Router();
const path = require('path');
const jwt = require('jsonwebtoken');
const { mainPage, postData, getLogin, getRegister, postRegister, postLogin, putadd, deldel, putChange, } = require('../controllers/index');
const { authToken } = require('../middlewares/authtoken');
router.get('/', mainPage);

router.post('/data', authToken, (req, res) => { postData(req, res); });

router.get('/register', (req, res) => { getRegister(req, res) });
router.post('/register', express.json(), (req, res) => { postRegister(req, res) });

router.get('/login', getLogin)
router.post('/login', express.json(), (req, res) => { postLogin(req, res) })

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
})

router.put('/add', authToken, express.json(), (req, res) => { putadd(req, res) })

router.delete('/del', authToken, express.json(), (req, res) => { deldel(req, res) })

router.put('/change', authToken, express.json(), (req, res) => { putChange(req, res) })



module.exports = { router };