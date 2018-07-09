# ElementUI使用中遇到的问题

## Vue 导航组件高亮的问题？   
原理：根据 URL 匹配菜单项
![菜单项高亮](./my-project/static/images/nav_highlight.png)
vue + vue-router + elementUI
```
<el-menu :router="true" :default-active="activeIndex">
    <el-menu-item index="/">首页</el-menu-item>
    <el-menu-item index="/page2"><a>订单管理</a></el-menu-item>
</el-menu>
data: function(){
    return {
        // 根据路由动态设置，当前激活菜单的 index
        activeIndex: this.$route.path
    }
}
```

## 项目中没有使用Node，直接从unpkg引用element-ui和vue，这种情况下如何做国际化？
https://github.com/ElemeFE/element/issues/1909