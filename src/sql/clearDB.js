/*
 * @Description: 清空表 并 重置下标
 * @LastEditors: zhangbowen
 * @LastEditTime: 2021-03-05 12:59:48
 */


const path = require("path");
const fs = require("fs").promises;
const os = require("os");
const sqlite3 = require("@journeyapps/sqlcipher").verbose();
const dbPath = path.resolve(os.homedir(), `iConfig/iconfig_sys.config`);
"".replace;
const DB = new sqlite3.Database(dbPath);

/**
 * @description: 清空表方法
 * @param {*} tableName 需要清空的表的名称
 * @return {*}
 */
const clearTable = async tableName => {
  try {
    let res = await handleExecSql(`delete from  ${tableName}`);
    console.log("张博文: --------------------------");
    console.log("张博文: clearTable 删除成功 -> res", res);
    console.log("张博文: --------------------------");
  } catch (error) {
    console.log("张博文: ------------------------------");
    console.log("张博文: clearTable  删除失败-> error", error);
    console.log("张博文: ------------------------------");
    return;
  }
  try {
    let res = await handleExecSql(
      `update sqlite_sequence SET seq = 0 where name ='${tableName}'  `
    );
    console.log("张博文: --------------------------");
    console.log("张博文: clearTable 更新index成功 -> res", res);
    console.log("张博文: --------------------------");
  } catch (error) {
    console.log("张博文: ------------------------------");
    console.log("张博文: clearTable  更新index失败-> error", error);
    console.log("张博文: ------------------------------");
  }
};

function handleExecSql(sql) {
  return new Promise((resolve, reject) => {
    DB.serialize(() => {
      DB.run("PRAGMA cipher_compatibility = 4", e => e && reject(e));
      DB.run(`PRAGMA key = "IPS@@@IPS@@@DB"`, e => e && reject(e));
      DB.run(`${sql}`, e => e && reject(e));
    });
    resolve(true);
  });
}


function hendleClearTable(tables) {
  for (const table of tables) {
    clearTable(table);
  }
}

hendleClearTable(["t_def_component_independentService"]);
