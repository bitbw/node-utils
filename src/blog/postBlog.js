/*
 * @Description: 批量将hexo中的md文件上传博客园
 * @Autor: Bowen
 * @Date: 2021-10-09 16:56:43
 * @LastEditors: Bowen
 * @LastEditTime: 2022-01-12 13:39:08
 */

const fs = require("fs").promises;
const path = require("path");
const YAML = require("yaml");
const crypto = require("crypto");

const { pushPost, getPost } = require("./api");

const dirPath = "C:/E盘资料/my-blog/my-blog/source/_posts";

// 发布所有的文章
async function hanleAllPushPost(dirPath) {
  let files = await fs.readdir(dirPath);
  for (const fileName of files) {
    if (!/\.md/.test(fileName)) continue;
    console.log("[********************************]");
    console.log("[fileName]", fileName);
    const filePath = path.resolve(dirPath, fileName);
    // await new Promise((r) => setTimeout(r, 1000), true);
    await handlePushPost(filePath);
  }
}
// 将文章原始字符分解为obj数据
function genArticleDate(articleOrigin) {
  const datas = articleOrigin.split("---");
  const temp = datas[1].replace(/\t/g, "");
  let titleObj;
  try {
    titleObj = YAML.parse(temp);
  } catch (error) {
    console.log("[YAML解析错误]", error);
    throw Error(error);
  }
  // datas.length > 3 为边际情况特殊处理一下
  const contentData = datas.length > 3 ? datas.slice(2).join("---") : datas[2];
  return {
    titleObj,
    contentData,
  };
}
// 将obj数据合成文章
function genArticleStr({ titleObj, contentData }) {
  const titleStr = "\n" + YAML.stringify(titleObj);
  const datas = ["", titleStr, contentData];
  const str = datas.join("---");
  return str;
}
// 根据path修改或者新建文章
async function handlePushPost(filePath) {
  const fileName = path.basename(filePath);
  const articleOrigin = await fs.readFile(filePath, "utf-8");
  const { titleObj, contentData } = genArticleDate(articleOrigin);
  const hash = crypto.createHash("sha256");
  hash.update(contentData);
  // 当前hash
  let nowContentHash = hash.digest("hex");
  let { cnblogs, hash: contentHash } = titleObj;
  let res;
  if (contentHash && contentHash == nowContentHash) {
    console.log("[hash值未变退出当前循环]");
    return;
  }
  // yaml中添加 hash
  titleObj.hash = nowContentHash;
  // 编辑
  if (cnblogs && cnblogs.postid) {
    console.log("[-------------修改-------------]");
    res = await pushPost({
      type: "edit",
      content: contentData,
      title: titleObj.title,
      postid: cnblogs.postid,
    });
    if (res.methodResponse.fault) {
      console.log(
        "[修改失败]",
        res.methodResponse.fault.value.struct.member[1].value.string
      );
      throw Error(res.methodResponse.fault.value.struct.member[1].value.string);
    }
    console.log("[修改成功]", res.methodResponse.params.param.value.boolean);
  } else {
    console.log("[-------------新建-------------]");
    titleObj.cnblogs = {};
    res = await pushPost({
      type: "add",
      content: contentData,
      title: titleObj.title,
    });
    res;
    if (res.methodResponse.fault) {
      console.log(
        "[上传失败]",
        res.methodResponse.fault.value.struct.member[1].value.string
      );
      throw Error(res.methodResponse.fault.value.struct.member[1].value.string);
    }
    console.log("[上传成功]", res.methodResponse.params.param.value.string);
    // yaml中添加 postid
    titleObj.cnblogs.postid = res.methodResponse.params.param.value.string;
  }
  // 回写数据
  const str = genArticleStr({ titleObj, contentData });
  await fs.writeFile(filePath, str);
  console.log("[回写成功]", fileName);
  // 等待 1分钟 后继续下一个
  await new Promise((r) => setTimeout(r, 35000, true));
}

// test
// handlePushPost("C:/E盘资料/my-blog/my-blog/source/_posts/js中的微观任务和宏观任务.md");
hanleAllPushPost(dirPath);
