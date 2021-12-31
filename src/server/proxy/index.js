const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();
const options = {
  target: "http://localhost:1080", // target host
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  /*   pathRewrite: {
    "^/api/old-path": "/api/new-path", // rewrite path
    "^/api/remove/path": "/path", // remove base path
  },
  router: {
    // when request.headers.host == 'dev.localhost:3000',
    // override target 'http://www.example.org' to 'http://localhost:8000'
    "dev.localhost:3000": "http://localhost:8000",
  }, */
};

// create the proxy (without context)
const exampleProxy = createProxyMiddleware(options);
app.use("/", (req, res, next) => {
  req, res;
  console.log("Bowen: req.rawHeaders[1]", req.rawHeaders[1])
  next();
});

app.use("/", exampleProxy);

app.listen(9000, function (e) {
  // 代理接口
  if (!e) {
    console.log("代理接口启动成功:http://localhost:9000:");
  }
});
