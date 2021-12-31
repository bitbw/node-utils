/*
 * @Description:
 * @Autor: Bowen
 * @Date: 2021-12-20 09:55:56
 * @LastEditors: Bowen
 * @LastEditTime: 2021-12-21 09:54:49
 */
var express = require("express");
const app = express();
const path = require("path");
// 防止跨域
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  //第二个参数,是一个*号,表示任意域名下的页面都可以都可以请求请求这台服务器;
  //设置指定域名:
  //res.header("Access-Control-Allow-Origin", "http://baidu.com");
  //这样,baidu.com下面的网页,就可以ajax请求你的服务器了
  res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  //第二个参数,为对方可以以哪种HTTP请求方式请求你的服务器,根据自己的情况酌情设置
  // res.header("X-Powered-By", " 3.2.1");
  // res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
app.use(
  express.static(path.join(__dirname, "public"), {
    maxAge: "1d",
    setHeaders: function (res, path, stat) {
      res.set("x-timestamp", Date.now());
    //   res.set("Cache-Control","private");
    },
  })
);

app.post("/api/test",(req,res)=>{
  console.log("post 进来了")
  res.header("Content-Type", "application/json;charset=utf-8");
  res.send("success")
})
app.get("/api/test",(req,res)=>{
  console.log("get 进来了")
  res.header("Content-Type", "application/json;charset=utf-8");
  res.send("success")
})

app.listen(3001, function (e) {
  if (!e) {
    console.log("listening on http://localhost:3001/");
  }
});
