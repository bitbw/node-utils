-- sqlite 删除字段 
-- 1 复制一个要删除字段名的表，要删除的字段不进行复制
create table t_price_listprice_temp as select id,PNCode,FCCode,nameCHN,nameENG,listpriceUSD,listpriceRMB,costUSD,costRMB,taxRate,category,attribute,type,subType,serverModel,serverName,serverPN,serverCategory,priceVersion,version,status,AnnounceDate,GeneralAvailableDate,WDAnnounceDate,WithdrawDate,printWeight,factoryNameCHN,factoryNameENG,factoryModelName,factoryMachineType from t_price_listprice where 1 = 1;
-- 2.删除原始表
drop table t_price_listprice;
-- 3.将复制表重命名
alter table t_price_listprice_temp rename to t_price_listprice;