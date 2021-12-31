/*
 * @Description:
 * @Autor: Bowen
 * @Date: 2021-04-22 14:47:09
 * @LastEditors: Bowen
 * @LastEditTime: 2021-12-02 17:54:15
 */

const oneMinutes = 1000 * 60;
const oneHours = oneMinutes * 60;
const oneDay = oneHours * 24;
const oneMonth = oneDay * 30;
const oneYear = oneDay * 365;

function DateFormat(format = "YYYY-MM-DD hh:mm:ss") {
  format = format
    .replace("YYYY", "${y}")
    .replace("YY", "${y.slice(2)}")
    .replace("MM", "${mt}")
    .replace("DD", "${d}")
    .replace("HH", "${h}")
    .replace("hh", "${h}")
    .replace("mm", "${m}")
    .replace("SS", "${s}")
    .replace("ss", "${s}");
  return date => {
    !date && (date = new Date());
    let [y, mt, d, h, m, s] = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    ];
    mt = `${mt < 10 ? "0" : ""}` + mt;
    d = `${d < 10 ? "0" : ""}` + d;
    h = `${h < 10 ? "0" : ""}` + h;
    m = `${m < 10 ? "0" : ""}` + m;
    s = `${s < 10 ? "0" : ""}` + s;
    let dateString = "";
    eval("dateString = `" + format + "`;");
    return dateString;
  };
}

module.exports = {
  DateFormat,
  oneMinutes,
  oneHours,
  oneDay,
  oneMonth,
  oneYear
};
