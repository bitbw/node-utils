/**
 * 创建一个类用于 new Vue的实例
 */
 class Vue {
    // 构造函数内部接收new实例传过来的对象vm
    constructor(vm) {
        // 将内部属性通过$属性名挂载
        this.$el = vm.el,
        this.$data = vm.data
        this.$methods = vm.methods
        // 调用代理方法
        this.agency(this.$data)
        this.agency(this.$methods)
        new Observer(this.$data)
        if (this.$el) {
            // new Compile 实例用于解析模板内容
            new Compile(this.$el, this)
        }
    }
    // 实现将data，methods中的属性方法代理到vue实例上
    agency(data){
        Object.keys(data).forEach(key =>{
            Object.defineProperty(this,key,{
                enumerable:true,
                configurable:true,
                get(){
                    // 实际上还是访问data中的数据
                    return data[key]
                },
                set(newValue){
                    if (newValue===data[key]) {
                        return 
                    }else{
                         // 实际上还是修改data中的数据调用observer
                        data[key]= newValue
                    }
                }
            })
        })
    }
}