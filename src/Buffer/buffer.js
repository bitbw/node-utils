/*
 * @Description: Buffer 使用
 * @LastEditors: zhangbowen
 * @LastEditTime: 2021-05-04 13:11:53
 */

const { Buffer } = require('buffer')
// console.log("Bowen ~ file: buffer.js ~ line 8 ~ Buffer", Buffer)
// // let str =  "hello Buffer"
let str =  "hello 世界" // 汉字占用3字节
let buf = Buffer.from(str)
for (const b of buf) {
console.log("Bowen ~ file: buffer.js ~ line 12 ~ b",String.fromCharCode(b))
    
}
console.log("Bowen ~ file: buffer.js ~ line 10 ~ buf", buf)
// console.log("Bowen ~ file: buffer.js ~ line 10 ~ buf", buf.toString())
console.log("Bowen ~ file: buffer.js ~ line 18 ~ buf.length", buf.length) //buf.length指占用的字节数


 buf = Buffer.alloc(10) //创建了一个占用10个字节的缓冲区(从内存中开辟一块10个字节的空间)  并全部重置为00  
console.log("Bowen ~ file: buffer.js ~ line 22 ~ buf", buf) // <Buffer 00 00 00 00 00 00 00 00 00 00>
console.log(buf.length) // 10  buf.length指占用的字节数
