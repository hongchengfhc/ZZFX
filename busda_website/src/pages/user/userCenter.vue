<template>
<div>
	<header-view ref="headerView" :selectMenu="-1" @loginSuccess="loginSuccess" @btnMyOrder="btnMyOrder"></header-view>

	<div style="background: #EEEEEE;padding-top: 55px;padding-bottom: 90px;">
		<div style="width: 1200px;margin: 0 auto;">
			<div class="" style="overflow: auto;position: relative;">
				<!--左侧-->
				<left ref="left" @selType="selType" id="left" class="" style="width: 200px;height: 100%;position: absolute;"></left>
				<right ref="right" id="right" :type="sel_type" style="margin-left: 200px;"></right>
			</div>
		</div>
	</div>

	<footer-view></footer-view>
</div>
</template>

<script>
import headerView from '../common/_header'
import footerView from '../common/_footer'

import left from "./view/_left"
import right from './view/_right'

export default {
	data() {
		return {
			sel_type: 'order'
		}
	},
	components: {
		headerView,
		footerView,
		left,
		right
	},
	beforeRouteEnter(to,from,next){
		next((vm)=>{
			vm.$refs.headerView.loginUserInfo();
		})
	},
	methods: {
		//左侧回调
		selType(selType) {
			// this.sel_type = selType;
			this.$refs.right.setSelType(selType);
		},
		//头部回调
		//登录成功
		loginSuccess(user, token) {
			this.btnMyOrder();
		},
		btnMyOrder(){
			// this.sel_type = 'order';
			this.$refs.left.setSelType('order');
			// if(this.$refs.right.$refs.order)this.$refs.right.$refs.order.httpLoadInfo();
		}

	}
}
</script>

<style>

</style>
