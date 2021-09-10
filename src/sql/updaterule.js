/*
 * @Description:
 * @Autor: Bowen
 * @Date: 2021-09-10 15:35:04
 * @LastEditors: Bowen
 * @LastEditTime: 2021-09-10 16:37:56
 */

const path = require("path");
const fs = require("fs").promises;
const os = require("os");
const sqlite3 = require("@journeyapps/sqlcipher").verbose();
// const dbPath = path.resolve(os.homedir(), `iConfig/iconfig_user.config`);
const dbPath = path.resolve(os.homedir(), `iConfig_TEST/iconfig_sys.config`);
const DB = new sqlite3.Database(dbPath);
const sqliteEscape = require("../utils/sql/sqliteEscape");
const { handleExecSql } = require("./index");
/**
 * @description: 更新规则
 * @param {*} basePath .rule 文件路径
 * @return {*}
 */
async function updateRule(basePath) {
  let files = await fs.readdir(basePath);
  for (const file of files) {
    let flieName = path.basename(file, ".rule");
    let filePath = path.join(basePath, file);
    let fileStr = await fs.readFile(filePath, "utf-8");
    console.log("Bowen: updateRule -> flieName", flieName);
    console.log("Bowen: updateRule -> filePath", filePath);
    //   console.log("Bowen: updateRule -> fileStr", fileStr)
    let updateRow = ` UPDATE t_product SET baseRule ='${sqliteEscape(fileStr)}'  WHERE modelType = "${flieName}" `;
    let res = await handleExecSql(updateRow, DB);
    if (res) {
      console.log(flieName, "  UPDATE SUCCESS");
    }
  }
}

updateRule("C:/ls-project03/app/file/rule_backup");
