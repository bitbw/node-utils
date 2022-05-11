(async function name() {
  const fs = require("fs").promises;
  const path = require("path");
  let ruleStr = await fs.readFile(
    path.resolve(__dirname, "../assets/rule"),
    "utf-8"
  );
  /**
   * @description:  eval 方法
   * @param { 原始字符串 }  接收的必须是原始字符串 不能是string对象
   * @return {*} 执行字符串的返回值
   */
  let server = eval(ruleStr);
  console.log("server", server);
})();

