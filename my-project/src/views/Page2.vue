<template>
	<div>
		This is Page2
	</div>
</template>

<style lang="less">

</style>

<script>
import Vue from 'vue'
export default {
	data: function(){
		return {
			name: 'Page2'
		}
	},

	created(){
		console.log('----vue 实例', this)
		console.log('----Vue 对象---', Vue.options)
	}
}
</script>


