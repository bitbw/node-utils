/**
 * @description:  执行SQL语句
 * @param {strign} sql SQL语句
 * @param {*} DB 数据库对象
 * @return { promise }  resolve boolean
 */
function handleExecSql(sql, DB) {
  return new Promise((resolve, reject) => {
    DB.serialize(() => {
      DB.run("PRAGMA cipher_compatibility = 4", e => e && reject(e));
      DB.run(`PRAGMA key = "IPS@@@IPS@@@DB"`, e => e && reject(e));
      DB.exec(`${sql}`, e => {
        e && reject(e);
        resolve(true);
      });
    });
  });
}
/**
 * @description:  查找全部数据
 * @param {strign} sql SQL语句
 * @param {*} DB 数据库对象
 * @return { promise }  resolve res数组
 */
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

