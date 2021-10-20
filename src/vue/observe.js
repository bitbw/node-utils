class Observer {
  constructor(data) {
    this.data = data;
    this.walk(data);
  }
  /**
   * 核心方法
   */
  // 遍历data把每个属性或属性中的属性都添加劫持
  walk(data) {
    // 如果没有data或者data不是一个对象就return， 不需要劫持
    if (!data || typeof data !== "object") {
      return;
    }
    // 遍历属性
    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key]);
      // 优化:如果data中的数据时对象那就直接用自己在递归劫持一遍
      // 如果就是简单数据类型,进来后会直接return掉
      this.walk(data[key]);
    });
  }
  // 用来劫持的方法
  defineReactive(data, key, value) {
    let that = this;
    // 在每个属性中创建一个dep用来监听数据改变
    let dep = new Dep();
    console.log("Bowen: Observer -> defineReactive -> dep", key, dep);
    Object.defineProperty(data, key, {
      configurable: true, //当且仅当该属性为 true 时，该属性描述符才能够被改变
      enumerable: true, //当且仅当该属性的为true时，该属性才才能够被遍历（就是被枚举）
      get() {
        // 如果有Dep.target中不是null
        // 就把Dep.target(watcher)添加到当前的Dep实例的订阅者列表中
        Dep.target && dep.addSub(Dep.target);
        console.log(`${key}属性被访问了`, value);
        return value;
      },
      set(newValue) {
        console.log(`${key}属性被设置了`, newValue);
        value = newValue;
        //优化:如果新值是个对象就用walk在劫持一遍
        //不是那也不用担心，方法就直接被return了
        that.walk(newValue);
        //当值发生改变调用watcher的updata方法,催动视图更新
        //这里使用Dep的通知方法，通知每个订阅者（每个watcher实例）调用自己的updata方法
        dep.notify();
      },
    });
  }
}
