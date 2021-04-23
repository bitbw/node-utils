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
const getDate = timestamp => DateFormat("YYYY-MM-DD")(new Date(timestamp));
const currentTimestamp = Date.now();
const dbPath = path.resolve(
  `C:/Users/WX03/Desktop/iConfig开发/根据退市时间设置状态`,
  `iconfig_sys.config`
);
const { handleExecSql, handleGetAll } = require("./index");
const DB = new sqlite3.Database(dbPath);

async function handleUpdateDate(table, keys = ["PNCode"]) {
  let querySql = `SELECT * FROM ${table}`;
  console.time("get");
  let res = await handleGetAll(querySql, DB);
  console.timeEnd("get");
  if (res && res.length) {
    let updateSql = "";
    let counter = 0;
    for (const [index, row] of res.entries()) {
      let types = [
        "UNLISTED",
        "NORMAL",
        "NORMAL2",
        "DELISTING",
        "DELISTING2",
        "DELISTED"
      ];
      let type = types[counter];
      updateSql += getSql(row, type, table, keys);
      counter++;
      if (counter >= types.length) {
        counter = 0;
      }
    }
    // console.log("Bowen: handleUpdateDate -> updateSql", updateSql);
    try {
      console.time("set");
      await handleExecSql(updateSql, DB);
      console.timeEnd("set");
    } catch (error) {
      console.log("Bowen: handleUpdateDate -> error", error);
    }
  }
}

function getSql(row, type, table, keys) {
  console.log("Bowen: getSql -> type", type);
  let sql = `UPDATE ${table} SET `;
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
  sql += `WHERE `;
  for (const [index, key] of keys.entries()) {
    if (index > 0) {
      sql += " AND ";
    }
    sql += ` ${key}='${row[key]}'`;
  }
  sql += ";";
  sql = sql.replace(/\n|\s+ /g, " ");
  return sql;
}

handleUpdateDate("t_def_product_info", ["PNCode", "status"]);
// handleUpdateDate("t_def_component_listprice",["FCCode","PNCode"]);
module.exports = {
  handleUpdateDate
};
