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

https://v.qq.com/x/page/h3310llutmb.html
https://v.qq.com/x/page/f3310kz6u85.html
https://v.qq.com/x/page/i3310q456k5.html
https://v.qq.com/x/page/v3310ckl2i9.html
https://v.qq.com/x/page/f3310vldg9b.html
https://v.qq.com/x/page/c3310xec5gp.html
https://v.qq.com/x/page/n3310t30h5k.html

