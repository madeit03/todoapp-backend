const { MongoClient } = require('mongodb');
const connectToDB = () => {
    return new Promise((resolve, reject) => {
        const uri = process.env.DB_URL_CONNECTION;
        if (client = new MongoClient(uri,)) {
            resolve(client);
        }
        else {
            reject('error');
        }
    })
}
module.exports = {
    connectToDB
};