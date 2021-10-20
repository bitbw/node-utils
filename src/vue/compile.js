
/**
 * Compile(解析器) 专门负责解析模板内容
 */
 class Compile {
    // 接收vue中传进来的el 和 vue实例
    constructor(el, vm) {
     //判断传入的是dom对象还是选择器
     //根节点对象
     this.el = typeof el === "string" ? document.querySelector(el) : el;
     //vm实例
     this.vm = vm;
     if (this.el) {
      /**
       * 文档碎片化
       */
      // 1. 把el中所有的子节点都放到内存中
      let fragement = this.nodeFragement(this.el);
      // console.dir(fragement);
      // 2. 在内存中编译文档碎片
      this.compile(fragement);
      // 3. 把fragement 添加到dom中
      this.el.appendChild(fragement);
     }
    }
    /**
     * 核心方法
     */
    // 把el中所有的子节点都放到内存中
    nodeFragement(node) {
     // 创建一个fragement  fragement 相当于预编译将渲染dom放在内存中进行
     let fragement = document.createDocumentFragment();
     // 把el的子节点挨个添加到文档碎片中
     let childNodes = node.childNodes;
     this.toArray(childNodes).forEach((item) => {
      // 已经将所有节点都添加到文档碎片中
      fragement.appendChild(item);
     });
     return fragement;
    }
    // 在内存中编译文档碎片
    compile(fragement) {
     let childNodes = fragement.childNodes;
     this.toArray(childNodes).forEach((node) => {
      // 判断节点是文本节点还是元素节点
      // console.dir(node)
      if (this.isElementNode(node)) {
       // 如果是元素节点
       this.compileElementNode(node);
      }
      if (this.isTextNode(node)) {
       // 如果是文本节点
       this.compileTextNode(node);
      }
      // 判断节点内是否还有子节点 如果还有就递归排查
      if (node.childNodes && node.childNodes.length > 0) {
       this.compile(node);
      }
     });
    }
    // 编译元素节点
    compileElementNode(node) {
     // console.log('编译元素节点');
     // console.dir(node);
     // 获取所有属性集合转化数组
     let attributes = node.attributes;
     this.toArray(attributes).forEach((attribute) => {
      // console.dir(attribute)
      // 属性名
      let attributeName = attribute.name;
      // console.log(attributeName);
      // 属性值
      let attributeValue = attribute.value;
      // 判断是否是指令
      if (this.isDirective(attributeName)) {
       let type = attributeName.slice(2);
       //  判断是否是v-on指令
       if (this.isEventDirective(type)) {
        //使用解析工具 使用解析工具能够更好的解耦
        conpileUtils.eventConpile(node, this.vm, attributeValue, type);
       } else {
        //使用解析工具能够更好的解耦
        conpileUtils[type](node, this.vm, attributeValue);
       }
      }
     });
    }
    // 编译文本节点
    compileTextNode(node) {
     // console.log('编译文本节点');
     // 调用conpileUtils插值表达式解析器
     conpileUtils.mustache(node, this.vm);
    }
   
    /**
     * 工具方法
     */
    // 转化数组
    toArray(arr) {
     // 将伪数组转化为数组
     return [].slice.call(arr);
    }
    // 判断是否元素节点
    isElementNode(node) {
     // nodetype 属性 1元素节点 3文本节点
     return node.nodeType === 1;
    }
    // 判断是否文本节点
    isTextNode(node) {
     // nodetype 属性 1元素节点 3文本节点
     return node.nodeType === 3;
    }
    //判断是不是v-开头
    isDirective(attributeName) {
     return attributeName.startsWith("v-");
    }
    // 判断是不是on指令事件指令
    isEventDirective(type) {
     return type.split(":")[0] === "on";
    }
   }
   /**
    * conpile解析工具 能够更好的解耦方便后期维护
    * 把所有跟解析有关的工具就放到这里
    */
   let conpileUtils = {
    // 把下面的一坨分配到这个工具里
    //   if (type ==='text') {
    //     // document.body.textContent
    //     node.textContent = this.vm.$data[attributeValue]
    //   }
    //   if (type ==='html') {
    //     // document.body.innerHTML
    //     node.innerHTML = this.vm.$data[attributeValue]
    //   }
    //   if (type ==='model') {
    //     // document.body.innerHTML
    //     node.value = this.vm.$data[attributeValue]
    //   }
    // 解析普通指令
    // text
    // expr 就是data中绑定的属性名，也就是v-xxx=的值
    text(node, vm, expr) {
     node.textContent = this.getVmValue(vm, expr);
     //当值改变时会调用watcher中的updata，updata会调用回调函数并把新旧值作为实参传入
     //使用了订阅者模式每次new Watcher的时候都会讲实例存到Dep.subs中 当值发生改变会统一调用实例的updata方法
     new Watcher(vm, expr, (newValue) => {
      // 拿到新值更新视图
      node.textContent = newValue;
     });
    },
    // hmtl
    html(node, vm, expr) {
     node.innerHTML = this.getVmValue(vm, expr);
     //当值改变时会调用watcher中的updata，updata会调用回调函数并把新旧值作为实参传入
     //使用了订阅者模式每次new Watcher的时候都会讲实例存到Dep.subs中 当值发生改变会统一调用实例的updata方法
     new Watcher(vm, expr, (newValue) => {
      // 拿到新值更新视图
      node.innerHTML = newValue;
     });
    },
    // model
    model(node, vm, expr) {
     node.value = this.getVmValue(vm, expr);
     let that = this;
     // 监听输入框的input事件 当发生改变时就让 vm.$data[expr] = 输入值
     node.addEventListener("input", function () {
      // 调用setVmValue 方法,对象类型也能设置
      that.setVmValue(vm, expr, this.value);
     });
     //当值改变时会调用watcher中的updata，updata会调用回调函数并把新旧值作为实参传入
     //使用了订阅者模式每次new Watcher的时候都会讲实例存到Dep.subs中 当值发生改变会统一调用实例的updata方法
     new Watcher(vm, expr, (newValue) => {
      // 拿到新值更新视图
      node.value = newValue;
     });
    },
    // 解析事件指令
    eventConpile(node, vm, expr, type) {
     // 分割事件名
     let eventName = type.split(":")[1];
     // 判断是否有methods并且有内部处理的方法
     let mothod = vm.$methods && vm.$methods[expr];
     // 如果有事件名，并且在methods中声明的处理方法再执行下面的操作
     // 要不然bind就会报错 bind只能给函数调用
     if (eventName && mothod) {
      // 给当前节点注册事件，使用vue实例的事件，并且将this指向vue实例
      node.addEventListener(eventName, vm.$methods[expr].bind(vm));
     }
    },
    // 解析文本节点插值表达式，小胡子语法
    mustache(node, vm) {
     // 获取节点的文本内容
     let text = node.textContent;
     // console.log(text);
     // 创建一个正则验证 并且将匹配正则的内容分组
     let reg = /\{\{(.+)\}\}/;
     if (reg.test(text)) {
      // RegExp.$1可以获取分组的第一组内容
      let key = RegExp.$1;
      console.log("Bowen: mustache -> key", key)
      // 配备正则的内容替换为data中的数据
      // 在插值表达式中的数据就是data中的属性名所以紫瑶把key传入getVmValue即可
      node.textContent = text.replace(reg, this.getVmValue(vm, key));
      //当值改变时会调用watcher中的updata，updata会调用回调函数并把新旧值作为实参传入
      //使用了订阅者模式每次new Watcher的时候都会讲实例存到Dep.subs中 当值发生改变会统一调用实例的updata方法
      new Watcher(vm, key, (newValue) => {
       // 拿到新值更新视图
       node.textContent = text.replace(reg, newValue);
      });
     }
    },
    // 设计一个方法用于解析data中的普通数据类型和复杂数据类型
    getVmValue(vm, expr) {
     let data = vm.$data;
     expr.split(".").forEach((key) => {
      // 在这里如果是单纯字符串就只会遍历一次
      // 如果是对象就会遍历两次第一次data会变成key
      // 第二次data就会等于每一项的值
      data = data[key];
     });
     return data;
    },
    setVmValue(vm, expr, value) {
     let data = vm.$data;
     let arr = expr.split(".");
     arr.forEach((key, index) => {
      // 当item不是arr中最后一个的时候
      // debugger
      if (index < arr.length - 1) {
       // 让data变成最后需要设置的对象
       data = data[key];
      } else {
       // 是最后一个的时候就是需要设置的属性了
       data[key] = value;
      }
     });
    },
   };