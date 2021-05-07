/*
 * @Description: test 多个用过sql的汇总
 * @Autor: Bowen
 * @Date: 2021-03-05 11:12:40
 * @LastEditors: Bowen
 * @LastEditTime: 2021-04-30 14:35:58
 */



// 字符串排序方法
let a = ['上海2', '北京1', '上海1', 'a', 'abc2', 'c1', 'ba1', 'b4', 'c2'];
a.sort((a, b) => {
  return a.localeCompare(b);
});
console.log(a);

console.log('window.sysDB', window.sysDB);
//新增列---------------------------------------------------------------------------------------------
const tableName = 't_template_component';
let columns = [
  {
    name: 'listpriceUSD',
    type: 'NUMBER',
  },
  {
    name: 'listpriceRMB',
    type: 'NUMBER',
  },
  {
    name: 'discountUSD',
    type: 'NUMBER',
  },
  {
    name: 'discountRMB',
    type: 'NUMBER',
  },
  {
    name: 'priceVersion',
    type: 'NUMBER',
  },
];
const addColumn = (tableName, columns, DB) => {
  for (const col of columns) {
    window.setTimeout(() => {
      window[DB].exec(`ALTER TABLE ${tableName} ADD COLUMN  ${col.name} ${col.type} `)
        .then(res => {
          console.log(`成功${DB}库${tableName}表添加${col.name}列`, res);
        })
        .catch(e => {
          console.log(`失败${DB}库${tableName}表添加${col.name}列`, e);
        });
    }, 500);
  }
};
addColumn(tableName, columns, 'sysDB');
console.log(
  'findAll',
  window.sysDB
    .table('t_def_component_other')
    .where('id=1')
    .findAll()
);
// 添加提示------------------------------------------------------------------------------------------
let setSpecialTips = async () => {
  for (let i = 1; i < 215; i++) {
    try {
      let res = await window.sysDB.exec(
        `UPDATE t_def_component_other SET specialTips='提示：其他配置${i}' WHERE id=${i}`
      );
      console.log('setSpecialTips', res);
    } catch (error) {
      console.log('error', error);
    }
  }
};
setSpecialTips();
console.log(
  'findAll',
  window.sysDB
    .table('t_def_component_other')
    .where('id=1')
    .findAll()
);
window.sysDB
  .exec(`UPDATE t_def_component_other SET specialTips=null WHERE id=136 `)
  .then(res => {
    console.log('张博文: ------------');
    console.log('张博文: res', res);
    console.log('张博文: ------------');
  })
  .catch(e => {
    console.log('张博文: --------');
    console.log('张博文: e', e);
    console.log('张博文: --------');
  });

