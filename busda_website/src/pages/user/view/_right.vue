<template>
	<div  style="width: 1000px;background: #FFFFFF;min-height: 780px;height: 100%;">
		<order  v-if="type == 'order'" ref="order"></order>
		<!--<comment v-show="type == 'comment'"></comment>-->
		<change-pwd v-else-if="type == 'changePwd'"></change-pwd>
		<div v-else="type == 3 || type == 4 || type == 'comment'" style="margin-top: 200px;font-size: 20px;display: inline-block;">该模块正在全力开发中。。。</div>
	</div>
	<!--<div v-else-if="type == 'changePwd'" style="width: 1000px;background: #FFFFFF;min-height: 780px;">
		<change-pwd ></change-pwd>
	</div>
	<div v-else="type == 3 || type == 4 || type == 'comment'" style="width: 1000px;background: #FFFFFF;min-height: 780px;">
		<div style="margin-top: 200px;font-size: 20px;">该模块正在全力开发中。。。</div>
	</div>-->

</template>

<script>
	import order from '../children/_order'
	import comment from '../children/_comment'
	import changePwd from '../children/_changePwd'


	export default {
		data (){
			return {
				type:'order'
			}

		},
		components:{
			order,comment,changePwd
		},
		methods : {
			setSelType(sel_type){
				this.type = sel_type;
				if(this.type=='order'){
					if(this.$refs.order)this.$refs.order.load();
				}
			}
		},
		mounted : function(){
//			this.type = this.sel_type;
		}
	}
</script>

<style scoped>

</style>
