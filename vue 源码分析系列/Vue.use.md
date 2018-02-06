## Vue.use


### Vue.use( plugin )  
参数：{Object | Function} plugin  
用法：安装 Vue.js 插件。  
如果插件是一个对象，必须提供 install 方法。  
如果插件是一个函数，它会被作为 install 方法。install 方法将被作为 Vue 的参数调用。  
当 install 方法被同一个插件多次调用，插件将只会被安装一次。

### 源码
```
// src/core/global-api/use.js
Vue.use = function (plugin: Function | Object) {
    // 假如插件已经初始化过就不再继续。避免插件重复入侵
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // 获取插件的配置参数
    const args = toArray(arguments, 1)
    args.unshift(this)
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args) // 调用的是插件的install方法；
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)  // 若插件本身就是一个函数。则直接调用该函数
    }
    installedPlugins.push(plugin)
    return this
}
```

### Vue.use 与 ElementUI
ElementUI 的 install 方法：
```
const install = function(Vue, opts = {}) {
	locale.use(opts.locale);
	locale.i18n(opts.i18n);

	// 注册组件
	components.map(component => {
		Vue.component(component.name, component);
	});

	// 注册指令
	Vue.use(Loading.directive);

	const ELEMENT = {};
	ELEMENT.size = opts.size || '';

	// 将 $message 等方法添加到 Vue 的原型上
	Vue.prototype.$loading = Loading.service;
	Vue.prototype.$msgbox = MessageBox;
	Vue.prototype.$alert = MessageBox.alert;
	Vue.prototype.$confirm = MessageBox.confirm;
	Vue.prototype.$prompt = MessageBox.prompt;
	Vue.prototype.$notify = Notification;
	Vue.prototype.$message = Message;

	Vue.prototype.$ELEMENT = ELEMENT;
};
```

### 参考文档
1. [support plugin with multi version vue (#5970)](https://github.com/vuejs/vue/pull/5985)
2. [vue源码解析－插件入侵机制](https://segmentfault.com/a/1190000009811112)