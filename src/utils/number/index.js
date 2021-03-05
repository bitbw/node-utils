/*
 * @Description: 处理数字
 * @LastEditors: zhangbowen
 * @LastEditTime: 2021-03-05 14:27:30
 */
/**
 * @description: 四舍五入 保留两位小数
 * @param {*} num
 * @return {*}
 */
 function toFixed(num) {
    return parseFloat(num.toFixed(2));
  }


  module.exports ={
    toFixed
  }