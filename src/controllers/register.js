const path = require('path')
const { connectToDB } = require('../config/db');
const jwt = require('jsonwebtoken');
const getRegister = (req, res) => {
    const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
    const token = req.cookies.token;
    if (token != undefined) {
        console.log('token jakis istnieje');
        console.log('token:', token)
        jwt.verify(token, ACCESS_TOKEN, (err, data) => {
            if (err) {
                res.sendFile(path.join(__dirname, '../views/register.html'));
            }
            else {
                res.redirect('/');
            }
        })
    }
    else {
        console.log('token is undefined');
        res.sendFile(path.join(__dirname, '../views/register.html'));
    }
}
const postRegister = (req, res) => {
    const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
    const { username, password } = req.body;
    if (username.length > 2 && username.length < 8) {
        if (password.length > 3) {
            connectToDB()
                .then((client) => {
                    client.connect()
                })
                .then(() => {
                    return (client)
                })
                .catch((error) => {
                    console.error('error przy laczeniu za baza register', error);
                })
                .then((client) => {
                    return (
                        client.db('todoapp').collection('users').find({
                            username,
                        }).toArray())
                })
                .then((info) => {
                    if (info.length == 0) {
                        console.log('mozna zarejestrowac usera');
                        connectToDB()
                            .then((client) => {
                                // client.connect() zwraca promise
                                client.connect()
                                    .then(() => {
                                        return (
                                            client.db('todoapp').collection('users').insertOne({
                                                username,
                                                password,
                                                list: []
                                            }))
                                            .then((info) => {
                                                if (info.insertedId != undefined) {
                                                    const token = jwt.sign({ username }, ACCESS_TOKEN,)
                                                    res.cookie('token', token);
                                                    res.json({
                                                        zarejestrowano: true,
                                                        info: 'Udalo sie zarejestrowac konto',
                                                    })
                                                }
                                                else {
                                                    res.json({
                                                        zarejestrowano: false,
                                                        info: 'Blad przy insertowaniu',
                                                    })
                                                }
                                            })
                                            .catch((error) => {
                                                res.json({
                                                    zarejestrowano: false,
                                                    info: 'blad',
                                                })
                                            })
                                    })
                                    .catch((error) => {
                                        res.json({
                                            zarejestrowano: false,
                                            info: 'blad',
                                        })
                                    })
                            })
                            .catch((error) => {
                                console.error('error', error);
                            })
                    }
                    else {
                        res.json({
                            zarejestrowano: false,
                            info: 'Ta nazwa uzytkownika jest zajęta',
                        })
                    }
                })
                .catch((error) => {
                    res.json({
                        zarejestrowano: false,
                        info: 'Blad przy insertowaniu',
                    })
                })

        }
        else {
            res.json({
                zarejestrowano: false,
                info: 'Hasło musi mieć co najmniej 4 znaki',
            })
        }
    }
    else {
        res.json({
            zarejestrowano: false,
            info: 'Nazwa użytkownika musi byc dluższa niz 2 znaki i krótsza niż 8 znaków'
        })
    }


}
module.exports = { getRegister, postRegister };
