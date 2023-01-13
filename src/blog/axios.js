const axios = require("axios").default;

const HTTP = axios.create({
  maxBodyLength: Infinity, //设置适当的大小
});

// axios 上添加上传文件方法
HTTP.uploadFile = (url, formData, config) => {
  const headers = config && config.headers ? config.headers : {};
  return HTTP({
    method: "post",
    url,
    data: formData,
    headers: {
      ...formData.getHeaders(),
      ...headers,
    },
  });
};

// 添加请求拦截器
HTTP.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
HTTP.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

module.exports = {
  HTTP,
};
