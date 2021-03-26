/**
 * @description: // 计算两个时间之间的时间间隔 多少天时分秒
 * @param { number } startTime 开始时间戳
 * @param { number } endTime   结束时间戳
 * @return { string }  intervalTime  时间间隔 
 */

function intervalTime(startTime, endTime) {
  const oneMinutes = 1000 * 60;
  const oneHours = oneMinutes * 60;
  const oneDay = oneHours * 24;
  const oneMonth = oneDay * 30;
  const TenYears = oneDay * 365 * 50;
  const diffTimestamp = Math.abs(startTime - endTime); //时间差的毫秒数
  //计算出相差天数
  const days = Math.floor(diffTimestamp / oneDay);
  //计算出小时数
  const leave1 = diffTimestamp % oneDay; //计算天数后剩余的毫秒数
  const hours = Math.floor(leave1 / oneHours);
  //计算相差分钟数
  const leave2 = leave1 % oneHours; //计算小时数后剩余的毫秒数
  const minutes = Math.floor(leave2 / oneMinutes);
  //计算相差秒数
  const leave3 = leave2 % oneMinutes; //计算分钟数后剩余的毫秒数
  const seconds = Math.round(leave3);
  const intervalTime = `${days ? days + "天" : ""}${
    hours ? hours + "小时" : ""
  }${minutes ? minutes + "分钟" : ""}${seconds ? seconds + "秒" : ""}`;
  console.log(intervalTime);
  return intervalTime;
}

intervalTime(new Date("2021/3/21").valueOf(), new Date("2021/3/27").valueOf());
