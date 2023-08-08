const { connectToDB } = require('../config/db');
const crypto = require('crypto');
const putadd = (req, res) => {
    const { username } = req.user;
    const { content, done } = req.body;
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
            const data = client.db('todoapp').collection('users').findOneAndUpdate(
                { 'username': username },
                {
                    $push: {
                        list: {
                            'content': content,
                            'done': done,
                            'id': crypto.randomUUID(),
                        }
                    }
                },
                { returnOriginal: false },
            )
            return (data)
        })
        .then((data) => {
            if (data.lastErrorObject.updatedExisting) {
                return true

            }
            else {
                return false

            }
        })
        .then((info) => {
            return new Promise((resolve, reject) => {
                const client = connectToDB();
                resolve(client)
            })
                .then((client) => {
                    return new Promise((resolve, reject) => {
                        const data = client.db('todoapp').collection('users').find({
                            'username': username,
                        }).toArray();
                        resolve(data);

                    })
                        .then((data) => {
                            return ({
                                data,
                                info,
                            });
                        })
                })
        })
        .then((odp) => {
            const { data, info } = odp;
            res.json({
                'dodano': info,
                'list': data[0].list,
            })
        })


}
module.exports = { putadd };