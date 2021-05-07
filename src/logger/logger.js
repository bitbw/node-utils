/*
 * @Description: 日志
 * @LastEditors: Bowen
 * @LastEditTime: 2021-05-07 16:48:25
 */

const fs = require("fs").promises;
const path = require("path");
const defaultPaht = path.resolve(__dirname, "log");
class Logger {
  constructor(option) {
    const {
      path = "",
      perfix = "",
      suffix = "",
      console = false,
      date = new Date()
    } = option;
    this.path = path ? path : defaultPaht;
    this.perfix = perfix;
    this.suffix = suffix;
    this.console = console;
    this.date = date;
  }
  // 2021-01-12 12:01:12
  getDate() {
    const date = this.date;
    let month = date.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let day = date.getDay();
    day = day < 10 ? "0" + day : day;
    return `${date.getFullYear()}-${month}-${day} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }
  async warn(info) {
    const data = `${this.perfix}${this.getDate()} [WARN]` + info + this.suffix;
    await this.write(data);
    if (this.console) {
      console.warn(data);
    }
  }
  async info(info) {
    const data = `${this.perfix}${this.getDate()} [INFO]` + info + this.suffix;
    await this.write(data);
    if (this.console) {
      console.log(data);
    }
  }
  async success(info) {
    const data =
      `${this.perfix}${this.getDate()} [SUCCESS]` + info + this.suffix;
    await this.write(data);
    if (this.console) {
      console.log(data);
    }
  }
  async error(info) {
    const data =
      `${
        this.perfix
      }${this.getDate()} [ERROR]\n------Error Stack Begin------\n` +
      info +
      `\n-------Error Stack End------- ` +
      this.suffix;
    await this.write(data);
    if (this.console) {
      console.error(data);
    }
  }
  async write(data) {
    try {
      const log = await fs.readFile(this.path);
      // 大于 1M 进行备份
      if (log.length > 1 * 1024 ) {
        // 重命名
        const newPath = path.resolve(
          path.dirname(this.path),
          `backuplog${this.getDate()}.log`
        );
        await fs.rename(this.path, newPath);
      }
    } catch (error) {
      console.log("Bowen: Logger -> write -> error", error);
    }
    try {
      await fs.writeFile(this.path, data, { flag: "a+" });
    } catch (error) {
      console.log("[日志写入失败]:", this.path);
    }
  }
}

module.exports = Logger;
