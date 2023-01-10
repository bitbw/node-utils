/*
 * @Description: 博客园 api 封装 ，common 中填写 用户名和密码
 * @Autor: Bowen
 * @Date: 2021-10-09 16:07:25
 * @LastEditors: Bowen
 * @LastEditTime: 2023-01-09 18:48:32
 */
// 解析 xml
const parser = require("xml2json");
const axios = require("axios");
const fs = require("fs").promises;

const _axios = axios.create();

const common = `
<param>
<value><string>bitbw</string></value>
</param>
<param>
<value><string>bowen591005606</string></value>
</param>
`;

// 添加响应拦截器
axios.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    const json = parser.toJson(response.data);
    const data = JSON.parse(json);
    return data;
  },
  (error) => {
    // 对响应错误做点什么
    let msg = error.response && error.response.data.message ? error.response.data.message : error;
    console.error(error.response ? `${error.response.status} : ${msg}` : `网络不可用`);
    return Promise.reject(error);
  }
);
// 添加请求拦截器
axios.interceptors.request.use(
 async (config) => {
   await fs.writeFile("./data.xml",config.data)
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
// 发布或修改文章
function pushPost({ type = "add", content, title, postid }) {
  const contentXML =  XMLEscape(content)
  const titleXML = XMLEscape(title)
  // <string><![CDATA[${content}]]></string>
  //  <string>${contentXML}</string>
  //  <string>${titleXML}</string>
  return axios.post(
    "https://rpc.cnblogs.com/metaweblog/bitbw",
    `<?xml version="1.0"?>
    <methodCall>
    <methodName>metaWeblog.${type === "add" ? "newPost" : "editPost"}</methodName>
    <params>
    <param>
        <value><string>${type === "add" ? "" : postid}</string></value>
    </param>
    ${common}
        <param>
            <value>
                    <struct>
                        <member>
                            <name>description</name>
                            <value>
                              <string>${contentXML}</string>
                            </value>
                        </member>
                        <member>
                            <name>title</name>
                            <value>
                              <string>${titleXML}</string>
                            </value>
                        </member>
                        <member>
                            <name>categories</name>
                            <value>
                                <array>
                                    <data>
                                        <value>
                                            <string>[Markdown]</string>
                                        </value>
                                    </data>
                                </array>
                            </value>
                        </member>
                    </struct>
                </value>
        </param>
        <param>
            <value><boolean>0</boolean></value>
        </param>
    </params>
    </methodCall>`
  );
}
// 获取文章数据
function getPost({ postid }) {
  return axios.post(
    "https://rpc.cnblogs.com/metaweblog/bitbw",
    `<?xml version="1.0"?>
<methodCall>
 <methodName>metaWeblog.getRecentPosts</methodName>
  <params>
    <param>
        <value><string>${000000}</string></value>
    </param>
   ${common}
  </params>
  <param>
    <value><i4>1</i4></value>
  </param>
</methodCall>`
  );
}
// 转义引起XML报错的特殊字符
function XMLEscape(content){
  if(!content){
    debugger
  }
  let newContent =content
  newContent = newContent.replace(/&/g, "&amp;");
  newContent = newContent.replace(/</g, "&lt;");
  newContent = newContent.replace(/>/g, "&gt;");
  newContent = newContent.replace(/"/g, "&quot;");
  newContent = newContent.replace(/'/g, "&apos;");
  return newContent
}


module.exports = {
  pushPost,
  getPost,
};



// var xml = "<foo attr=\"value\">bar</foo>";
// console.log("input -> %s", xml)
// // xml to json
// var json = parser.toJson(xml);
// console.log("to json -> %s", json);

// // json to xml
// var xml = parser.toXml(json);
// console.log("back to xml -> %s", xml)

// blogid 623687 url https://www.cnblogs.com/bitbw/ blogName _Bowen
// getPost(15392207).then(res=>{
//   console.log("Bowen: res", res)

//   })
