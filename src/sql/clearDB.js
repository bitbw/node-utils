/*
 * @Description: 清空表 并 重置下标
 * @LastEditors: Bowen
 * @LastEditTime: 2021-07-22 10:18:03
 */


const path = require("path");
const fs = require("fs").promises;
const os = require("os");
const sqlite3 = require("@journeyapps/sqlcipher").verbose();
// const dbPath = path.resolve(os.homedir(), `iConfig/iconfig_sys.config`);
const dbPath = path.resolve(os.homedir(), `iConfig_TEST/iconfig_user.config`);
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

/**
 * @description: 清空多个表
 * @param {*} tables 表名称数组
 * @return {*}
 */
function hendleClearTable(tables) {
  for (const table of tables) {
    clearTable(table);
  }
}

hendleClearTable(["t_config_info","t_config_component","t_schema_product_list","t_schema_info"]);
