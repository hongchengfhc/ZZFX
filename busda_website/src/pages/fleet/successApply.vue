车队入驻
<template>
	<div>
		<header-view></header-view>

		<div style="height: 700px;background: #EEEEEE;margin-top: 1px;">
			<!--<div class="ub ub-ac ub-pc" style="height: 700px;background: #EEEEEE;">-->
				<div style="width: 1125px;height: 263px;margin-top: 208px;display: inline-block;" class="img"></div>
			<!--</div>-->
		</div>
		<div style="margin: 0 auto;width: 1200px;position: relative;">
			<div style="position: absolute;left: 375px;z-index: 1;bottom: 205px;" class="">
				<div class="" style="width: 450px;height: 340px;background: #FFFFFF;box-shadow:  0 0 25px 0 rgba(51, 51, 51, 0.4);text-align: center;">
					<div style="display: inline-block;">
						<div class="success" style="display: inline-block;"></div>
						<div style="padding: 0 74px;color: #333333;font-size: 16px;margin-top: 35px;">申请成功，请保持电话畅通，耐心等待工作人员处理</div>
						<div style="color: #999999;margin-top: 65px;line-height: 1;">申请车队：{{this.urlParam.fleet_name}}</div>
						<div style="color: #999999;line-height: 1;margin-top: 8px;">联系电话：{{this.urlParam.phone}}</div>
					</div>
				</div>
			</div>
		</div>
		<footer-view></footer-view>
	</div>
</template>

<script>
	import headerView from '../common/_header'
	import footerView from '../common/_footer'

	export default {
		data() {
			return {
				urlParam: {
					fleet_name: '',
					phone: ''
				}
			}
		},
		components: {
			headerView,
			footerView
		},
		mounted() {
			this.urlParam = this.$route.query;
		},
		methods: {}
	}
</script>

<style scoped>
	.img {
		background-image: url('http://img.zhizhuchuxing.cn/busda/fleet.png');
		/*background-image:url(static/images/fleet/fleet.png);*/
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	.success{
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 50px;
		height: 50px;
		background-image: url('../../assets/images/pay/pay_success.png');
		margin-top: 60px;
	}
</style>
