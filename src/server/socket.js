var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
// socket.io 每个30秒会 服务端会发送2 客户端会发送3 以此保存心跳 
// 为什么要抱持心跳 两者之间长时间没有数据传输，网络防火墙可能会断开该链接已释放网络资源
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
// 创建连接
io.on("connection", function (socket) {
  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
  //  on接收客户端
  socket.on("chat message", function (msg) {
    console.log("client:", msg);
    // emit 发送客户端
    io.emit("chat message", "server:" + msg);
  });
  setInterval(()=>io.emit("chat message", `服务端主动推送数据了：${new Date().toLocaleString()}`),30000)
});

http.listen(3000, "0.0.0.0", function () {
  console.log("listening on http://localhost:3000/");
});
