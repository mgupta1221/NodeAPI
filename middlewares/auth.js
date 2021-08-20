
const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No Token found.');
    try {
        //validating the token
        console.log(config.get('jwtPrivateKey'));
        const decodedPayload = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decodedPayload;
        //next() is important in middlewares
        next();
    }
    catch (err) {
        res.status(400).send('Invalid Token.')
    }
}

module.exports = auth;