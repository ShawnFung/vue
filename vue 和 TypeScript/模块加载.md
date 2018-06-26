# Typescript的模块加载

最近的 Typescript 版本(1.5.3)是同时支持 commonjs 和 es6 的模块加载的，但是，当编译目标(compile target)为 es6 时,不允许混合使用两种模块加载方式。

1. 第三方模块且下载了 d.ts 文件  
```
import xxx from '第三方模块名'
```

2. 第三方模块且没有 d.ts 文件，只能按照 commonjs 的语法来进行导入
```
var q  = require('第三方模块名');
```