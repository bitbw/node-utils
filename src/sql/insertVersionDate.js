const path = require("path");
const fs = require("fs").promises;
const os = require("os");
const sqlite3 = require("@journeyapps/sqlcipher").verbose();
const dbPath = path.resolve(`C:/Users/WX03/Desktop/iConfig开发/根据退市时间设置状态/test`, `iconfig_sys.config`);
const { handleExecSql, handleGetAll } = require("./index");
const DB = new sqlite3.Database(dbPath);
let versions = Array.from({ length: 4 },(i, index) => index + 1);
/**
 * @description: 添加软件迭代数据
 * @param {*} table
 * @return {*}
 */
async function handleoInsertVersionDate(table) {
  console.time("insertall");
  let querySql = `SELECT * FROM  ${"t_def_software_info"}`;
  let res = await handleGetAll(querySql, DB);
  let tables = ["t_def_a6p_info", "t_def_swma_info"];
  for (const sw of res) {
    let iteration = [];
    for (const version of versions) {
      iteration.push({ version });
    }
    let swmaIteration = [];
    for (const table of tables) {
      let swVersion = sw.swVersion ? `swVersion='${sw.swVersion}' AND` : "";
      let sql = `SELECT * FROM  ${table}  WHERE ${table == "t_def_hpo_info" ? "" : swVersion}  swFCCode='${
        sw.FCCode
      }' AND machineType='${sw.machineType}' AND version=1`;
      let items = await handleGetAll(sql, DB);
      if (items && items.length) {
        for (const item of items) {
          // 添加 tables
          await handleInsert(item, table);
          if (table === "t_def_swma_info") {
            swmaIteration.push({
              FCCode: item.FCCode,
              iteration
            });
          }
        }
      }
    }
    // 添加软件
    await handleInsert(sw, "t_def_software_info");
    // 添加迭代信息
    let sql = `INSERT INTO t_def_shoftware_iterative_relationship 
    ("PNCode", "modelName", "modelType", "FCCode", "swVersion", "type", "machineType", "swIteration", "a6pIteration", "swmaIteration", "hpoIteration", "version", "status") 
    VALUES (
        '${sw.PNCode}',
        '${sw.modelName}',
        '${sw.modelType}',
        '${sw.FCCode}',
        ${sw.swVersion ? `'${sw.swVersion}'` : "NULL"},
        '${sw.type}',
        '${sw.machineType}',
        '${JSON.stringify(iteration)}',
        '${JSON.stringify(iteration)}',
        '${JSON.stringify(swmaIteration)}',
        '${JSON.stringify(iteration)}',
        '${1}',
        '${sw.status}'
        );`;
    await handleExecSql(sql, DB);
  }
  //  hpo
  querySql = `SELECT * FROM ${"t_def_hpo_info"}`;
  res = await handleGetAll(querySql, DB);
  for (const hpo of res) {
    await handleInsert(hpo, "t_def_hpo_info");
  }
  console.timeEnd("insertall");
}

async function handleInsert(item, table) {
  let name = item.nameCHN;
  for (const i of versions.slice(1)) {
    item.version = i;
    item.nameCHN = name + `版本${i}`;
    Reflect.deleteProperty(item, "id");
    let keys = Object.keys(item).join(",");
    let values = Object.values(item).join(`','`);
    values = `'${values}'`.replace(/\'\'/g, "NULL");
    let sql = `INSERT INTO ${table} (${keys})VALUES(${values}) `;
    let result = await handleExecSql(sql, DB);
  }
  // for (let i = 2; i < 5; i++) {
  //   item.version = i;
  //   item.nameCHN = name + `版本${i}`;
  //   Reflect.deleteProperty(item, "id");
  //   let keys = Object.keys(item).join(",");
  //   let values = Object.values(item).join(`','`);
  //   values = `'${values}'`.replace(/\'\'/g, "NULL");
  //   let sql = `INSERT INTO ${table} (${keys})VALUES(${values}) `;
  //   let result = await handleExecSql(sql, DB);
  // }
}

async function handleDelete() {
  let tables = ["t_def_software_info", "t_def_swma_info", "t_def_a6p_info", "t_def_hpo_info"];
  let res;
  for (const table of tables) {
    try {
      res = await handleExecSql(`DELETE FROM  ${table}  WHERE version=2 OR version=3;`, DB);
      console.log(`Bowen: handleDelete ${table} 删除成功-> res`, res);
    } catch (error) {
      console.log(`Bowen: handleDelete ${table} 删除失败-> error`, error);
    }
  }
}
/**
 * @description: 清空表方法
 * @param {*} tableName 需要清空的表的名称
 * @return {*}
 */
const clearTable = async tableName => {
  try {
    let res = await handleExecSql(`delete from ${tableName}`, DB);
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
    let res = await handleExecSql(`update sqlite_sequence SET seq = 0 where name ='${tableName}'  `, DB);
    console.log("张博文: --------------------------");
    console.log("张博文: clearTable 更新index成功 -> res", res);
    console.log("张博文: --------------------------");
  } catch (error) {
    console.log("张博文: ------------------------------");
    console.log("张博文: clearTable  更新index失败-> error", error);
    console.log("张博文: ------------------------------");
  }
};
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

//  清除数据
  // hendleClearTable(["t_def_shoftware_iterative_relationship"]);
  // handleDelete()

handleoInsertVersionDate();
