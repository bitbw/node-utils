/**
 * @description: sql 语句中的 keyWord 进行转义
 * @param {*} keyWord
 * @return {*}
 */
function sqliteEscape(keyWord) {
  if(typeof keyWord !== "string"){
    return keyWord
  }
  // '单引号在sql语句中会报错，需要转换成两个单引号 ''
  keyWord = keyWord.replace(/'/g, "''");
  // keyWord = keyWord.replace(/\//g, "//");
  // keyWord = keyWord.replace(/\[/g, "/[");
  // keyWord = keyWord.replace(/\]/g, "/]");
  // keyWord = keyWord.replace(/%/g, "/%");
  // keyWord = keyWord.replace(/&/g, "/&");
  // keyWord = keyWord.replace(/_/g, "/_");
  // keyWord = keyWord.replace(/\(/g, "/(");
  // keyWord = keyWord.replace(/\)/g, "/)");
  return keyWord;
}

module.exports = sqliteEscape
