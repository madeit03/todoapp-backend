const path = require('path');
const mainPage = (req, res) => {
    console.log('someone got main page');
    res.sendFile(path.join(__dirname, '../views/index.html'))
}
module.exports = { mainPage };