// 添加提示------------------------------------------------------------------------------------------
let setSpecialTipsAll = async () => {
  for (const table of [
    't_def_component_CPU',
    't_def_component_card',
    't_def_component_disk',
    't_def_component_enclosure',
    't_def_component_enclosuremode',
    't_def_component_fomodule',
    't_def_component_iodrawer',
    't_def_component_listprice',
    't_def_component_memory',
    't_def_component_motherboard',
    't_def_component_other',
    't_def_component_power',
    't_def_component_special_discount',
  ]) {
    let result = [];
    try {
      let result = await window.sysDB.table(`${table}`).findAll();
      console.log(`${table} id`, result);
      for (let i = 1; i < result.length; i++) {
        try {
          let res = await window.sysDB.exec(
            `UPDATE ${table} SET specialTips='提示：${table}其他配置${i}' WHERE id=${i}`
          );
          console.log('setSpecialTips', res);
        } catch (error) {
          console.log('error', error);
        }
      }
    } catch (error) {
      console.log('error', error);
      continue;
    }
  }
};
setSpecialTipsAll();
//添加模板-------------------------------------------------------------------------------------------
for (let index = 0; index < 5; index++) {
  window.sysDB
    .table(`t_template_info`)
    .insert({
      templateID: uuid(),
      templateNameCHN: `${this.product.name}模板${index}`,
      templateNameENG: `${this.product.name}template${index}`,
      templateType: `PRE_DEFINE`, //[PRE_DEFINE]预定义模板, [REMOTE_DOWNLOAD]从服务器端下载的,[LOCAL_DEFINE]本地自定义模板
      descriptionCHN: `${this.product.name}模板简要说明，主要写清楚配置(中文)，如支持的计算节点，内存插槽，CPU插槽等等${index}`,
      descriptionENG: `${this.product.name}Brief description of the template, mainly write clear configuration (Chinese), such as supported compute nodes, memory slots, CPU slots and so on${index}`,
      serverModel: this.product.modelType,
      serverName: this.product.name,
      serverPN: this.product.PNCode,
      serverCategory: this.product.category,
      status: 0,
      version: 1,
    })
    .then(res => {
      console.log('张博文: -----------------------');
      console.log('张博文: mounted -> res', res);
      console.log('张博文: -----------------------');
    })
    .catch(e => {
      console.log('张博文: -------------------');
      console.log('张博文: mounted -> e', e);
      console.log('张博文: -------------------');
    });
}
// 修改固定字段--------------------------------------------------------------------------------------
window.sysDB
  .exec(
    `UPDATE "t_template_component" SET "templateID"='2f3a9c3e-15b3-45a4-9cbf-6132c0116d4d' WHERE "templateID"='1293bcff-2631-4e84-9887-77e09666e1d6';`
  )
  .then(res => {
    console.log('张博文: ------------');
    console.log('张博文: 修改成功', res);
    console.log('张博文: ------------');
  })
  .catch(error => {
    console.log('张博文: ----------------');
    console.log('张博文: 修改失败', error);
    console.log('张博文: ----------------');
  });
// 添加模板数据--------------------------------------------------------------------------------------
// const transformTable = async () => {
//   try {
//     let result = await window.userDB.table(`t_config_info`).findAll();
//     console.log(`获取成功`, result);
//     for (const [index, row] of result.entries()) {
//       try {
//         let res = await window.sysDB.table(`t_template_info`).insert({
//           templateID: uuid(),
//           templateNameCHN: row.nameCHN,
//           templateNameENG: row.nameENG,
//           templateType: `PRE_DEFINE`, //[PRE_DEFINE]预定义模板, [REMOTE_DOWNLOAD]从服务器端下载的,[LOCAL_DEFINE]本地自定义模板
//           descriptionCHN: row.descriptionCHN,
//           descriptionENG: row.descriptionENG,
//           serverModel: row.serverModel,
//           serverName: row.serverName,
//           serverPN: row.serverPN,
//           serverCategory: row.serverCategory,
//           listpriceHWUSD: row.listpriceHWUSD,
//           listpriceHWRMB: row.listpriceHWRMB,
//           listpriceSWUSD: row.listpriceSWUSD,
//           listpriceSWRMB: row.listpriceSWRMB,
//           listpriceSVUSD: row.listpriceSVUSD,
//           listpriceSVRMB: row.listpriceSVRMB,
//           discountHW: row.discountHW,
//           discountSW: row.discountSW,
//           discountSV: row.discountSV,
//           status: 0,
//           version: 1,
//         });
//         console.log('添加成功', res);
//       } catch (error) {
//         console.log('添加失败', error);
//       }
//     }
//   } catch (error) {
//     console.log('获取失败error', error);
//   }
// };
// transformTable();
//--------------------------------------------------------------------------------------------------
// let config = [
//   '1293bcff-2631-4e84-9887-77e09666e1d6',
//   '15474c42-3591-4c0e-bdb0-4d470af558e9',
//   'e0745dd5-5db4-42b5-bf08-a571ca9ae0b9',
//   'f1fc2940-2a8f-4912-9209-1502b5c675be',
// ];
// let template = [
//   '2f3a9c3e-15b3-45a4-9cbf-6132c0116d4d',
//   'c231c706-3b41-4fa4-929a-d9af7ad818f1',
//   'f60e4a87-68a6-4ee5-9c16-edb860d518fc',
//   'e385b107-10f8-4923-82c8-837b50ac46d3',
// ];
// let findAll = async (config, template) => {
//   console.log('张博文: -------------------------------------------------');
//   console.log('张博文: findAll -> config, template', config, template);
//   console.log('张博文: -------------------------------------------------');
//   let result = [];
//   try {
//     result = await window.userDB
//       .table(`t_config_component`)
//       .where(`configID="${config}"`)
//       .findAll();
//     console.log('张博文: ------------------');
//     console.log('张博文: t_config_component', result);
//     console.log('张博文: ------------------');
//   } catch (error) {
//     console.log('张博文: ----------------');
//     console.log('张博文:t_config_component error', error);
//     console.log('张博文: ----------------');
//   }
//   for (const item of result) {
//     let temp = {
//       ...item,
//       templateID: template,
//     };
//     Reflect.deleteProperty(temp, 'configID');
//     console.log('张博文: -------------------------');
//     console.log('张博文: findAll -> temp', temp);
//     console.log('张博文: -------------------------');
//     await window.sysDB
//       .table(`t_template_component`)
//       .insert(temp)
//       .then(res => {
//         console.log('张博文: -----------------------');
//         console.log('张博文: findAll -> 添加成功', res);
//         console.log('张博文: -----------------------');
//       })
//       .catch(error => {
//         console.log('张博文: ---------------------------');
//         console.log('张博文: findAll -> 添加失败', error);
//         console.log('张博文: ---------------------------');
//       });
//   }
// };
// for (const [index, cig] of config.entries()) {
//   findAll(cig, template[index]);
// }

