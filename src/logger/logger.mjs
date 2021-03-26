/*
 * @Description: 日志
 * @LastEditors: zhangbowen
 * @LastEditTime: 2021-03-22 14:39:15
 */

import { promises as fs } from 'fs'
import path from 'path'
const defaultPaht = path.resolve(__dirname,'log')
class Logger {
  constructor({ path = "", perfix = "", suffix = "" } = {}) {
    this.path = path? path : defaultPaht;
    this.perfix = perfix;
    this.suffix = suffix;
  }
  // 2021-01-12 12:01:12
  getDate(date = new Date()) {
    let month = date.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let day = date.getDay();
    day = day < 10 ? "0" + day : day;
    return `${date.getFullYear()}-${month}-${day} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }
  async init(){
    try {
      await fs.readFile(this.path,'utf-8')
    } catch (error) {
      
    }
 
      
  }
}
