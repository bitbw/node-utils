function handleExecSql(sql, DB) {
  console.log("Bowen: handleExecSql -> sql", sql);
  return new Promise((resolve, reject) => {
    DB.serialize(() => {
      DB.run("PRAGMA cipher_compatibility = 4", e => e && reject(e));
      DB.run(`PRAGMA key = "IPS@@@IPS@@@DB"`, e => e && reject(e));
      DB.run(`${sql}`, e => {
        e && reject(e);
        resolve(true);
      });
    });
  });
}
function handleGetAll(sql, DB) {
  return new Promise((resolve, reject) => {
    DB.serialize(() => {
      DB.run("PRAGMA cipher_compatibility = 4", e => e && reject(e));
      DB.run(`PRAGMA key = "IPS@@@IPS@@@DB"`, e => e && reject(e));
      DB.all(`${sql}`, (e, rows) => {
        e && reject(e);
        resolve(rows);
      });
    });
  });
}

module.exports = {
  handleExecSql,
  handleGetAll
};

const a = "test";
let text = `INSERT INTO "t_def_component_independentService" 
("PNCode", "FCCode", "nameCHN", "nameENG", "descriptionCHN", "descriptionENG", "specialTips", "picture", "icon", "type", "subType", "serverModel", "serverName", "serverPN", "serverCategory", "AnnounceDate", "GeneralAvailableDate", "WDAnnounceDate", "WithdrawDate", "comment", "CfgRule", "disable", "priority", "inventory", "inventoryClean", "version", "status") 
VALUES ("${a}", "${a}","${a}", '', '', 'SERVICE_COMPONENT', 'SERVICE', 'SERV-IPS', 'SERVICE', 'FUM-SERVICE-0000', 'IPS service product', '2020/4/30', '2020/7/10', '2050/1/1', '2050/1/1', NULL, NULL, '0', '0', '100', '1', '1', '0');`
console.log(text);
