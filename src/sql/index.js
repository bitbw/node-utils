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

