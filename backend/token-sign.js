const jwt = require('jsonwebtoken');

const secret = 'xxx';
const payload = {
    sub: 1,
    role: 'admin'
}

function signToken(payload, secret) {
    return jwt.sign(payload, secret);
}

const token = signToken(payload, secret);