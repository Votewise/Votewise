var nacl = require('js-nacl').instantiate();
var bcrypt = require('bcryptjs');
var crypto = require('crypto');

var bcryptRounds = 10;

function newPassword(password, done) {
    bcrypt.hash(password, bcryptRounds, done);
}

function checkPassword(password, expectedHash, done) {
    bcrypt.compare(password, expectedHash, done);
}

// TODO: We need a better strategy for this key management.
var secretAuthKey = nacl.random_bytes(32);

function createToken(data) {
    var nonce = nacl.crypto_secretbox_random_nonce();
    var boxed = nacl.crypto_secretbox(
        nacl.encode_utf8(JSON.stringify(data)),
        nonce,
        secretAuthKey
    );

    return nacl.to_hex(nonce) + nacl.to_hex(boxed);
}

function parseToken(token) {
    var nonce = nacl.from_hex(token.slice(0, 48));
    var boxed = nacl.from_hex(token.slice(48));
    
    return JSON.parse(nacl.decode_utf8(
        nacl.crypto_secretbox_open(boxed, nonce, secretAuthKey)
    ));
}

module.exports = {
    newPassword:   newPassword,
    checkPassword: checkPassword,
    createToken:   createToken,
    parseToken:    parseToken
};