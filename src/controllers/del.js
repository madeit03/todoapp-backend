const { connectToDB } = require('../config/db');
const deldel = (req, res) => {
    const { username } = req.user;
    const { id } = req.body;
    console.log('username:', username);
    console.log('id:', id)
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
            const user = client.db('todoapp').collection('users').findOne({ username })
            return (user);
        })
        .then((user) => {
            const newList = user.list.filter((task) => {
                if (task.id != id) {
                    return task;
                }
                else {
                    return;
                }
            })
            return ({
                user,
                newList,
            });
        })
        .then((obj) => {
            const { user, newList } = obj;
            user.list = newList;
            return (user);
        })
        .then((user) => {
            return (
                connectToDB()
                    .then((client) => {
                        return ({
                            client,
                            user,
                        })
                    })
            )
        })
        .then((obj) => {
            const { client, user } = obj;
            const info = client.db('todoapp').collection('users').updateOne({ username }, { $set: user })
            return (info);
        })
        .then((info) => {
            if (info.modifiedCount > 0) {
                return 'deleted'
            }
            else {
                return 'id not found probably'
            }
        })
        .then((info) => {
            return (
                connectToDB()
                    .then((client) => {
                        return new Promise((resolve, reject) => {
                            const dbinfo = client.db('todoapp').collection('users').findOne({ username });
                            resolve(dbinfo);
                        })
                            .then((dbinfo) => {
                                return ({
                                    dbinfo,
                                    info,
                                }
                                )
                            })
                    })
            )
        })
        .then((obj) => {
            const { dbinfo, info } = obj;
            console.log('last dbinfo', dbinfo);
            console.log('last inf:', info);
            res.json({
                info,
                list: dbinfo.list,
            })
        })

}
module.exports = { deldel }