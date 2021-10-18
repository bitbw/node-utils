// 使用第三方包

import sha256 from 'crypto-js/sha256.js';
import hmacSHA512 from 'crypto-js/hmac-sha512.js';
import Base64 from 'crypto-js/enc-base64.js';

const [message, nonce, path, privateKey] = ['my message','nonce',"path","privateKey"]// ...
const hashDigest = sha256(nonce + message);
const hmacDigest = Base64.stringify(hmacSHA512(path + hashDigest, privateKey));

import CryptoJS from "crypto-js";
  
// Encrypt
var ciphertext = CryptoJS.AES.encrypt("my message", "secret key 123").toString();

// Decrypt
var bytes = CryptoJS.AES.decrypt(ciphertext, "secret key 123");
var originalText = bytes.toString(CryptoJS.enc.Utf8);
console.log(originalText); // 'my message'
function test(){
    arguments
    console.log("Bowen: test -> arguments", arguments)
}
test()