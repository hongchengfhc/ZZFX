<template>
	<div>
		<header-view></header-view>
		<div style="background: #EEEEEE; padding-top: 54px;padding-bottom: 123px;">
			<div class="" style="background: #FFFFFF;width: 1200px;height: 425px;margin: 0 auto;text-align:center;">
				<div class="pay_success ib"></div>
				<div class="" style="color: #333333;font-size: 26px;line-height: 1;margin-top: 24px;">支付成功</div>
				<div class="" style="color: #333333;font-size: 14px;line-height: 1;margin-top: 24px;">你可以在用户中心查看订单详情</div>
				<div class="" style="margin-top: 58px;">
					<div class="ib see_order" style="text-align:center;line-height:48px;" @click="seeOrderDidClick">查看订单</div>
					<div class="ib" style="width: 30px;"></div>
					<div class="ib my_account" style="text-align:center;line-height:48px;" @click="accountDidClick">我的账户</div>
				</div>
			</div>
		</div>
		<footer-view></footer-view>
	</div>
</template>

<script>
	import headerView from "../common/_header"
	import footerView from "../common/_footer"
	import Util from "../../config/Util"
	import infoType from "../../config/infoType"

	export default {
		data() {
			return {
				urlParam: {
					order_id: ''
				}
			}
		},
		components: {
			headerView,
			footerView
		},
		beforeRouteEnter(to,from,next){
			next((vm)=>{
				vm.urlParam = vm.$route.query;
			})
		},
		mounted() {
			this.urlParam = this.$route.query;
		},
		methods: {
			//我的账户
			accountDidClick() {
				this.$router.push({
					name: 'userCenter',
					query: {
//						order_id: this.urlParam.order_id
					}
				})
			},
			//查看订单
			seeOrderDidClick() {
				this.$router.push({
					name: 'orderDetail',
					query: {
						order_id: this.urlParam.order_id
					}
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.pay_success {
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 50px;
		height: 50px;
		margin-top: 78px;
		background-image: url('../../assets/images/pay/pay_success.png');
	}

	.see_order {
		border-radius: 2px;
		width: 215px;
		height: 48px;
		background: #FFFFFF;
		color: #FF9710;
		border: solid 1px #ff9710;
		font-size: 16px;
		font-weight: 500;
		cursor: pointer;
	}

	.my_account {
		width: 215px;
		height: 48px;
		border: 1px solid #ff9710;
		border-radius: 2px;
		background-color: #ff9710;
		color: #FFFFFF;
		font-size: 16px;
		font-weight: 500;
		cursor: pointer;
		box-shadow: 0 0 5px 0 rgba(51,51,51,0.2);
	}

	.see_order:hover {
		background: #FF9710;
		color: #FFFFFF;
	}

	.my_account:hover {
		background: #FFAC40;
		border: 1px solid #FFAC40;
	}
</style>
