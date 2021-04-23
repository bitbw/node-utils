/*
 * @Description: xlsxConvertSQL  转换 xlsx 成 sql
 * @LastEditors: Bowen
 * @LastEditTime: 2021-04-23 14:27:18
 */

// 是否是 价格表
let forPriceTable = false;

const path = require("path");
const fs = require("fs").promises;
const os = require("os");
const sqlite3 = require("@journeyapps/sqlcipher").verbose();
const XLSX = require("xlsx");
const { toFixed } = require("../utils/number/index");
const xlsxPath = path.resolve(
  __dirname,
  "../assets/副本服务产品表-iconfig V2.0.xlsx"
);
// 读取工作簿
const workbook = XLSX.readFile(xlsxPath);
// 获取数据库
const dbPath = path.resolve(os.homedir(), `iConfig/iconfig_sys.config`);
"".replace;
let DB = new sqlite3.Database(dbPath);
/**
 * @description:  转换 xlsx 成 sql
 * @return {*} null
 */
async function handleXlsxConvertSql() {
  let sheet = workbook.Sheets["服务产品（具体FC）"];
  // 从6 - 24 行 （这里可以直接使用 for 循环）
  const tempArr = Array.from({ length: 19 }, (v, i) => i + 6);
  for (const i of tempArr) {
    const sqlInfo = {
      PNCode: sheet[`B${i}`].v,
      FCCode: sheet[`C${i}`].v,
      nameCHN: sheet[`G${i}`].v,
      nameENG: sheet[`H${i}`].v,
      descriptionCHN: sheet[`I${i}`].v,
      descriptionENG: sheet[`J${i}`].v,
      specialTips: sheet[`K${i}`].v.replace(/;;/, ""),
      listpriceUSD: toFixed(sheet[`D${i}`].v),
      listpriceRMB: toFixed(sheet[`E${i}`].v)
    };
    const {
      PNCode,
      FCCode,
      nameCHN,
      nameENG,
      descriptionCHN,
      descriptionENG,
      specialTips,
      listpriceUSD,
      listpriceRMB
    } = sqlInfo;
    let sql = "";
    if (forPriceTable) {
      sql = `INSERT INTO 't_def_component_listprice' 
              (PNCode, FCCode, nameCHN, nameENG, listpriceUSD, listpriceRMB, costUSD, costRMB, taxRate, category, attribute, type, subType, serverModel, serverName, serverPN, serverCategory, priceVersion, version, status) 
      VALUES ('${PNCod}', '${FCCode}', '${nameCHN}', '${nameENG}', '${listpriceUSD}', '${listpriceRMB}', '0', '0', '0.13', 'IPS service product', 'COMPONENT', 'SERVICE_COMPONENT', 'SERVICE', 'SERV-IPS', 'SERVICE', 'FUM-SERVICE-0000', 'IPS service product', '1', '1', '0');`;
    } else {
      sql = `INSERT INTO 't_def_component_independentService' 
      (PNCode, FCCode, nameCHN, nameENG, descriptionCHN, descriptionENG, specialTips, picture, icon, type, subType, serverModel, serverName, serverPN, serverCategory, AnnounceDate, GeneralAvailableDate, WDAnnounceDate, WithdrawDate, comment, CfgRule, disable, priority, inventory, inventoryClean, version, status) 
      VALUES ('${PNCode}', '${FCCode}', '${nameCHN}', '${nameENG}','${descriptionCHN}' , "${descriptionENG}", '${specialTips}', '', '', 'SERVICE_COMPONENT', 'SERVICE', 'SERV-IPS', 'SERVICE', 'FUM-SERVICE-0000', 'IPS service product', '2020/4/30', '2020/7/10', '2050/1/1', '2050/1/1', NULL, NULL, '0', '0', '100', '1', '1', '0');`;
    }
    sql = sql.replace(/\n/g, "");
    try {
      await handleInsert(sql);
      let log = "";
      try {
        log = await fs.readFile(path.resolve(__dirname, "main.log"), "utf8");
      } catch (error) {}
      await fs.writeFile(
        path.resolve(__dirname, "main.log"),
        log
          .concat(
            `\n--------${i}------------------------------------------------------------------------------------------\n`
          )
          .concat(sql)
      );
      console.log("success 插入成功");
    } catch (error) {
      let log = "";
      try {
        log = await fs.readFile(path.resolve(__dirname, "err.log"), "utf8");
      } catch (error) {}
      console.log("Bowen: handleXlsxConvertSql -> error", error);
      console.log("Bowen: sql", sql);
      fs.writeFile(
        path.resolve(__dirname, "err.log"),
        log
          .concat(
            `\n--------${i}------------------------------------------------------------------------------------------\n`
          )
          .concat(error.stack)
      );
    }
  }
}

/**
 * @description: 执行insert
 * @param {*} sqlInfo
 * @return { Promise } resolve 中 包含当前执行 sql
 */
function handleInsert(sql) {
  // console.log("Bowen: handleInsert -> sql", sql)
  return new Promise((resolve, reject) => {
    DB.serialize(() => {
      // 打开数据库
      DB.run("PRAGMA cipher_compatibility = 4", e => e && reject(e));
      DB.run(`PRAGMA key = 'IPS@@@IPS@@@DB'`, e => e && reject(e));
      DB.run(sql, e => {
        if (e) {
          reject(e);
        } else {
          // promise 中 必须要有 resolve
          resolve(sql);
        }
      });
    });
  });
}

handleXlsxConvertSql();
