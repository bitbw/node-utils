/*
 * @Description: 清空表 并 重置下标
 * @LastEditors: Bowen
 * @LastEditTime: 2022-02-25 14:48:55
 */

const path = require("path");
const fs = require("fs").promises;
const os = require("os");
const sqlite3 = require("@journeyapps/sqlcipher").verbose();
// const dbPath = path.resolve(os.homedir(), `iConfig/iconfig_user.config`);
const dbPath = path.resolve(os.homedir(), `iConfig_TEST/iconfig_sys.config`);
const DB = new sqlite3.Database(dbPath);

const selectTable = async () => {
  try {
    let res = await handleExecSql(
      `SELECT * FROM t_price_listprice WHERE "status" = 0  ORDER BY PNCode`
    );
    console.log("Bowen: res", res);
    if (res && res.length) {
      let [results, cl] = [[], []];
      for (const item of res) {
        let result = cl.find(
          (c) =>
            c.FCCode === item.FCCode &&
            c.serverModel === item.serverModel &&
            c.subType !== item.subType
        );
        if (result)
          results.push(`
        ==================================================
        FCCode -> ${result.FCCode} : ${item.FCCode}
        serverModel -> ${result.serverModel} : ${item.serverModel}
        subType -> ${result.subType} : ${item.subType}
        `);
        cl.push(item);
      }
      for (const res of results) {
        console.log(res);
      }
      console.log("Bowen: selectTable -> results", results);
    }
  } catch (error) {
    return;
  }
};

function handleExecSql(sql) {
  return new Promise((resolve, reject) => {
    DB.serialize(() => {
      DB.run("PRAGMA cipher_compatibility = 4", (e) => e && reject(e));
      DB.run(`PRAGMA key = "IPS@@@IPS@@@DB"`, (e) => e && reject(e));
      DB.all(`${sql}`, (e, res) => {
        if (e) {
          reject(e);
        } else {
          resolve(res);
        }
      });
    });
  });
}

// "t_config_info","t_config_component","t_schema_product_list","t_schema_info"
// hendleClearTable(["t_config_info","t_config_component","t_schema_product_list"]);

selectTable();
