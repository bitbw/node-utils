/*
 * @Description: 加密未被加密的 sqlite3 数据库
 * @LastEditors: zhangbowen
 * @LastEditTime: 2021-03-05 12:50:16
 */



const path = require("path");
const fs = require("fs").promises;
const os = require("os");
const sqlite3 = require("@journeyapps/sqlcipher").verbose();
// 获取参数
const args = process.argv.splice(2);
console.log("获取参数", args);
// 路径
const basePath = args.length > 0 ? args[0] : os.homedir();
const dbPath = path.join(basePath, `iconfig_sys.config`);
console.log("数据库路径", dbPath);
const tempPath = path.join(basePath, `temp_iconfig_sys.config`);
// C:/Users/WX03/iConfig_TEST_TEMP
class EncryptSqlite {
  constructor(dbPath, tempPath) {
    this.dbPath = dbPath;
    this.tempPath = tempPath;
  }
  async handleEncryptSqlite() {
    // 测试是否是加密数据库
    try {
      await this.handleTestIfEncrypt();
      console.log("原始数据库已加密退出操作", error.message);
      return;
    } catch (error) {}
    // 复制一份 temp原始数据库
    try {
      await fs.copyFile(dbPath, tempPath);
      console.log(`原始数据库已拷贝到temp数据库 ${tempPath}`);
    } catch (error) {
      console.log("拷贝文件出错：", error.message);
    }
    // 删除 原始数据库
    try {
      await fs.unlink(dbPath);
      console.log(`删除原始数据库成功 ${dbPath}`);
    } catch (error) {
      console.log("删除文件出错：", error.message);
    }

    // 创建新的数据库
    try {
      this.newDB = await this.handleOpenDB(dbPath);
      console.log(`创建并连接新的数据库成功 ${dbPath}`);
    } catch (error) {
      console.log("创建并连接新的数据库失败", error);
    }
    // 连接temp数据库
    try {
      this.newDB = await this.handleOpenDB(tempPath);
      console.log(`连接temp数据库成功 ${tempPath}`);
    } catch (error) {
      console.log("创建并连接新的数据库失败", error);
    }
    // 新的数据库加密
    let result;
    try {
      result = await this.handleEncrypt();
    } catch (error) {
      console.log("创建空加密数据库失败", error);
    }
    console.log(result);
    // 数据库数据迁移
    try {
      result = await this.handleMigrationData();
    } catch (error) {
      console.log("数据库数据迁移失败", error);
    }
    console.log(result);
    // 再次打开表
    this.newDB = new sqlite3.Database(dbPath);
    // 删除temp表
    try {
      result = await this.handleDeleteTempTable();
    } catch (error) {
      console.log("删除temp表失败", error);
    }
    console.log(result);
    // 关闭数据连接
    try {
      await this.handleCloseDB();
    } catch (error) {
      console.log("关闭数据连接失败", error);
    }
    // 删除 temp数据库
    try {
      await fs.unlink(tempPath);
      console.log(`删除temp数据库成功 ${tempPath}`);
    } catch (error) {
      console.error("删除文件出错：", error.message);
    }
    console.log("encrypted");
  }
  handleTestIfEncrypt(dbPath) {
    return new Promise((resolve, reject) => {
      let DB = new sqlite3.Database(dbPath);
      DB.serialize(() => {
        DB.run("PRAGMA cipher_compatibility = 4", e => e && reject(e));
        DB.run(`PRAGMA key = "IPS@@@IPS@@@DB"`, e => e && reject(e));
        DB.run(`SELECT * FROM t_version_info`, e => e && reject(e));
      });
    });
  }
  handleEncrypt() {
    return new Promise((resolve, reject) => {
      this.newDB.serialize(() => {
        this.newDB.run("PRAGMA cipher_compatibility = 4");
        this.newDB.run(`PRAGMA key = "IPS@@@IPS@@@DB"`);
        this.newDB.run(
          `CREATE TABLE "temp_book" (
                        "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`,
          e => {
            if (e) {
              reject(e);
            } else {
              resolve("创建空加密数据库成功");
            }
          }
        );
      });
    });
  }
  handleMigrationData() {
    // 新的加密数据库路径
    const replaceDBPath = this.dbPath.replace(/\\/g, "/");
    return new Promise((resolve, reject) => {
      this.tempDB.serialize(() => {
        this.tempDB.run(
          `ATTACH DATABASE "${replaceDBPath}" AS encrypted KEY "IPS@@@IPS@@@DB"`
        );
        this.tempDB.run(`SELECT sqlcipher_export('encrypted')`);
        this.tempDB.run(`DETACH DATABASE encrypted`, e => {
          if (e) {
            reject(e);
          } else {
            resolve("数据迁移完成");
          }
        });
      });
    });
  }
  handleDeleteTempTable() {
    return new Promise((resolve, reject) => {
      this.newDB.serialize(() => {
        this.newDB.run("PRAGMA cipher_compatibility = 4");
        this.newDB.run(`PRAGMA key = "IPS@@@IPS@@@DB"`);
        this.newDB.run(`DROP TABLE "temp_book"`, e => {
          if (e) {
            reject(e);
            return;
          }
          resolve("删除temp_book成功");
        });
      });
    });
  }
  async handleCloseDB() {
    await new Promise((resolve, reject) => {
      this.newDB.close(e => {
        if (e) {
          reject(e);
        } else {
          resolve();
        }
      });
    });
    await new Promise((resolve, reject) => {
      this.tempDB.close(e => {
        if (e) {
          reject(e);
        } else {
          resolve();
        }
      });
    });
  }
  handleOpenDB(dbPath) {
    return new Promise((resolve, reject) => {
      let DB = new sqlite3.Database(dbPath, e => {
        if (e) {
          reject(e);
        } else {
          resolve(DB);
        }
      });
    });
  }
}

new EncryptSqlite(dbPath, tempPath).handleEncryptSqlite();
