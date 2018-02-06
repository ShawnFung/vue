## Vue.extend

### Vue.extend( options )
参数：  
  {Object} options  
用法：  
  使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。其中，data 选项必须是函数。  
描述：  
  Vue.extend返回的是一个“扩展实例构造器”，也就是预设了部分选项的Vue的实例构造器。

### 源码 
```
  // src/core/global-api/extend.js
  Vue.extend = function (extendOptions: Object): Function {
    extendOptions = extendOptions || {}
    const Super = this
    const SuperId = Super.cid
    const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {})
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    const name = extendOptions.name || Super.options.name
    if (process.env.NODE_ENV !== 'production' && name) {
      validateComponentName(name)
    }

    const Sub = function VueComponent (options) {
      this._init(options)
    }
    // 原型继承
    Sub.prototype = Object.create(Super.prototype)
    Sub.prototype.constructor = Sub
    Sub.cid = cid++
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    )
    Sub['super'] = Super

    // define the proxy getters
    if (Sub.options.props) {
      initProps(Sub)
    }
    if (Sub.options.computed) {
      initComputed(Sub)
    }

    // 复制 Vue 的全局方法
    Sub.extend = Super.extend
    Sub.mixin = Super.mixin
    Sub.use = Super.use
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type]
    })
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options
    Sub.extendOptions = extendOptions
    Sub.sealedOptions = extend({}, Sub.options)

    // cache constructor
    cachedCtors[SuperId] = Sub
    return Sub
  }
```

### Vue.extend 与 ElementUI
```
// loading.vue 的地址：https://github.com/ElemeFE/element/blob/dev/packages/loading/src/loading.vue
import Loading from './loading.vue';
const Mask = Vue.extend(Loading);
const mask = new Mask({
    el: document.createElement('div'),
    data: {
        text: vm && vm[textExr] || textExr,
        spinner: vm && vm[spinnerExr] || spinnerExr,
        background: vm && vm[backgroundExr] || backgroundExr,
        customClass: vm && vm[customClassExr] || customClassExr,
        fullscreen: !!binding.modifiers.fullscreen
    }
});
```

### 参考文档
1. [vue@2.0源码学习---组件究竟是什么](https://segmentfault.com/a/1190000012561726)
