/**
 * 创建一个Watcher 用于关联Observer和Compile
 */
 class Watcher {
    // vm就是vue实例，expr是data中的key，cd是需要执行的回调函数
    constructor(vm, expr, cd) {
     this.vm = vm;
     this.expr = expr;
     this.cd = cd;
     // 把当前的watcher 实例存到 Dep.target中
     Dep.target = this;
     // getVmValue 会进到observe中的get中 所以在get中就可以访问到 Dep.target
     // 把旧值(初始值)存起来, 在updata中用来对比
     this.oldValue = this.getVmValue(vm, expr);
     // 进到get中存储完当前watcher实例后，清空Dep.target方便下次存储
     Dep.target = null;
    }
    /**
     * 数据更新调用updata方法
     */
    upData() {
     let oldValue = this.oldValue;
     /**
      * 关于这里为什么是新值,因为调用这个方法就说明数据已经更新了
      * 这里传进来的vm就是更新后的vm了,所以调用getVmValue就拿到新值了
      */
     let newValue = this.getVmValue(this.vm, this.expr);
     // 如果新值和旧值不相对，就调用cd 回调函数将newValue和oldValue传进去
     if (newValue !== oldValue) {
      this.cd(newValue, oldValue);
     }
    }
    // 设计一个方法用于解析data中的普通数据类型和复杂数据类型
    // 将complie中的方法复制过来用
    getVmValue(vm, expr) {
     let data = vm.$data;
     expr.split(".").forEach((key) => {
      // 在这里如果是单纯字符串就只会遍历一次
      // 如果是对象就会遍历两次第一次data会变成key
      // 第二次data就会等于每一项的值
      data = data[key];
     });
     return data;
    }
   }
   /**
    * 订阅者、发布者模式
    * 创建一个Dep对象用于管理这个订阅者也就是每个watcher实例
    * 并且在改变后通知每个订阅者
    */
   
   class Dep {
    constructor() {
     // 用于储存所有订阅者
     this.subs = [];
    }
    // 新增订阅者方法
    addSub(watcher) {
     // 新增订阅者放到数组中
     this.subs.push(watcher);
    }
    // 通知所有的订阅者更新
    notify() {
     this.subs.forEach((sub) => {
      // 调用upData方法
      sub.upData();
     });
    }
   }