<template>
  <div class="home_wrapper">
		<el-menu :router="true" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
			<el-menu-item index="/">首页</el-menu-item>
			<el-submenu index="2">
				<template slot="title">我的工作台</template>
				<el-menu-item index="2-1">选项1</el-menu-item>
				<el-menu-item index="2-2">选项2</el-menu-item>
				<el-menu-item index="2-3">选项3</el-menu-item>
			</el-submenu>
			<el-menu-item index="/page2"><a>订单管理</a></el-menu-item>
		</el-menu>
		<router-view></router-view>
  </div>
</template>

<style lang="less">

</style>

<script>
export default {
  data: function(){
		return {
			// 根据路由动态设置，当前激活菜单的 index
			activeIndex: this.$route.path
		}
	},
	methods: {
		handleSelect: function(){

		}
	}
}
</script>


