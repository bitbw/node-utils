import { remark } from "remark";
import fs from "fs";
import path from "path";
const buf = fs.readFileSync(
  "C:\\bowen\\product\\new-blog\\blog\\最好用的内网穿透工具合集.md"
);
const mdast = remark.parse(buf);
const findImg = (node) => {
    if (node.type === "image") {
        console.log(node.url);
        const httpTest = /(https:\/\/)|(https:\/\/)/
        let res =  httpTest.test(node.url)
        console.log('[Bowen] ===== httpTest ===== res', res)
        res = path.isAbsolute(node.url)
        console.log('[Bowen] ===== isAbsolute ===== res', res)
       
    }
    if (node.children) {
        node.children.forEach(findImg);
    }
}
findImg(mdast)
// const header = mdast.children.find((item) => item.type === "heading");
// if (header) {
//   const text = header.children.find((item) => item.type === "text");
//   text.value = "修改测试";
// }
const md = remark.stringify(mdast);
