/*
 * @Description: 批量将hexo中的md文件上传博客园
 * @Autor: Bowen
 * @Date: 2021-10-09 16:56:43
 * @LastEditors: Bowen
 * @LastEditTime: 2023-01-13 15:07:43
 */

const fs = require("fs").promises;
const path = require("path");
const crypto = require("crypto");
const matter = require("gray-matter");
const {
  newPost,
  editPost,
  readAndUploadSM,
  downloadAndUploadSM,
} = require("./api");

// 发布所有的文章
async function handleAllPushPost(dirPath, replace = false) {
  let files = await fs.readdir(dirPath);
  for (const fileName of files) {
    const filePath = path.resolve(dirPath, fileName);
    // dir 继续递归
    let stats = await fs.stat(filePath);
    if (stats.isDirectory()) {
      await handleAllPushPost(filePath, replace);
      continue;
    }
    console.log("[********************************]");
    console.log("[fileName]", fileName);
    if (replace) {
      await replaceImgUrl(filePath);
    } else {
      await handlePushPost(filePath);
    }
  }
}

// 根据path修改或者新建文章
async function handlePushPost(filePath) {
  const fileName = path.basename(filePath);
  // 解析 md 文件
  const grayMatterFile = matter.read(filePath);
  const { data, content } = grayMatterFile;
  if (!data || !data.title) return;
  // 获取当前哈希值 对比 之前的 哈希
  const hash = crypto.createHash("sha256");
  hash.update(content);
  let nowContentHash = hash.digest("hex");
  let { cnblogs, hash: contentHash } = data;
  if (contentHash && contentHash == nowContentHash) {
    console.log("[hash值未变退出当前循环]");
    return;
  }
  // yaml中添加 hash
  data.hash = nowContentHash;
  // 文章数据
  const categories = Array.isArray(data.tags) ? data.tags : [];
  // TODO: data.? 看自己的 md 文档是如何配置
  const post = {
    description: content,
    title: data.title,
    // 注意 要以 Markdown 格式发布 必须在 categories 中 添加  "[Markdown]"
    categories: ["[Markdown]"].concat(categories),
  };
  let res;
  // 请求
  if (cnblogs && cnblogs.postid) {
    console.log("[-------------修改-------------]");
    try {
      res = await editPost(cnblogs.postid, post, true);
    } catch (error) {
      console.log("[修改失败]", error.message);
      throw Error(error.message);
    }
    console.log("[修改成功]", res);
  } else {
    console.log("[-------------新建-------------]");
    data.cnblogs = {};
    try {
      res = await newPost(post, true);
    } catch (error) {
      console.log("[上传失败]", error.message);
      throw Error(error.message);
    }
    console.log("[上传成功]", res);
    // yaml中添加 postid
    data.cnblogs.postid = res;
  }
  // 回写数据
  const str = grayMatterFile.stringify();
  await fs.writeFile(filePath, str);
  console.log("[回写成功]", fileName);
  // 等待 1分钟 后继续下一个
  await new Promise((r) => setTimeout(r, 3500, true));
}

// 替换 md 文件中的图片 url 地址
async function replaceImgUrl(filePath) {
  const fileName = path.basename(filePath);
  // 解析 md 文件 
  const grayMatterFile = matter.read(filePath);
  let { data, content } = grayMatterFile;
  if (!data || !data.title) return;
  const reg = /!\[.*\]\((.*)\)/g;
  const reg2 = /!\[.*\]\((.*)\)/;
  const imgUrls = content.match(reg);
  if (!imgUrls || !imgUrls.length) return content;
  for (const [index, imgUrl] of imgUrls.entries()) {
    const url = imgUrl.match(reg2)[1];
    const reg = new RegExp("https://bitbw.top/public/img/my_gallery/");
    if (!reg.test(url)) continue;
    console.log(`[替换URL ${index + 1}]`, url);
    try {
      const newUrl = await uploadImg(url, filePath);
      if (newUrl.message) {
        throw Error(newUrl.message);
      }
      if (!newUrl) {
        throw Error("没有返回 newUrl");
      }
      content = content.replace(url, newUrl);
      console.log(`[替换成功 ${index + 1}]`, newUrl);
    } catch (error) {
      console.log(`[替换失败 ${index + 1}] `, error.message);
    }
  }
  grayMatterFile.content = content;
  const str = grayMatterFile.stringify();
  await fs.writeFile(filePath, str);
  console.log("[回写成功]", fileName);
}
// 下载并上传图片
async function uploadImg(imgPath, filePath) {
  // 测试是否为 url
  const httpTest = /^http/;
  // 网络图片
  if (httpTest.test(imgPath)) {
    return downloadAndUploadSM(imgPath);
  } else {
    let curPath;
    if (path.isAbsolute(imgPath)) {
      curPath = imgPath;
    } else {
      const dirname = path.dirname(filePath);
      curPath = path.resolve(dirname, imgPath);
    }
    return readAndUploadSM(curPath);
  }
}

(async () => {
  // await handleAllPushPost("C:/bowen/product/new-blog/docs");
  // await handleAllPushPost("C:/bowen/product/new-blog/blog");
  await handleAllPushPost("C:/bowen/product/new-blog/docs", true);
  await handleAllPushPost("C:/bowen/product/new-blog/blog", true);
  // await replaceImgUrl(
  //   "C:/bowen/product/new-blog/blog/转载-node-pre-gyp以及node-gyp的源码简单解析（以安装sqlite3为例）/test.md"
  // );
})();
