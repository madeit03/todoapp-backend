const { connectToDB } = require('../config/db');
const putChange = (req, res) => {

    const { id, done, content } = req.body;
    const { username } = req.user;
    console.log(username)
    console.log('id:', id, 'done:', done, 'content:', content);

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
            return (client.db('todoapp').collection('users').findOne({ username }))
        })
        .then((res) => {
            let newList = [];
            res.list.map((ele) => {
                if (ele.id == id) {
                    if (content != undefined) {
                        ele.content = content;
                    }
                    if (done != undefined) {
                        ele.done = done;
                    }
                }
                newList.push(ele);
            })
            return (
                {
                    newList,
                    res
                }
            )
        })
        .then((obj) => {
            const { newList, res } = obj;
            // console.log('newlist', newList);
            // console.log('res', res);
            res.list = newList;
            return (res)
        })
        .then((res) => {
            console.log('ready:', res);
            return (
                connectToDB()
                    .then((client) => {
                        client.db('todoapp').collection('users').updateOne({ username }, { $set: res })
                        return (res)
                    })
            )
        })
        .then((odp) => {
            res.json({
                list: odp.list,
            })
        })
}
module.exports = { putChange };