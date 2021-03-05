/*
 * @Description: Express Server
 * @LastEditors: zhangbowen
 * @LastEditTime: 2020-11-16 17:50:40
 */

const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.static("public"));
// 防止跨域
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  //第二个参数,是一个*号,表示任意域名下的页面都可以都可以请求请求这台服务器;
  //设置指定域名:
  //res.header("Access-Control-Allow-Origin", "http://baidu.com");
  //这样,baidu.com下面的网页,就可以ajax请求你的服务器了

  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  //第二个参数,为对方可以以哪种HTTP请求方式请求你的服务器,根据自己的情况酌情设置

  res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
app.get('/getSysDB',(req,res)=>{
  res.send({
    version:2,
    priceVersion:2,
    url:'http://localhost:8848/download/iconfig_sys.config'
  })
})

app.listen(8848, e => {
  if (!e) {
    console.log("启动成功");
  }
});
