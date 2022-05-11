/*
 * @Description: 测试async的执行
 * @LastEditors: Bowen
 * @LastEditTime: 2022-05-06 09:39:26
 */

(async function name(params) {
  console.time("testForEach");
  //   await new Promise(r => setTimeout(r, 1000));
  console.timeEnd("testForEach");
  let api = new Promise((resolve, reject) => {
    let flag = false;
    setTimeout(() => {
      if (flag) {
        resolve(true);
      } else {
        reject("错误了！！");
      }
    }, 100);
  });
  let res = await api
    .catch(err => {
      console.log("Bowen: name -> err", err);
    })
    .finally(res => {
      console.log("finally -> res", res);
    });
  console.log("Bowen: name -> res", res);
})();
async function getTitle(url) {
  let response = await fetch(url);
  let html = await response.text();
  return html.match(/<title>([\s\S]+)<\/title>/i)[1];
}
getTitle("https://tc39.github.io/ecma262/").then(console.log);
