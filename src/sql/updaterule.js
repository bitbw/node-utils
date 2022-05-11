/*
 * @Description:
 * @Autor: Bowen
 * @Date: 2021-09-10 15:35:04
 * @LastEditors: Bowen
 * @LastEditTime: 2022-05-10 14:52:00
 */

const path = require("path");
const fs = require("fs").promises;
const os = require("os");
const sqlite3 = require("@journeyapps/sqlcipher").verbose();
const targetPath = "C:/ls-project03/app/file/rule_backup"
// const dbPath = path.resolve(os.homedir(), `iConfig/iconfig_user.config`);
const dbPath = path.resolve(os.homedir(), `iConfig/iconfig_sys.config`);
const DB = new sqlite3.Database(dbPath);
const sqliteEscape = require("../utils/sql/sqliteEscape");
const { handleExecSql, handleGetAll } = require("./index");
/**
 * @description: 根据文件更新sysDB baseRule 字段 
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
      console.log(flieName, "  UPDATE DB SUCCESS");
    }
  }
}
/**
 * @description: 根据 sysDB baseRule 更新 文件
 * @param {*} basePath .rule 文件路径
 * @return {*}
 */
async function updateFile(basePath) {
  let files = await fs.readdir(basePath);
  for (const file of files) {
    let flieName = path.basename(file, ".rule");
    let filePath = path.join(basePath, file);
    let fileStr = ""
    console.log("Bowen: updateRule -> flieName", flieName);
    console.log("Bowen: updateRule -> filePath", filePath);
    //   console.log("Bowen: updateRule -> fileStr", fileStr)
    let updateRow = `SELECT * FROM  t_product  WHERE modelType="${flieName}" `;
    let res = await handleGetAll(updateRow, DB);
    if (res && res.length) {
      fileStr = res[0].baseRule
      await fs.writeFile(filePath,fileStr);
      console.log(flieName, "  UPDATE FILE SUCCESS");
    }
  }
}


updateRule(targetPath);
// updateFile(targetPath);
