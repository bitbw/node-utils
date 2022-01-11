/*
 * @Description: 
 * @Autor: Bowen
 * @Date: 2022-01-10 10:16:22
 * @LastEditors: Bowen
 * @LastEditTime: 2022-01-10 10:46:35
 */
const https = require('https');
// mock api
https.get('https://5374aade-6c49-4e44-b299-c43e753f47d9.mock.pstmn.io/api/test', (resp) => {
 let data = '';
  
 // A chunk of data has been recieved.
 resp.on('data', (chunk) => {
  // chunk : Buffer
  data += chunk.toString();
 });
  
 // The whole response has been received. Print out the result.
 resp.on('end', (e) => {
    console.log("data", data)
    try {
        const parsedData = JSON.parse(data);
        console.log(parsedData);
      } catch (e) {
        console.error(e.message);
      }
 });
  
}).on("error", (err) => {
 console.log("Error: " + err.message);
});