// 清空表-------------------------------------------------------------------------------------------
const clearTable = async (tableName) => {
  setTimeout(async () => {
    try {
      let res = await handleExecSql(`delete from  ${tableName}`);
      console.log('张博文: --------------------------');
      console.log('张博文: clearTable 删除成功 -> res', res);
      console.log('张博文: --------------------------');
    } catch (error) {
      console.log('张博文: ------------------------------');
      console.log('张博文: clearTable  删除失败-> error', error);
      console.log('张博文: ------------------------------');
      return;
    }
    try {
      let res = await handleExecSql(
        `update sqlite_sequence SET seq = 0 where name ='${tableName}'  `
      );
      console.log('张博文: --------------------------');
      console.log('张博文: clearTable 更新index成功 -> res', res);
      console.log('张博文: --------------------------');
    } catch (error) {
      console.log('张博文: ------------------------------');
      console.log('张博文: clearTable  更新index失败-> error', error);
      console.log('张博文: ------------------------------');
    }
  }, 500);
};

for (const table of ['t_config_component','t_config_info','t_schema_product_list']) {
  clearTable(table);
}

function handleExecSql(sql) {
  return new Promise((resolve, reject) => {
    DB.serialize(() => {
      DB.run("PRAGMA cipher_compatibility = 4", e => e && reject(e));
      DB.run(`PRAGMA key = "IPS@@@IPS@@@DB"`, e => e && reject(e));
      DB.run(
        `${sql}`,
        e => e && reject(e)
      );
    });
    resolve(true)
  });
}

