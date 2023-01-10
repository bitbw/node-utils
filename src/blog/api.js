const MetaWeblog = require("metaweblog-api");
const apiUrl = "https://rpc.cnblogs.com/metaweblog/bitbw"; // use your blog API instead
const metaWeblog = new MetaWeblog(apiUrl);

const username ="bitbw"
const password ="F489768E2E8E25562E36808A6A6097942D444931811E93DBF29078E6299BACF8"
const blogid ='623687'
const appKey =''
const numberOfPosts =1

module.exports = {
  getUsersBlogs:()=> metaWeblog.getUsersBlogs(appKey, username, password),
  getRecentPosts:()=> metaWeblog.getRecentPosts(blogid, username, password, numberOfPosts),
  getCategories:()=> metaWeblog.getCategories(blogid, username, password),
  getPost:(postid)=> metaWeblog.getPost(postid, username, password),
  newPost: (post, publish)=> metaWeblog.newPost(blogid, username, password, post, publish),
  editPost: ( postid ,post, publish)=> {
     return  metaWeblog.editPost(postid, username, password, post, publish)
  },
  deletePost: ()=> metaWeblog.deletePost(appKey, postid, username, password, publish),
}