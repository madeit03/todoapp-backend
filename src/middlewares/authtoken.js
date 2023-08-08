const authToken = ((req, res, next,) => {
    const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
    const jwt = require('jsonwebtoken');
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.json({
            logged: false,
            info: 'empty token',
        })
    }
    else {
        jwt.verify(token, ACCESS_TOKEN, (err, data) => {
            if (err) {
                res.json({
                    logged: false,
                    info: 'Authorization problem',
                })
            }
            else {
                req.user = data;
                next();
            }
        })
    }
})
module.exports = { authToken };