// let config = [
//   '64f4e012-74f8-4b6a-90bd-9d26cd961abd',
//   'd1919a4c-bdaa-4994-9e8b-8310e2803f62',
//   '93a54594-f70f-40ce-b404-5be5c2259781',
//   '9ca175fe-28ba-481b-a733-47fdecbef23e',
//   'e268b635-83b7-4a6e-a100-a192cf3a1b35',
// ];
// let template = [
//   '925f043c-0074-4bca-a598-d8ef6909d0b6',
//   '8714a08a-055a-48e7-8e6f-726a1f5daf02',
//   '55d2da50-ec41-40e4-9a29-b394511ed0e6',
//   '88793b1d-3e71-4a1d-8c29-feb88ad8fe6d',
//   'e2bede88-09f3-4fde-bbdb-15b725fb90b9',
// ];
// let findAll = async (config, template) => {
//   console.log('张博文: -------------------------------------------------');
//   console.log('张博文: findAll -> config, template', config, template);
//   console.log('张博文: -------------------------------------------------');
//   let result = [];
//   try {
//     result = await window.userDB
//       .table(`t_config_component`)
//       .where(`configID="${config}"`)
//       .findAll();
//     console.log('张博文: ------------------');
//     console.log('张博文: t_config_component', result);
//     console.log('张博文: ------------------');
//   } catch (error) {
//     console.log('张博文: ----------------');
//     console.log('张博文:t_config_component error', error);
//     console.log('张博文: ----------------');
//   }
//   for (const item of result) {
//     let temp = {
//       templateID: template,
//       PNCode: item.PNCode,
//       FCCode: item.FCCode,
//       nameCHN: item.nameCHN,
//       nameENG: item.nameENG,
//       type: item.type,
//       subType: item.subType,
//       quantity: item.quantity,
//       placeDef: item.placeDef,
//       placeGroup: item.placeGroup,
//       serverModel: item.serverModel,
//       serverName: item.serverName,
//       serverPN: item.serverPN,
//       serverCategory: item.serverCategory,
//       status: item.status,
//       version: item.version,
//       uuid: item.uuid,
//       priceVersion: item.priceVersion,
//       cfgType: item.cfgType,

//     };
//     console.log('张博文: -------------------------');
//     console.log('张博文: findAll -> temp', temp);
//     console.log('张博文: -------------------------');
//     await window.sysDB
//       .table(`t_template_component`)
//       .insert(temp)
//       .then(res => {
//         console.log('张博文: -----------------------');
//         console.log('张博文: findAll -> 添加成功', res);
//         console.log('张博文: -----------------------');
//       })
//       .catch(error => {
//         console.log('张博文: ---------------------------');
//         console.log('张博文: findAll -> 添加失败', error);
//         console.log('张博文: ---------------------------');
//       });
//   }
// };
// for (const [index, cig] of config.entries()) {
//   findAll(cig, template[index]);
// }


// const transformTable = async () => {
//   try {
//     let result = await window.userDB.table(`t_config_info`).findAll();
//     console.log(`获取成功`, result);
//     for (const [index, row] of result.entries()) {
//       try {
//         let res = await window.sysDB.table(`t_template_info`).insert({
//           templateID: uuid(),
//           templateNameCHN: row.nameCHN,
//           templateNameENG: row.nameENG,
//           templateType: `PRE_DEFINE`, //[PRE_DEFINE]预定义模板, [REMOTE_DOWNLOAD]从服务器端下载的,[LOCAL_DEFINE]本地自定义模板
//           descriptionCHN: row.descriptionCHN,
//           descriptionENG: row.descriptionENG,
//           serverModel: row.serverModel,
//           serverName: row.serverName,
//           serverPN: row.serverPN,
//           serverCategory: row.serverCategory,
//           status: 0,
//           version: 1,
//         });
//         console.log('添加成功', res);
//       } catch (error) {
//         console.log('添加失败', error);
//       }
//     }
//   } catch (error) {
//     console.log('获取失败error', error);
//   }
// };
// transformTable();
// const tableName = 't_template_info';
// let columns = [
//   {
//     name: 'priority',
//     type: 'NUMBER',
//   },
 
// ];
// const addColumn = (tableName, columns, DB) => {
//   for (const col of columns) {
//     window.setTimeout(() => {
//       window[DB].exec(`ALTER TABLE ${tableName} ADD COLUMN  ${col.name} ${col.type} `)
//         .then(res => {
//           console.log(`成功${DB}.exec`, res);
//         })
//         .catch(e => {
//           console.log(`失败${DB}.exec`, e);
//         });
//     }, 500);
//   }
// };
// addColumn(tableName, columns, 'sysDB');