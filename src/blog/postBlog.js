/*
 * @Description: 批量将hexo中的md文件上传博客园
 * @Autor: Bowen
 * @Date: 2021-10-09 16:56:43
 * @LastEditors: Bowen
 * @LastEditTime: 2023-01-10 19:09:52
 */

const fs = require("fs").promises;
const path = require("path");
const crypto = require("crypto");
const matter = require("gray-matter");
const { newPost, editPost } = require("./api");

// 发布所有的文章
async function handleAllPushPost(dirPath) {
  let files = await fs.readdir(dirPath);
  for (const fileName of files) {
    const filePath = path.resolve(dirPath, fileName);
    // dir 继续递归
    let stats = await fs.stat(filePath);
    if (stats.isDirectory()) {
      await handleAllPushPost(filePath);
      continue;
    }
    console.log("[********************************]");
    console.log("[fileName]", fileName);
    // await new Promise((r) => setTimeout(r, 1000), true);
    await handlePushPost(filePath);
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
  // if (contentHash && contentHash == nowContentHash) {
  //   console.log("[hash值未变退出当前循环]");
  //   return;
  // }
  // yaml中添加 hash
  data.hash = nowContentHash;
  // 文章数据
  const post = {
    description: content,
    title: data.title,
    categories: ['Markdown'],
  };
  let res;
  // 编辑
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

(async () => {
  await handleAllPushPost("C:/bowen/product/new-blog/docs");
  // await handleAllPushPost("C:/bowen/product/new-blog/blog");
})();
