////////////////////////////////////////////////////////////////////////////////
// Object.defineProperty
////////////////////////////////////////////////////////////////////////////////
class Observer {
  constructor(data) {
    // 遍历参数 data 的属性，给添加到 this 上
    for (let key of Object.keys(data)) {
      if (typeof data[key] === "object") {
        data[key] = new Observer(data[key]);
      }
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          console.log("你访问了" + key);
          return data[key];
        },
        set(newVal) {
          console.log("你设置了" + key);
          console.log("新的" + key + "=" + newVal);
          if (newVal === data[key]) {
            return;
          }
          data[key] = newVal;
        },
      });
    }
  }
}

const obj = { name: "app", age: "18", a: { b: 1, c: 2 } };
const app = new Observer(obj);
app.age = 20;
console.log(app.age);
app.newPropKey = "新属性";
console.log(app.newPropKey); //新属性

////////////////////////////////////////////////////////////////////////////////
// Proxy
////////////////////////////////////////////////////////////////////////////////

const obj = { name: "krry", age: 24, others: { mobile: "mi10", watch: "mi4" } };
const p = new Proxy(obj, {
  get(target, key, receiver) {
    console.log("查看的属性为：" + key);
    returnReflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    console.log("设置的属性为：" + key);
    console.log("新的属性：" + key, "值为：" + value);
    Reflect.set(target, key, value, receiver);
  },
});
p.age = 22;
console.log(p.age);
p.single = "NO";
console.log(p.single);
p.others.shoe = "boost";
console.log(p.others.shoe);
