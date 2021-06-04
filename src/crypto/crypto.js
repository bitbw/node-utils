
/**
 * crypto 模块提供了加密功能，包括对 OpenSSL 的哈希、HMAC、加密、解密、签名、以及验证功能的一整套封装。
 * 使用 require('crypto') 来访问该模块
 */
const crypto = require('crypto');
const hash = crypto.createHash('sha256');

hash.update('要创建哈希摘要的数据');
console.log(hash.digest('hex')); // 164345eba9bccbafb94b27b8299d49cc2d80627fc9995b03230965e6d8bcbf56