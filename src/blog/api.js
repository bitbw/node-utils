const { HTTP } = require("./axios");
const FormData = require("form-data");
const fs = require("fs");
const apiUrl = "https://rpc.cnblogs.com/metaweblog/bitbw"; // use your blog API instead
const MetaWeblog = require("metaweblog-api");
const metaWeblog = new MetaWeblog(apiUrl);

const Authorization = "xxx"; // TODO :  use your smms Authorization

const username = "bitbw";
const password = "xxxxx"; // TODO: use your password
const blogid = "623687";
const appKey = "";
const numberOfPosts = 1;

async function uploadSM(stream) {
  let formdata = new FormData();
  formdata.append("smfile", stream);
  let res = await HTTP.uploadFile("https://smms.app/api/v2/upload", formdata, {
    headers: { Authorization },
  });
  if (res && res.code === "image_repeated") {
    return res.images;
  }
  if (!res.data) return res;
  return res.data.url;
}
async function downloadAndUploadSM(url) {
  let stream = await HTTP.get(encodeURI(decodeURI(url)), {
    responseType: "stream",
  });
  return uploadSM(stream);
}
async function readAndUploadSM(path) {
  let stream = fs.createReadStream(path);
  return uploadSM(stream);
}

module.exports = {
  getUsersBlogs: () => metaWeblog.getUsersBlogs(appKey, username, password),
  getRecentPosts: () =>
    metaWeblog.getRecentPosts(blogid, username, password, numberOfPosts),
  getCategories: () => metaWeblog.getCategories(blogid, username, password),
  getPost: (postid) => metaWeblog.getPost(postid, username, password),
  newPost: (post, publish) =>
    metaWeblog.newPost(blogid, username, password, post, publish),
  editPost: (postid, post, publish) => {
    return metaWeblog.editPost(postid, username, password, post, publish);
  },
  deletePost: () =>
    metaWeblog.deletePost(appKey, postid, username, password, publish),
  readAndUploadSM,
  downloadAndUploadSM,
};
