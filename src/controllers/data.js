const { connectToDB } = require('../config/db');
const postData = (req, res,) => {
    const { username } = req.user;
    connectToDB()
        .then((client) => {
            return (client.db('todoapp').collection('users').find({
                "username": username
            }).toArray())
                .then((data) => {
                    console.log('datahal', data)
                    res.json({
                        username,
                        logged: true,
                        info: 'wszystko OK',
                        list: data[0].list,
                    })
                })
                .catch((error) => {
                    console.log(error);
                })
        })
        .catch((error) => {
            console.error('error data:', error);
        })
}
module.exports = { postData };