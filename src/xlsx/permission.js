const path = require("path");
const os = require("os");
const XLSX = require("xlsx");
const fs = require("fs");

function createPermissionXLSX() {
  const marktingData = require(path.resolve(__dirname, "./json/markting.json"));
  const menagementData = require(path.resolve(
    __dirname,
    "./json/menagement.json"
  ));

  let keys = [
    "title",
    "description",
    "type",
    "entity",
    "api",
    "state",
    "req_methods",
    "subtype",
    "action",
  ];
  // 从头开始创建工作簿
  var wb = XLSX.utils.book_new();

  // 创建工作表
  /**
   * aoa_to_sheet    二维数组
   * json_to_sheet   对象数组
   * table_to_sheet  tableDOM
   */
  let menagementJson = menagementData.map((i) => {
    let temp = {};
    keys.forEach((k) => (temp[k] = i[k] || ""));
    return temp;
  });
  let marktingJson = marktingData.map((i) => {
    let temp = {};
    keys.forEach((k) => (temp[k] = i[k] || ""));
    return temp;
  });
  let ws_menagement = XLSX.utils.json_to_sheet(menagementJson);
  let ws_markting = XLSX.utils.json_to_sheet(marktingJson);

  // 把工作表添加到工作簿中
  XLSX.utils.book_append_sheet(wb, ws_menagement, "menagement");
  XLSX.utils.book_append_sheet(wb, ws_markting, "markting");

  // 写入 
  XLSX.writeFile(wb, path.resolve(__dirname, "./json/权限数据.xlsx"), {
    type: "buffer",
    Props: { Author: "bitbw" },
  });
}

createPermissionXLSX()

