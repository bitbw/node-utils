/*
 * @Description: Express Server
 * @LastEditors: Bowen
 * @LastEditTime: 2021-10-28 14:00:09
 */

const express = require("express");
var bodyParser = require("body-parser");
var multiparty = require("multiparty");
const fs = require("fs");
const path = require("path");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true, useUnifiedTopology: true });
// 集合
const Cat = mongoose.model("Cat", { name: String });
//一条数据
// (async function () {
//   for (let i = 0; i < 11; i++) {
//     await new Cat({ name: "Zildjian" + i }).save()
//     console.log("meow");
//   }
// })();

// const kitty = new Cat({ name: "Zildjian" });
// kitty
//   .save()
//   .then(res => console.log("meow", res))
//   .catch(err => {
//     console.log("err", err);
//   });
// 挂载中间件
// app.use(formidable())

// app.use(bodyParser.json())

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

app.post("/crashReporter", (req, res) => {
  console.log("Bowen: req", req);
  var form = new multiparty.Form();
  form.parse(req, function (err, fields, files) {
    console.log("Bowen: files", files);
    console.log("Bowen: fields", fields);
    // res.writeHead(200, { "content-type": "text/plain" });
    // res.write("received upload:\n\n");
    // res.end(util.inspect({ fields: fields, files: files }));
  });
  // console.log("Bowen: req.files", req.files)
  // console.log("Bowen: req.fields", req.fields)
  res.send({
    code: "200",
    paramsVaildtor: null,
    obj: {},
    message: "数据查询成功",
    isNULLSearch: null,
    token: null,
    isShow: null,
  });
});

app.post("/test/formdata", (req, res) => {
  res.send({
    code: "200",
    paramsVaildtor: null,
    obj: {
      versionType: 0,
      versionDesc: "3月例行数据包更新-with ver1.5.1",
      releaseDate: "2021-04-01 15:41:31",
      downloadUrl: "http://218.57.146.118:8080/sys-iconfig/prod/iconfig_sys.config",
      isSend: 1,
      id: 101,
      versionHash: "null",
      isPublish: 1,
      disables: 1,
      versionCode: "1.1.39-20210401-0A",
      versionIdent: 2,
      createDate: "2021-04-01 15:41:24",
    },
    message: "数据查询成功",
    isNULLSearch: null,
    token: null,
    isShow: null,
  });
});

app.get("/out/api/getNewVersion", (req, res) => {
  res.send({
    code: "200",
    paramsVaildtor: null,
    obj: {
      versionType: 0,
      versionDesc: "3月例行数据包更新-with ver1.5.1",
      releaseDate: "2021-04-01 15:41:31",
      downloadUrl: "http://218.57.146.118:8080/sys-iconfig/prod/iconfig_sys.config",
      isSend: 1,
      id: 101,
      versionHash: "null",
      isPublish: 1,
      disables: 1,
      versionCode: "1.1.39-20210401-0A",
      versionIdent: 2,
      createDate: "2021-04-01 15:41:24",
    },
    message: "数据查询成功",
    isNULLSearch: null,
    token: null,
    isShow: null,
  });
});

app.get("/cat", (req, res) => {
  Cat.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
    // Cat.findOneAndUpdate({ name: kittens[0].name}, { name: 'jason bourne' }, (err,res)=>{
    // console.log("findOneAndUpdate: err,res", err,res)
    // })
    kittens[0].name = "hello kity";
    kittens[0].save();
    for (let cat of kittens) {
      console.log("name", cat.name);
    }
  });
});

// // express 使用 connect-history-api-fallback 插件 配合完成 vue-router 的 histroy 模式
// const history = require("connect-history-api-fallback");
// // history 中间件需要在 express.static 前面使用 不然会无效
// app.use(history());
// // dist 目录为优先公共目录
// app.use(express.static(path.join(__dirname, "../../public/dist/")));
// // 通过 public 下其他文件夹也可以获取内容
// app.use(express.static(path.join(__dirname, "../../public/")));

app.listen(8848, (e) => {
  if (!e) {
    console.log(`启动成功:http://localhost:8848`);
  }
});

function promisify(fn) {
  return function (...arg) {
    return new Promise((resovle, reject) => {
      function cb(e, res) {
        if (e) reject(e);
        else resovle(res);
      }
      fn(...arg, cb);
    });
  };
}
