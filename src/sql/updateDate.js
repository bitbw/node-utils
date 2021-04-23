const path = require("path");
const fs = require("fs").promises;
const os = require("os");
const sqlite3 = require("@journeyapps/sqlcipher").verbose();
const {
  DateFormat,
  oneDay,
  oneMonth,
  oneYear
} = require("../utils/date/index.js");
const getDate = (timestamp) => DateFormat("YYYY-MM-DD")(new Date(timestamp));
const currentTimestamp = Date.now();
const dbPath = path.resolve(
  `C:/Users/WX03/Desktop/iConfig开发/根据退市时间设置状态`,
  `iconfig_sys.config`
);
const { handleExecSql,handleGetAll } = require("./index");
const DB = new sqlite3.Database(dbPath);

async function handleUpdateDate() {
  let querySql = `SELECT * FROM t_def_component_listprice`;
  let res = await handleGetAll(querySql, DB);
  if (res && res.length) {
    let updateSql = "";
    let counter = -1;
    for (const [index, row] of res.entries()) {
      if ((index + 1) % 6 == 0) {
        counter = 0;
      } else {
        counter++;
      }
      let types = [
        "UNLISTED",
        "NORMAL",
        "NORMAL2",
        "DELISTING",
        "DELISTING2",
        "DELISTED"
      ];
      updateSql += getSql(row, types[counter]);
    }
    console.log("Bowen: handleUpdateDate -> updateSql", updateSql)
    try {
        await handleExecSql(updateSql, DB);
    } catch (error) {
        console.log("Bowen: handleUpdateDate -> error", error)
    }
  }
}

function getSql(row, type) {
  let sql = "UPDATE t_def_component_listprice SET ";
  switch (type) {
    case "UNLISTED":
      sql += `
            AnnounceDate='${getDate(currentTimestamp - oneDay)}',
            GeneralAvailableDate='${getDate(currentTimestamp + oneMonth)}',
            WDAnnounceDate='${getDate(currentTimestamp + oneYear)}',
            WithdrawDate='${getDate(currentTimestamp + oneYear + oneMonth)}'
            `;
      break;
    case "NORMAL":
      sql += `
            AnnounceDate='${getDate(currentTimestamp - oneMonth)}',
            GeneralAvailableDate='${getDate(currentTimestamp - oneMonth)}',
            WDAnnounceDate='',
            WithdrawDate=''
            `;
      break;
    case "NORMAL2":
      sql += `
            AnnounceDate='${getDate(currentTimestamp - oneMonth)}',
            GeneralAvailableDate='${getDate(currentTimestamp - oneMonth)}',
            WDAnnounceDate='${getDate(currentTimestamp + oneYear)}',
            WithdrawDate='${getDate(currentTimestamp + oneYear + oneMonth)}'
            `;
      break;
    case "DELISTING":
      sql += `
        AnnounceDate='${getDate(currentTimestamp - oneMonth * 2)}',
        GeneralAvailableDate='${getDate(currentTimestamp - oneMonth * 2)}',
        WDAnnounceDate='${getDate(currentTimestamp - oneDay)}',
        WithdrawDate='${getDate(currentTimestamp + oneMonth)}'
        `;
      break;
    case "DELISTING2":
      sql += `
        AnnounceDate='${getDate(currentTimestamp - oneMonth * 2)}',
        GeneralAvailableDate='${getDate(currentTimestamp - oneMonth * 2)}',
        WDAnnounceDate='',
        WithdrawDate='${getDate(currentTimestamp + oneMonth)}'
        `;
      break;
    case "DELISTED":
      sql += `
        AnnounceDate='${getDate(currentTimestamp - oneMonth * 2)}',
        GeneralAvailableDate='${getDate(currentTimestamp - oneMonth * 2)}',
        WDAnnounceDate='${getDate(currentTimestamp - oneMonth)}',
        WithdrawDate='${getDate(currentTimestamp - oneMonth)}'
        `;
      break;

    default:
      break;
  }
  sql += `WHERE FCCode='${row.FCCode}' AND PNCode='${row.PNCode}' ;`;
  sql = sql.replace(/\n|\s+ /g,' ');
  return sql
}

handleUpdateDate();
module.exports = {
  handleUpdateDate
};
