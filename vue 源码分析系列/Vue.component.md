## Vue.component

### Vue.component( id, [definition] )
参数：  
  {string} id
  {Function | Object} [definition]  
用法：  
  注册或获取全局组件。注册还会自动使用给定的id设置组件的名称
```
// 注册组件，传入一个扩展过的构造器
Vue.component('my-component', Vue.extend({ /* ... */ }))

// 注册组件，传入一个选项对象 (自动调用 Vue.extend)
Vue.component('my-component', { /* ... */ })

// 获取注册的组件 (始终返回构造器)
var MyComponent = Vue.component('my-component')
```

### 源码
vue.js初始化时会先调用一次initGlobalAPI(Vue)，给Vue构造函数挂载上一些全局的api，其中又会调用到initAssetRegisters(Vue)，其中定义了Vue.component方法，具体看下其实现：
```
	// src/core/global-api/assets.js
  var ASSET_TYPES = [
      'component',
      'directive',
      'filter'
  ];
  //循环注册ASSET_TYPES中的全局方法
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        // 全局的组件、指令和过滤器都挂载在Vue.options上
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });

  Vue.prototype._init = function (options) {
      vue初始化时将options参数和Vue.options组装为vm.$options
      vm.$options = mergeOptions(
        //Vue.options
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
  }
```
将Vue.component 提取出来，最终就是这样的。其实 Vue.component 就只做了3件事，设置组件 name 属性值，调用 Vue.extend 方法，将组件挂载到 Vue.options 上。
```
Vue.component = function(id, definition) {
		if (process.env.NODE_ENV !== 'production') {
			validateComponentName(id);
		}
    definition.name = definition.name || id
    definition = Vue.extend(definition)
    this.options['components'][id] = definition
    return definition    
}
```

### Vue 组件是什么？
vue的组件其实就是扩展的 Vue 构造函数，并且在适当的时候实例化为Vue实例。

### 参考文档
1. [Vue源码解析(四)-components组件](https://segmentfault.com/a/1190000012004707#articleHeader1)

