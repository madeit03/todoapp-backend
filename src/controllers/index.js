const { mainPage } = require('./mainpage');
const { getRegister, postRegister } = require('./register');
const { getLogin, postLogin } = require('./login');
const { postData } = require('./data');
const { putadd } = require('./add');
const { deldel } = require('./del');
const { putChange } = require('./change');
module.exports = {
    mainPage,
    getLogin,
    postLogin,
    postData,
    getRegister,
    postRegister,
    putadd,
    deldel,
    putChange,
}