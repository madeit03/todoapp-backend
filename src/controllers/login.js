const path = require('path');
const jwt = require('jsonwebtoken');
const { connectToDB } = require('../config/db');
const getLogin = (req, res) => {
    const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
    const token = req.cookies.token;
    if (token != undefined) {
        console.log('token jakis istnieje');
        console.log('token:', token)
        console.log('ACCESSTOKEK,', ACCESS_TOKEN)
        jwt.verify(token, ACCESS_TOKEN, (err, data) => {
            if (err) {
                res.sendFile(path.join(__dirname, '../views/login.html'));
            }
            else {
                res.redirect('/');
            }

        })
    }
    else {
        console.log('token is undefined');
        res.sendFile(path.join(__dirname, '../views/login.html'));
    }


}
const postLogin = (req, res) => {
    const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
    console.log('ktos probuje sie zalogowac');
    const { username, password } = req.body;

    connectToDB()
        .then((client) => {
            client.connect()
        })
        .then(() => {
            return (client)
        })
        .catch((error) => {
            console.log('error przy laczeniue z baza danych', error);
        })
        .then((client) => {
            return (client.db('todoapp').collection('users').find({
                "username": username,
                "password": password,
            }).toArray())
        })
        .then((odp) => {
            console.log('odp', odp)
            return (odp);
        })
        .catch((error) => {
            console.log('jaki dziwny error przy logowaniu xd');
        })
        .then((loginstatus) => {
            console.log('loginstatus;', loginstatus)
            if (loginstatus.length > 0) {
                const token = jwt.sign({ username }, ACCESS_TOKEN)
                res.cookie('token', token);
                res.json({
                    logged: true,
                    info: 'Udalo sie zalogowac',
                });
            }
            else {
                res.json({
                    logged: false,
                    info: 'Wystapil blad logowania',
                })
            }
        })
}
module.exports = { getLogin, postLogin }; 