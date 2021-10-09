const fs = require("fs").promises;
const path = require("path");
const YAML = require("yaml");
const dirPath = "C:/E盘资料/my-blog/my-blog/source/_posts";
(async function () {
  let files = await fs.readdir(dirPath);
  for (const fileName of files) {
    if (!/.md/.test(fileName)) continue;
    const filePath = path.resolve(dirPath, fileName);
    const articleOrigin = await fs.readFile(filePath, "utf-8");
    const { titleObj, contentData } = genArticleDate(articleOrigin);
    

  }
})();

function genArticleDate(articleOrigin) {
  const datas = articleOrigin.split("---");
  console.log("Bowen: genArticleDate -> datas[1]", datas[1]);
  const temp = datas[1].replace(/\t/g, "");
  console.log("Bowen: genArticleDate -> temp", temp);
  const titleObj = YAML.parse(temp);
  console.log("Bowen: genArticleDate -> titleData", titleData);
  const contentData = datas[2];
  return {
    titleObj,
    contentData,
  };
}

