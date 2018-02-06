<template>
	<div>
		This is Page1
	</div>
</template>

<style lang="less">

</style>

<script>
import Page2 from '@/views/Page2'
import Vue from 'vue'
console.log('----Page2----', Page2)
export default {
	data: function(){
		return {

		}
	},

	created(){
		var p = Vue.extend(Page2)
		console.dir( p)
	}
}
</script>